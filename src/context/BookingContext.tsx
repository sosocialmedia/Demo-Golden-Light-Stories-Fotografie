import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { AvailableDay, Booking, BookingStatus, ShootPackage, TimeSlot, LoveStoryItem } from '../types';
import { INITIAL_AVAILABLE_DAYS, INITIAL_BOOKINGS, PACKAGES, GOLDEN_STORIES } from '../data/photographyData';
import { openBrochurePdf, openTermsPdf } from '../utils/pdfDownload';

export type AdminTab = 'beschikbaarheid' | 'boekingen' | 'synchronisatie' | 'fotos';

interface BookingContextType {
  availableDays: AvailableDay[];
  bookings: Booking[];
  packages: ShootPackage[];
  stories: LoveStoryItem[];
  activeStoryCategory: string;
  setActiveStoryCategory: (id: string) => void;
  isBookingModalOpen: boolean;
  selectedPackage: ShootPackage | null;
  isPhotographerAdminOpen: boolean;
  activeAdminTab: AdminTab;
  
  // Brochure & Terms Modals
  isBrochureOpen: boolean;
  openBrochure: () => void;
  closeBrochure: () => void;
  isTermsOpen: boolean;
  openTerms: () => void;
  closeTerms: () => void;
  defaultDepositAmount: number;
  updateDefaultDepositAmount: (amount: number) => void;

  selectedDate: string | null;
  selectedSlot: TimeSlot | null;

  // Actions
  openBookingModal: (packageId?: string, initialDate?: string, initialSlot?: TimeSlot) => void;
  closeBookingModal: () => void;
  openPhotographerAdmin: (tab?: AdminTab, storyCategory?: string) => void;
  closePhotographerAdmin: () => void;
  setVerifiedAdminPin: (pin: string) => void;
  updateCloudAdminPin: (newPin: string, previousPin: string) => Promise<void>;
  
  // Photo management by Photographer (persisted in Cloud Firestore)
  addPhotoToStory: (storyId: string, imageUrl: string, isCover?: boolean) => Promise<void>;
  removePhotoFromStory: (storyId: string, imageUrl: string) => Promise<void>;
  setStoryCover: (storyId: string, imageUrl: string) => Promise<void>;
  toggleStoryComingSoon: (storyId: string, isComingSoon: boolean) => Promise<void>;
  resetStoriesToDefault: () => Promise<void>;
  
  // Calendar Management by Photographer
  addAvailableDate: (date: string, locationNote?: string) => void;
  removeAvailableDate: (date: string) => void;
  addSlotToDate: (date: string, slot: Omit<TimeSlot, 'id'>) => void;
  removeSlotFromDate: (date: string, slotId: string) => void;
  toggleDateBlocked: (date: string) => void;
  batchAddWeekendSunsetSlots: (year: number, monthIndex: number) => void;
  
  // Client Booking flow
  createNewBooking: (data: {
    packageId: string;
    packageName: string;
    date: string;
    timeSlotId?: string;
    timeSlotLabel?: string;
    timeSlotTime?: string;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    groupSize?: string;
    preferredLocation?: string;
    message?: string;
    depositAmount?: number;
    depositPaid?: boolean;
    paymentMethod?: string;
    termsAccepted?: boolean;
  }) => Booking;

  // Booking management
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  deleteBooking: (bookingId: string) => void;
  updateBookingNotes: (bookingId: string, notes: string) => void;
  resetAllData: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const STORAGE_KEY_DAYS = 'golden_light_nov2026_days_v1';
const STORAGE_KEY_BOOKINGS = 'golden_light_nov2026_bookings_v1';
const STORAGE_KEY_STORIES_CACHE = 'golden_light_stories_cloud_cache_v1';

interface CloudStoryPhoto {
  id: string;
  storyId: string;
  imageUrl: string;
  isDeleted: boolean;
  createdAtMs: number;
}

interface CloudStoryConfig {
  storyId: string;
  coverImage: string;
  isComingSoon: boolean;
  removedImages: string[];
}

function mergeStoriesWithCloud(
  baseStories: LoveStoryItem[],
  cloudPhotos: CloudStoryPhoto[],
  configsMap: Record<string, CloudStoryConfig>
): LoveStoryItem[] {
  return baseStories.map((base) => {
    const cfg = configsMap[base.id];
    const photosForStory = cloudPhotos
      .filter((p) => p.storyId === base.id && !p.isDeleted)
      .map((p) => p.imageUrl);

    if (!cfg && photosForStory.length === 0) return base;

    const removedSet = new Set(Array.isArray(cfg?.removedImages) ? cfg.removedImages : []);
    const baseFiltered = base.galleryImages.filter((img) => !removedSet.has(img));
    const galleryImages = [...baseFiltered];
    for (const url of photosForStory) {
      if (!removedSet.has(url) && !galleryImages.includes(url)) {
        galleryImages.push(url);
      }
    }

    let coverImage = '';
    if (
      cfg?.coverImage &&
      !removedSet.has(cfg.coverImage) &&
      (galleryImages.includes(cfg.coverImage) ||
        cfg.coverImage.startsWith('data:image') ||
        cfg.coverImage.startsWith('http') ||
        cfg.coverImage.startsWith('/uploads/'))
    ) {
      coverImage = cfg.coverImage;
    } else if (base.coverImage && !removedSet.has(base.coverImage)) {
      coverImage = base.coverImage;
    } else if (galleryImages.length > 0) {
      coverImage = galleryImages[0];
    }

    const hasMedia = galleryImages.length > 0 || Boolean(coverImage);
    const isComingSoon = hasMedia
      ? typeof cfg?.isComingSoon === 'boolean'
        ? cfg.isComingSoon
        : false
      : true;

    return {
      ...base,
      coverImage,
      galleryImages,
      isComingSoon,
    };
  });
}

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [availableDays, setAvailableDays] = useState<AvailableDay[]>(() => {
    const today = new Date().toISOString().split('T')[0];
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DAYS);
      if (saved) {
        const parsed: AvailableDay[] = JSON.parse(saved);
        const filtered = parsed.filter(d => d.date >= today);
        if (filtered.length > 0) return filtered;
      }
    } catch (e) {
      console.error('Failed to load saved days', e);
    }
    return INITIAL_AVAILABLE_DAYS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BOOKINGS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load saved bookings', e);
    }
    return INITIAL_BOOKINGS;
  });

  const [cloudPhotos, setCloudPhotos] = useState<CloudStoryPhoto[]>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY_STORIES_CACHE);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed?.photos)) return parsed.photos;
      }
    } catch {
      // ignore cache parse errors
    }
    return [];
  });

  const [storyConfigsMap, setStoryConfigsMap] = useState<Record<string, CloudStoryConfig>>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY_STORIES_CACHE);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed?.configs && typeof parsed.configs === 'object') return parsed.configs;
      }
    } catch {
      // ignore cache parse errors
    }
    return {};
  });

  const [verifiedAdminPin, setVerifiedAdminPinState] = useState<string>(() => {
    try {
      return (localStorage.getItem('golden_light_admin_pin') || '').trim() || '2026';
    } catch {
      return '2026';
    }
  });

  const setVerifiedAdminPin = useCallback((pin: string) => {
    const cleaned = pin.trim() || '2026';
    setVerifiedAdminPinState(cleaned);
  }, []);

  const stories = useMemo(
    () => mergeStoriesWithCloud(GOLDEN_STORIES, cloudPhotos, storyConfigsMap),
    [cloudPhotos, storyConfigsMap]
  );

  // Cache lightweight metadata/urls when Firestore updates
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY_STORIES_CACHE,
        JSON.stringify({ photos: cloudPhotos, configs: storyConfigsMap })
      );
    } catch {
      // Ignore localStorage quota exceeded on large galleries; Firestore is source of truth
    }
  }, [cloudPhotos, storyConfigsMap]);

  const [activeStoryCategory, setActiveStoryCategory] = useState<string>('story-newborn');

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<ShootPackage | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isPhotographerAdminOpen, setIsPhotographerAdminOpen] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState<AdminTab>('fotos');

  // Brochure & Terms state
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [defaultDepositAmount, setDefaultDepositAmount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('golden_light_deposit_amt');
      if (saved) return Number(saved) || 50;
    } catch {
      // ignore
    }
    return 50;
  });

  const updateDefaultDepositAmount = (amount: number) => {
    setDefaultDepositAmount(amount);
    localStorage.setItem('golden_light_deposit_amt', String(amount));
  };

  const openBrochure = () => {
    openBrochurePdf();
  };
  const closeBrochure = () => setIsBrochureOpen(false);

  const openTerms = () => {
    openTermsPdf();
  };
  const closeTerms = () => setIsTermsOpen(false);

  const isInitializedRef = React.useRef(false);

  // Real-time Firestore listeners for Story Photos & Category Configs (syncs live across all devices/URLs)
  useEffect(() => {
    const photosQuery = query(
      collection(db, 'storyPhotos'),
      where('isDeleted', '==', false)
    );

    const unsubscribePhotos = onSnapshot(
      photosQuery,
      (snapshot) => {
        const loaded: CloudStoryPhoto[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          const createdAt = data.createdAt instanceof Timestamp
            ? data.createdAt.toMillis()
            : Date.now();
          loaded.push({
            id: String(data.id || docSnap.id),
            storyId: String(data.storyId || ''),
            imageUrl: String(data.imageUrl || ''),
            isDeleted: Boolean(data.isDeleted),
            createdAtMs: createdAt,
          });
        });
        loaded.sort((a, b) => a.createdAtMs - b.createdAtMs);
        setCloudPhotos(loaded);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'storyPhotos');
      }
    );

    // Subscribe to each of the 6 story category config docs via allow get
    const configUnsubs = GOLDEN_STORIES.map((story) =>
      onSnapshot(
        doc(db, 'storyConfigs', story.id),
        (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setStoryConfigsMap((prev) => ({
              ...prev,
              [story.id]: {
                storyId: story.id,
                coverImage: typeof data.coverImage === 'string' ? data.coverImage : '',
                isComingSoon: Boolean(data.isComingSoon),
                removedImages: Array.isArray(data.removedImages) ? data.removedImages : [],
              },
            }));
          } else {
            setStoryConfigsMap((prev) => {
              if (!prev[story.id]) return prev;
              const next = { ...prev };
              delete next[story.id];
              return next;
            });
          }
        },
        (error) => {
          handleFirestoreError(error, OperationType.GET, `storyConfigs/${story.id}`);
        }
      )
    );

    return () => {
      unsubscribePhotos();
      configUnsubs.forEach((u) => u());
    };
  }, []);

  // Initial fetch from server for days & bookings
  useEffect(() => {
    let isMounted = true;

    async function loadInitialData() {
      try {
        const [daysRes, bookingsRes] = await Promise.all([
          fetch('/api/days', { cache: 'no-store' }).then(r => (r.ok ? r.json() : null)).catch(() => null),
          fetch('/api/bookings', { cache: 'no-store' }).then(r => (r.ok ? r.json() : null)).catch(() => null),
        ]);

        if (isMounted) {
          if (daysRes && Array.isArray(daysRes) && daysRes.length > 0) {
            const today = new Date().toISOString().split('T')[0];
            const hasUpcoming = daysRes.some(d => d.date >= today);
            const toUse = hasUpcoming ? daysRes : INITIAL_AVAILABLE_DAYS;
            setAvailableDays(toUse);
            try { localStorage.setItem(STORAGE_KEY_DAYS, JSON.stringify(toUse)); } catch (_) {}
          }
          if (bookingsRes && Array.isArray(bookingsRes)) {
            setBookings(bookingsRes);
            try { localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookingsRes)); } catch (_) {}
          }
          isInitializedRef.current = true;
        }
      } catch (err) {
        console.error('Failed to load initial data:', err);
        if (isMounted) isInitializedRef.current = true;
      }
    }

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Sync to local storage & backend server (only after initial load has finished)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DAYS, JSON.stringify(availableDays));
    } catch (e) {
      // ignore
    }
    if (isInitializedRef.current) {
      fetch('/api/days', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(availableDays),
      }).catch(err => console.error('Failed to sync days to server:', err));
    }
  }, [availableDays]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
    } catch (e) {
      // ignore
    }
    if (isInitializedRef.current) {
      fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookings),
      }).catch(err => console.error('Failed to sync bookings to server:', err));
    }
  }, [bookings]);

  const upsertStoryConfig = async (
    storyId: string,
    buildNext: (existing: CloudStoryConfig | null) => CloudStoryConfig
  ) => {
    const configPath = `storyConfigs/${storyId}`;
    const configRef = doc(db, 'storyConfigs', storyId);
    try {
      const snap = await getDoc(configRef);
      const current: CloudStoryConfig | null = snap.exists()
        ? {
            storyId,
            coverImage: typeof snap.data().coverImage === 'string' ? snap.data().coverImage : '',
            isComingSoon: Boolean(snap.data().isComingSoon),
            removedImages: Array.isArray(snap.data().removedImages) ? snap.data().removedImages : [],
          }
        : null;
      const next = buildNext(current);
      if (!snap.exists()) {
        await setDoc(configRef, {
          storyId,
          coverImage: next.coverImage,
          isComingSoon: next.isComingSoon,
          removedImages: next.removedImages.slice(0, 30),
          adminPin: verifiedAdminPin,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      } else {
        await updateDoc(configRef, {
          coverImage: next.coverImage,
          isComingSoon: next.isComingSoon,
          removedImages: next.removedImages.slice(0, 30),
          adminPin: verifiedAdminPin,
          updatedAt: serverTimestamp(),
        });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, configPath);
    }
  };

  const addPhotoToStory = async (storyId: string, imageUrl: string, isCover = false) => {
    const photoId = `photo_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const photoPath = `storyPhotos/${photoId}`;
    try {
      await setDoc(doc(db, 'storyPhotos', photoId), {
        id: photoId,
        storyId,
        imageUrl,
        isDeleted: false,
        adminPin: verifiedAdminPin,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, photoPath);
    }

    const currentStory = stories.find((s) => s.id === storyId);
    await upsertStoryConfig(storyId, (existingCfg) => {
      const existingCover = existingCfg?.coverImage || currentStory?.coverImage || '';
      const nextCover = isCover || !existingCover ? imageUrl : existingCover;
      const nextRemoved = (existingCfg?.removedImages || []).filter((u) => u !== imageUrl);
      return {
        storyId,
        coverImage: nextCover,
        isComingSoon: false,
        removedImages: nextRemoved,
      };
    });
  };

  const removePhotoFromStory = async (storyId: string, imageUrl: string) => {
    const matchingCloudPhotos = cloudPhotos.filter(
      (p) => p.storyId === storyId && !p.isDeleted && p.imageUrl === imageUrl
    );

    for (const p of matchingCloudPhotos) {
      const path = `storyPhotos/${p.id}`;
      try {
        await updateDoc(doc(db, 'storyPhotos', p.id), {
          isDeleted: true,
          adminPin: verifiedAdminPin,
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, path);
      }
    }

    const currentStory = stories.find((s) => s.id === storyId);
    const remaining = (currentStory?.galleryImages || []).filter((img) => img !== imageUrl);
    const isBuiltInAsset =
      !imageUrl.startsWith('data:image') &&
      !imageUrl.startsWith('http') &&
      !imageUrl.startsWith('/uploads/');

    await upsertStoryConfig(storyId, (existingCfg) => {
      const baseRemoved = existingCfg?.removedImages || [];
      const nextRemoved =
        isBuiltInAsset && !baseRemoved.includes(imageUrl)
          ? [...baseRemoved, imageUrl]
          : baseRemoved;
      let nextCover = existingCfg?.coverImage || currentStory?.coverImage || '';
      if (nextCover === imageUrl) {
        nextCover = remaining[0] || '';
      }
      return {
        storyId,
        coverImage: nextCover,
        isComingSoon: remaining.length === 0,
        removedImages: nextRemoved,
      };
    });
  };

  const setStoryCover = async (storyId: string, imageUrl: string) => {
    await upsertStoryConfig(storyId, (existingCfg) => ({
      storyId,
      coverImage: imageUrl,
      isComingSoon: false,
      removedImages: existingCfg?.removedImages || [],
    }));
  };

  const toggleStoryComingSoon = async (storyId: string, isComingSoon: boolean) => {
    const currentStory = stories.find((s) => s.id === storyId);
    await upsertStoryConfig(storyId, (existingCfg) => ({
      storyId,
      coverImage: existingCfg?.coverImage ?? currentStory?.coverImage ?? '',
      isComingSoon,
      removedImages: existingCfg?.removedImages || [],
    }));
  };

  const resetStoriesToDefault = async () => {
    for (const p of cloudPhotos.filter((item) => !item.isDeleted)) {
      const path = `storyPhotos/${p.id}`;
      try {
        await updateDoc(doc(db, 'storyPhotos', p.id), {
          isDeleted: true,
          adminPin: verifiedAdminPin,
          updatedAt: serverTimestamp(),
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, path);
      }
    }

    for (const base of GOLDEN_STORIES) {
      if (storyConfigsMap[base.id]) {
        await upsertStoryConfig(base.id, () => ({
          storyId: base.id,
          coverImage: '',
          isComingSoon: Boolean(base.isComingSoon),
          removedImages: [],
        }));
      }
    }
    localStorage.removeItem(STORAGE_KEY_STORIES_CACHE);
  };

  const updateCloudAdminPin = async (newPin: string, previousPin: string) => {
    const pinRef = doc(db, 'appConfig', 'adminPin');
    try {
      await updateDoc(pinRef, {
        pin: newPin,
        currentPin: previousPin,
        updatedAt: serverTimestamp(),
      });
    } catch (updateErr: any) {
      if (updateErr?.code === 'not-found' || String(updateErr?.message || '').includes('No document to update')) {
        try {
          await setDoc(pinRef, {
            pin: newPin,
            currentPin: previousPin,
            updatedAt: serverTimestamp(),
          });
        } catch (createErr) {
          handleFirestoreError(createErr, OperationType.CREATE, 'appConfig/adminPin');
        }
      } else {
        handleFirestoreError(updateErr, OperationType.UPDATE, 'appConfig/adminPin');
      }
    }
    setVerifiedAdminPin(newPin);
  };

  const openBookingModal = (_packageId?: string, _initialDate?: string, _initialSlot?: TimeSlot) => {
    const agendaSection = document.querySelector('#agenda');
    if (agendaSection) {
      agendaSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const openPhotographerAdmin = (
    tab: AdminTab = 'fotos',
    storyCategory?: string
  ) => {
    setActiveAdminTab(tab);
    if (storyCategory) {
      setActiveStoryCategory(storyCategory);
    }
    setIsPhotographerAdminOpen(true);
  };

  const closePhotographerAdmin = () => {
    setIsPhotographerAdminOpen(false);
  };

  // Add date
  const addAvailableDate = (date: string, locationNote = '') => {
    setAvailableDays(prev => {
      const exists = prev.find(d => d.date === date);
      if (exists) return prev;
      const newDay: AvailableDay = {
        date,
        slots: [
          {
            id: `slot-${Date.now()}-1`,
            time: '18:45 - 20:00',
            type: 'evening',
            label: 'Beschikbaar',
          },
        ],
      };
      return [...prev, newDay].sort((a, b) => a.date.localeCompare(b.date));
    });
  };

  const removeAvailableDate = (date: string) => {
    setAvailableDays(prev => prev.filter(d => d.date !== date));
  };

  const addSlotToDate = (date: string, slot: Omit<TimeSlot, 'id'>) => {
    setAvailableDays(prev =>
      prev.map(day => {
        if (day.date !== date) return day;
        const newSlot: TimeSlot = {
          ...slot,
          id: `slot-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        };
        return {
          ...day,
          slots: [...day.slots, newSlot],
        };
      })
    );
  };

  const removeSlotFromDate = (date: string, slotId: string) => {
    setAvailableDays(prev =>
      prev.map(day => {
        if (day.date !== date) return day;
        return {
          ...day,
          slots: day.slots.filter(s => s.id !== slotId),
        };
      })
    );
  };

  const toggleDateBlocked = (date: string) => {
    setAvailableDays(prev =>
      prev.map(day => {
        if (day.date !== date) return day;
        return {
          ...day,
          isBlocked: !day.isBlocked,
        };
      })
    );
  };

  // Batch add weekend slots
  const batchAddWeekendSunsetSlots = (year: number, monthIndex: number) => {
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const newDatesToAdd: AvailableDay[] = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const curDate = new Date(year, monthIndex, day);
      const dayOfWeek = curDate.getDay(); // 0 = Sunday, 6 = Saturday
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        const dateStr = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        // Check if already exists
        const exists = availableDays.some(d => d.date === dateStr) || newDatesToAdd.some(d => d.date === dateStr);
        if (!exists) {
          newDatesToAdd.push({
            date: dateStr,
            slots: [
              {
                id: `batch-${Date.now()}-${day}`,
                time: '16:00 - 17:15',
                type: 'evening',
                label: 'Gezin',
              },
            ],
          });
        }
      }
    }

    if (newDatesToAdd.length > 0) {
      setAvailableDays(prev => [...prev, ...newDatesToAdd].sort((a, b) => a.date.localeCompare(b.date)));
    }
  };

  // Client creates new booking
  const createNewBooking = (data: {
    packageId: string;
    packageName: string;
    date: string;
    timeSlotId?: string;
    timeSlotLabel?: string;
    timeSlotTime?: string;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    groupSize?: string;
    preferredLocation?: string;
    message?: string;
    depositAmount?: number;
    depositPaid?: boolean;
    paymentMethod?: string;
    termsAccepted?: boolean;
  }): Booking => {
    const newBooking: Booking = {
      ...data,
      id: `bk-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'bevestigd',
      depositAmount: data.depositAmount ?? defaultDepositAmount,
      depositPaid: data.depositPaid ?? true,
      paymentMethod: data.paymentMethod ?? 'iDEAL',
      termsAccepted: data.termsAccepted ?? true,
    };

    // Mark slot or entire day as booked in availableDays so other clients can't double-book
    setAvailableDays(prev =>
      prev.map(d => {
        if (d.date !== data.date) return d;
        const allSlotsBooked = d.slots.map(s => {
          if (!data.timeSlotId || s.id === data.timeSlotId) {
            return { ...s, isBooked: true };
          }
          return s;
        });
        const hasUnbooked = allSlotsBooked.some(s => !s.isBooked);
        return {
          ...d,
          isBlocked: !hasUnbooked,
          slots: allSlotsBooked,
        };
      })
    );

    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus) => {
    setBookings(prev =>
      prev.map(b => {
        if (b.id !== bookingId) return b;
        return { ...b, status };
      })
    );

    // If cancelled, free up the slot
    if (status === 'geannuleerd') {
      const target = bookings.find(b => b.id === bookingId);
      if (target) {
        setAvailableDays(prev =>
          prev.map(d => {
            if (d.date !== target.date) return d;
            return {
              ...d,
              slots: d.slots.map(s => {
                if (s.id === target.timeSlotId) {
                  return { ...s, isBooked: false };
                }
                return s;
              }),
            };
          })
        );
      }
    }
  };

  const deleteBooking = (bookingId: string) => {
    const target = bookings.find(b => b.id === bookingId);
    if (target) {
      setAvailableDays(prev =>
        prev.map(d => {
          if (d.date !== target.date) return d;
          return {
            ...d,
            slots: d.slots.map(s => {
              if (s.id === target.timeSlotId) {
                return { ...s, isBooked: false };
              }
              return s;
            }),
          };
        })
      );
    }
    setBookings(prev => prev.filter(b => b.id !== bookingId));
  };

  const updateBookingNotes = (bookingId: string, notes: string) => {
    setBookings(prev =>
      prev.map(b => (b.id === bookingId ? { ...b, notes } : b))
    );
  };

  const resetAllData = () => {
    setAvailableDays(INITIAL_AVAILABLE_DAYS);
    setBookings(INITIAL_BOOKINGS);
    localStorage.removeItem(STORAGE_KEY_DAYS);
    localStorage.removeItem(STORAGE_KEY_BOOKINGS);
    resetStoriesToDefault();
  };

  return (
    <BookingContext.Provider
      value={{
        availableDays,
        bookings,
        packages: PACKAGES,
        stories,
        activeStoryCategory,
        setActiveStoryCategory,
        isBookingModalOpen,
        selectedPackage,
        selectedDate,
        selectedSlot,
        isPhotographerAdminOpen,
        activeAdminTab,
        isBrochureOpen,
        openBrochure,
        closeBrochure,
        isTermsOpen,
        openTerms,
        closeTerms,
        defaultDepositAmount,
        updateDefaultDepositAmount,
        openBookingModal,
        closeBookingModal,
        openPhotographerAdmin,
        closePhotographerAdmin,
        setVerifiedAdminPin,
        updateCloudAdminPin,
        addPhotoToStory,
        removePhotoFromStory,
        setStoryCover,
        toggleStoryComingSoon,
        resetStoriesToDefault,
        addAvailableDate,
        removeAvailableDate,
        addSlotToDate,
        removeSlotFromDate,
        toggleDateBlocked,
        batchAddWeekendSunsetSlots,
        createNewBooking,
        updateBookingStatus,
        deleteBooking,
        updateBookingNotes,
        resetAllData,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
