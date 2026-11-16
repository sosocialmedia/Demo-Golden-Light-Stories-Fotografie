import React, { createContext, useContext, useState, useEffect } from 'react';
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
  
  // Photo management by Photographer
  addPhotoToStory: (storyId: string, imageUrl: string, isCover?: boolean) => void;
  removePhotoFromStory: (storyId: string, imageIndex: number) => void;
  setStoryCover: (storyId: string, imageUrl: string) => void;
  toggleStoryComingSoon: (storyId: string, isComingSoon: boolean) => void;
  resetStoriesToDefault: () => void;
  
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
const STORAGE_KEY_STORIES = 'golden_light_stories_data_v2';

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

  const [stories, setStories] = useState<LoveStoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STORIES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load saved stories', e);
    }
    return GOLDEN_STORIES;
  });

  const [activeStoryCategory, setActiveStoryCategory] = useState<string>('story-newborn');

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<ShootPackage | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isPhotographerAdminOpen, setIsPhotographerAdminOpen] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState<AdminTab>('beschikbaarheid');

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

  // Initial fetch from server for cross-device synchronization
  useEffect(() => {
    let isMounted = true;

    async function loadInitialData() {
      try {
        const [storiesRes, daysRes, bookingsRes] = await Promise.all([
          fetch('/api/stories').then(r => r.json()).catch(() => null),
          fetch('/api/days').then(r => r.json()).catch(() => null),
          fetch('/api/bookings').then(r => r.json()).catch(() => null),
        ]);

        if (isMounted) {
          if (storiesRes && Array.isArray(storiesRes) && storiesRes.length > 0) {
            setStories(storiesRes);
            try { localStorage.setItem(STORAGE_KEY_STORIES, JSON.stringify(storiesRes)); } catch (_) {}
          }
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

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STORIES, JSON.stringify(stories));
    } catch (e) {
      // ignore
    }
    if (isInitializedRef.current) {
      fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stories),
      }).catch(err => console.error('Failed to sync stories to server:', err));
    }
  }, [stories]);

  const addPhotoToStory = (storyId: string, imageUrl: string, isCover = false) => {
    setStories(prev => {
      const updated = prev.map(story => {
        if (story.id !== storyId) return story;
        const newGallery = [...story.galleryImages, imageUrl];
        const newCover = (isCover || !story.coverImage) ? imageUrl : story.coverImage;
        return {
          ...story,
          coverImage: newCover,
          galleryImages: newGallery,
          isComingSoon: false,
        };
      });
      try { localStorage.setItem(STORAGE_KEY_STORIES, JSON.stringify(updated)); } catch (_) {}
      fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      }).catch(err => console.error('Failed to immediately save stories:', err));
      return updated;
    });
  };

  const removePhotoFromStory = (storyId: string, imageIndex: number) => {
    setStories(prev => {
      const updated = prev.map(story => {
        if (story.id !== storyId) return story;
        const removedImg = story.galleryImages[imageIndex];
        const newGallery = story.galleryImages.filter((_, idx) => idx !== imageIndex);
        let newCover = story.coverImage;
        if (story.coverImage === removedImg) {
          newCover = newGallery.length > 0 ? newGallery[0] : '';
        }
        return {
          ...story,
          coverImage: newCover,
          galleryImages: newGallery,
          isComingSoon: newGallery.length === 0,
        };
      });
      try { localStorage.setItem(STORAGE_KEY_STORIES, JSON.stringify(updated)); } catch (_) {}
      fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      }).catch(err => console.error('Failed to immediately save stories:', err));
      return updated;
    });
  };

  const setStoryCover = (storyId: string, imageUrl: string) => {
    setStories(prev => {
      const updated = prev.map(story => {
        if (story.id !== storyId) return story;
        return {
          ...story,
          coverImage: imageUrl,
        };
      });
      try { localStorage.setItem(STORAGE_KEY_STORIES, JSON.stringify(updated)); } catch (_) {}
      fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      }).catch(err => console.error('Failed to immediately save stories:', err));
      return updated;
    });
  };

  const toggleStoryComingSoon = (storyId: string, isComingSoon: boolean) => {
    setStories(prev => {
      const updated = prev.map(story => {
        if (story.id !== storyId) return story;
        return {
          ...story,
          isComingSoon,
        };
      });
      try { localStorage.setItem(STORAGE_KEY_STORIES, JSON.stringify(updated)); } catch (_) {}
      fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      }).catch(err => console.error('Failed to immediately save stories:', err));
      return updated;
    });
  };

  const resetStoriesToDefault = () => {
    setStories(GOLDEN_STORIES);
    localStorage.removeItem(STORAGE_KEY_STORIES);
  };

  const openBookingModal = (packageId?: string, initialDate?: string, initialSlot?: TimeSlot) => {
    if (packageId) {
      const pkg = PACKAGES.find(p => p.id === packageId) || PACKAGES[0];
      setSelectedPackage(pkg);
    } else {
      setSelectedPackage(PACKAGES[0]);
    }
    setSelectedDate(initialDate || null);
    setSelectedSlot(initialSlot || null);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const openPhotographerAdmin = (
    tab: AdminTab = 'beschikbaarheid',
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
