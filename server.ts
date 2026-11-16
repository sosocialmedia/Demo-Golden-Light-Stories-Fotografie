import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// High payload limits for photo uploads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Ensure public/uploads directory exists
const uploadsDir = path.resolve(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded images statically with long cache lifetime (filenames have timestamps)
app.use('/uploads', express.static(uploadsDir, { maxAge: '365d' }));

// Prevent stale caching of API responses across browsers and proxies
app.use('/api', (_req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

// Data storage directory for server-side persistence
const dataDir = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const storyOverridesFilePath = path.join(dataDir, 'storyOverrides.json');
const legacyStoriesFilePath = path.join(dataDir, 'stories.json');
const daysFilePath = path.join(dataDir, 'availableDays.json');
const bookingsFilePath = path.join(dataDir, 'bookings.json');

interface StoryOverride {
  addedImages: string[];
  removedImages: string[];
  coverImage?: string;
  isComingSoon?: boolean;
}

type StoryOverridesMap = Record<string, StoryOverride>;

function readStoryOverrides(): StoryOverridesMap {
  if (fs.existsSync(storyOverridesFilePath)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(storyOverridesFilePath, 'utf-8'));
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return parsed as StoryOverridesMap;
      }
    } catch (e) {
      console.error('Error reading storyOverrides file:', e);
    }
  }

  // Legacy migration: if old stories.json exists with /uploads/ or external photos, migrate them once
  if (fs.existsSync(legacyStoriesFilePath)) {
    try {
      const legacy = JSON.parse(fs.readFileSync(legacyStoriesFilePath, 'utf-8'));
      if (Array.isArray(legacy)) {
        const migrated: StoryOverridesMap = {};
        for (const item of legacy) {
          if (!item?.id) continue;
          const uploadedOrExternal = (Array.isArray(item.galleryImages) ? item.galleryImages : []).filter(
            (url: unknown): url is string =>
              typeof url === 'string' && (url.startsWith('/uploads/') || url.startsWith('http'))
          );
          if (uploadedOrExternal.length > 0 || item.isComingSoon === false) {
            migrated[item.id] = {
              addedImages: uploadedOrExternal,
              removedImages: [],
              coverImage: typeof item.coverImage === 'string' && (item.coverImage.startsWith('/uploads/') || item.coverImage.startsWith('http'))
                ? item.coverImage
                : undefined,
              isComingSoon: Boolean(item.isComingSoon),
            };
          }
        }
        if (Object.keys(migrated).length > 0) {
          writeStoryOverrides(migrated);
          return migrated;
        }
      }
    } catch (e) {
      console.error('Error migrating legacy stories file:', e);
    }
  }

  return {};
}

function writeStoryOverrides(overrides: StoryOverridesMap) {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  fs.writeFileSync(storyOverridesFilePath, JSON.stringify(overrides, null, 2), 'utf-8');
}

function getOrCreateStoryOverride(map: StoryOverridesMap, storyId: string): StoryOverride {
  if (!map[storyId]) {
    map[storyId] = { addedImages: [], removedImages: [] };
  }
  if (!Array.isArray(map[storyId].addedImages)) map[storyId].addedImages = [];
  if (!Array.isArray(map[storyId].removedImages)) map[storyId].removedImages = [];
  return map[storyId];
}

// --- API ROUTES FOR CROSS-DEVICE PERSISTENCE ---

// 1. Atomic Story Photo Overrides (prevents stale clients from overwriting uploads)
app.get('/api/story-overrides', (_req, res) => {
  res.json(readStoryOverrides());
});

app.post('/api/story-overrides/add-photo', (req, res) => {
  try {
    const { storyId, imageUrl, isCover } = req.body || {};
    if (!storyId || typeof storyId !== 'string' || !imageUrl || typeof imageUrl !== 'string') {
      return res.status(400).json({ error: 'Ongeldige gegevens voor foto toevoegen.' });
    }

    const overrides = readStoryOverrides();
    const entry = getOrCreateStoryOverride(overrides, storyId);

    entry.removedImages = entry.removedImages.filter((u) => u !== imageUrl);
    if (!entry.addedImages.includes(imageUrl)) {
      entry.addedImages.push(imageUrl);
    }
    entry.isComingSoon = false;
    if (isCover || !entry.coverImage) {
      entry.coverImage = imageUrl;
    }

    writeStoryOverrides(overrides);
    res.json({ success: true, overrides });
  } catch (e: any) {
    console.error('Error adding photo to story override:', e);
    res.status(500).json({ error: e.message || 'Kon foto niet opslaan.' });
  }
});

app.post('/api/story-overrides/remove-photo', (req, res) => {
  try {
    const { storyId, imageUrl } = req.body || {};
    if (!storyId || typeof storyId !== 'string' || !imageUrl || typeof imageUrl !== 'string') {
      return res.status(400).json({ error: 'Ongeldige gegevens voor foto verwijderen.' });
    }

    const overrides = readStoryOverrides();
    const entry = getOrCreateStoryOverride(overrides, storyId);

    entry.addedImages = entry.addedImages.filter((u) => u !== imageUrl);
    if (!imageUrl.startsWith('/uploads/') && !entry.removedImages.includes(imageUrl)) {
      entry.removedImages.push(imageUrl);
    }
    if (entry.coverImage === imageUrl) {
      entry.coverImage = entry.addedImages[0] || undefined;
    }

    writeStoryOverrides(overrides);

    // Clean up orphaned local upload file if no story references it anymore
    if (imageUrl.startsWith('/uploads/')) {
      const stillReferenced = Object.values(overrides).some(
        (ov) => ov.addedImages.includes(imageUrl) || ov.coverImage === imageUrl
      );
      if (!stillReferenced) {
        const safeBase = path.basename(imageUrl);
        const targetFile = path.join(uploadsDir, safeBase);
        if (fs.existsSync(targetFile)) {
          try {
            fs.unlinkSync(targetFile);
          } catch (unlinkErr) {
            console.warn('Could not unlink removed upload:', unlinkErr);
          }
        }
      }
    }

    res.json({ success: true, overrides });
  } catch (e: any) {
    console.error('Error removing photo from story override:', e);
    res.status(500).json({ error: e.message || 'Kon foto niet verwijderen.' });
  }
});

app.post('/api/story-overrides/set-cover', (req, res) => {
  try {
    const { storyId, imageUrl } = req.body || {};
    if (!storyId || typeof storyId !== 'string' || !imageUrl || typeof imageUrl !== 'string') {
      return res.status(400).json({ error: 'Ongeldige gegevens voor omslagfoto.' });
    }

    const overrides = readStoryOverrides();
    const entry = getOrCreateStoryOverride(overrides, storyId);
    entry.coverImage = imageUrl;
    entry.isComingSoon = false;

    writeStoryOverrides(overrides);
    res.json({ success: true, overrides });
  } catch (e: any) {
    console.error('Error setting cover photo:', e);
    res.status(500).json({ error: e.message || 'Kon omslagfoto niet instellen.' });
  }
});

app.post('/api/story-overrides/toggle-coming-soon', (req, res) => {
  try {
    const { storyId, isComingSoon } = req.body || {};
    if (!storyId || typeof storyId !== 'string' || typeof isComingSoon !== 'boolean') {
      return res.status(400).json({ error: 'Ongeldige status.' });
    }

    const overrides = readStoryOverrides();
    const entry = getOrCreateStoryOverride(overrides, storyId);
    entry.isComingSoon = isComingSoon;

    writeStoryOverrides(overrides);
    res.json({ success: true, overrides });
  } catch (e: any) {
    console.error('Error toggling coming soon status:', e);
    res.status(500).json({ error: e.message || 'Kon status niet bijwerken.' });
  }
});

app.post('/api/story-overrides/reset', (_req, res) => {
  try {
    writeStoryOverrides({});
    if (fs.existsSync(legacyStoriesFilePath)) {
      fs.unlinkSync(legacyStoriesFilePath);
    }
    res.json({ success: true, overrides: {} });
  } catch (e: any) {
    console.error('Error resetting story overrides:', e);
    res.status(500).json({ error: e.message || 'Kon foto-instellingen niet resetten.' });
  }
});

// Keep legacy /api/stories GET for backwards diagnostics
app.get('/api/stories', (_req, res) => {
  res.json(readStoryOverrides());
});

// 2. Photo upload endpoint (saves photo as file in /uploads and returns web URL)
app.post('/api/upload', (req, res) => {
  try {
    const { imageBase64, filename } = req.body || {};
    if (!imageBase64 || typeof imageBase64 !== 'string') {
      return res.status(400).json({ error: 'Geen afbeeldingsdata ontvangen.' });
    }

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Extract base64 content & extension robustly
    const matches = imageBase64.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,([\s\S]+)$/);
    let buffer: Buffer;
    let ext = 'jpg';

    if (matches && matches.length === 3) {
      const mime = matches[1].toLowerCase();
      if (mime.includes('png')) ext = 'png';
      else if (mime.includes('webp')) ext = 'webp';
      else if (mime.includes('gif')) ext = 'gif';
      buffer = Buffer.from(matches[2], 'base64');
    } else {
      const stripped = imageBase64.replace(/^data:[^;]+;base64,/, '');
      buffer = Buffer.from(stripped, 'base64');
    }

    if (!buffer || buffer.length === 0) {
      return res.status(400).json({ error: 'Lege of ongeldige afbeeldingsdata ontvangen.' });
    }

    const baseSafe = filename
      ? path.parse(filename).name.replace(/[^a-zA-Z0-9-_]/g, '_').slice(0, 48) || 'photo'
      : 'photo';
    const safeName = `${Date.now()}_${Math.random().toString(36).substring(2, 6)}_${baseSafe}.${ext}`;

    const filePath = path.join(uploadsDir, safeName);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${safeName}`;
    res.json({ success: true, url: publicUrl, size: buffer.length });
  } catch (e: any) {
    console.error('Error saving uploaded file:', e);
    res.status(500).json({ error: e.message || 'Upload op server mislukt.' });
  }
});

// 3. Agenda Days & Slots Sync
app.get('/api/days', (_req, res) => {
  if (fs.existsSync(daysFilePath)) {
    try {
      const data = JSON.parse(fs.readFileSync(daysFilePath, 'utf-8'));
      return res.json(data);
    } catch (e) {
      console.error(e);
    }
  }
  res.json(null);
});

app.post('/api/days', (req, res) => {
  try {
    fs.writeFileSync(daysFilePath, JSON.stringify(req.body, null, 2), 'utf-8');
    res.json({ success: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// 4. Bookings Sync
app.get('/api/bookings', (_req, res) => {
  if (fs.existsSync(bookingsFilePath)) {
    try {
      const data = JSON.parse(fs.readFileSync(bookingsFilePath, 'utf-8'));
      return res.json(data);
    } catch (e) {
      console.error(e);
    }
  }
  res.json(null);
});

app.post('/api/bookings', (req, res) => {
  try {
    fs.writeFileSync(bookingsFilePath, JSON.stringify(req.body, null, 2), 'utf-8');
    res.json({ success: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

// Mount Vite middleware for development & static serving for production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production' && fs.existsSync(path.resolve(process.cwd(), 'dist'));

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
