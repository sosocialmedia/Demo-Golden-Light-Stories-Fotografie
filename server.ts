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

// Serve uploaded images statically
app.use('/uploads', express.static(uploadsDir));

// Data storage directory for server-side persistence
const dataDir = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const storiesFilePath = path.join(dataDir, 'stories.json');
const daysFilePath = path.join(dataDir, 'availableDays.json');
const bookingsFilePath = path.join(dataDir, 'bookings.json');

// --- API ROUTES FOR CROSS-DEVICE PERSISTENCE ---

// 1. Stories / Golden Stories Photo Gallery
app.get('/api/stories', (_req, res) => {
  if (fs.existsSync(storiesFilePath)) {
    try {
      const data = JSON.parse(fs.readFileSync(storiesFilePath, 'utf-8'));
      return res.json(data);
    } catch (e) {
      console.error('Error reading stories file:', e);
    }
  }
  res.json(null);
});

app.post('/api/stories', (req, res) => {
  try {
    const stories = req.body;
    fs.writeFileSync(storiesFilePath, JSON.stringify(stories, null, 2), 'utf-8');
    res.json({ success: true, count: Array.isArray(stories) ? stories.length : 0 });
  } catch (e: any) {
    console.error('Error saving stories:', e);
    res.status(500).json({ error: e.message });
  }
});

// 2. Photo upload endpoint (saves photo as file in /uploads and returns web URL)
app.post('/api/upload', (req, res) => {
  try {
    const { imageBase64, filename } = req.body;
    if (!imageBase64) {
      return res.status(400).json({ error: 'Geen afbeeldingsdata ontvangen' });
    }

    // Extract base64 content & extension
    const matches = imageBase64.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    let buffer: Buffer;
    let ext = 'jpg';

    if (matches && matches.length === 3) {
      const mime = matches[1];
      if (mime.includes('png')) ext = 'png';
      else if (mime.includes('webp')) ext = 'webp';
      buffer = Buffer.from(matches[2], 'base64');
    } else {
      buffer = Buffer.from(imageBase64, 'base64');
    }

    const safeName = filename
      ? `${Date.now()}_${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      : `photo_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;

    const filePath = path.join(uploadsDir, safeName);
    fs.writeFileSync(filePath, buffer);

    const publicUrl = `/uploads/${safeName}`;
    res.json({ success: true, url: publicUrl });
  } catch (e: any) {
    console.error('Error saving uploaded file:', e);
    res.status(500).json({ error: e.message });
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
