import React, { createContext, useContext, useState, useEffect } from 'react';
import { AvailableDay, Booking, BookingStatus, ShootPackage, TimeSlot } from '../types';
import { INITIAL_AVAILABLE_DAYS, INITIAL_BOOKINGS, PACKAGES } from '../data/photographyData';
import { openBrochurePdf, openTermsPdf } from '../utils/pdfDownload';

interface BookingContextType {
  availableDays: AvailableDay[];
  bookings: Booking[];
  packages: ShootPackage[];
  isBookingModalOpen: boolean;
  selectedPackage: ShootPackage | null;
  isPhotographerAdminOpen: boolean;
  activeAdminTab: 'beschikbaarheid' | 'boekingen' | 'synchronisatie';
  
  // Brochure & Terms Modals
  isBrochureOpen: boolean;
  openBrochure: () => void;
  closeBrochure: () => void;
  isTermsOpen: boolean;
  openTerms: () => void;
  closeTerms: () => void;
  defaultDepositAmount: number;
  updateDefaultDepositAmount: (amount: number) => void;

  // Actions
  openBookingModal: (packageId?: string) => void;
  closeBookingModal: () => void;
  openPhotographerAdmin: (tab?: 'beschikbaarheid' | 'boekingen' | 'synchronisatie') => void;
  closePhotographerAdmin: () => void;
  
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
    timeSlotId: string;
    timeSlotLabel: string;
    timeSlotTime: string;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    groupSize: string;
    preferredLocation: string;
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

const STORAGE_KEY_DAYS = 'golden_light_october2026_days_v4';
const STORAGE_KEY_BOOKINGS = 'golden_light_october2026_bookings_v4';

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [availableDays, setAvailableDays] = useState<AvailableDay[]>(() => {
    const minDate = '2026-10-01';
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DAYS);
      if (saved) {
        const parsed: AvailableDay[] = JSON.parse(saved);
        const filtered = parsed.filter(d => d.date >= minDate);
        if (filtered.length > 0) return filtered;
      }
    } catch (e) {
      console.error('Failed to load saved days', e);
    }
    return INITIAL_AVAILABLE_DAYS.filter(d => d.date >= minDate);
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

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<ShootPackage | null>(null);
  const [isPhotographerAdminOpen, setIsPhotographerAdminOpen] = useState(false);
  const [activeAdminTab, setActiveAdminTab] = useState<'beschikbaarheid' | 'boekingen' | 'synchronisatie'>('beschikbaarheid');

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

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DAYS, JSON.stringify(availableDays));
    } catch (e) {
      console.error('Failed to save days', e);
    }
  }, [availableDays]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
    } catch (e) {
      console.error('Failed to save bookings', e);
    }
  }, [bookings]);

  const openBookingModal = (packageId?: string) => {
    if (packageId) {
      const pkg = PACKAGES.find(p => p.id === packageId) || PACKAGES[0];
      setSelectedPackage(pkg);
    } else {
      setSelectedPackage(PACKAGES[0]);
    }
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
  };

  const openPhotographerAdmin = (tab: 'beschikbaarheid' | 'boekingen' | 'synchronisatie' = 'beschikbaarheid') => {
    setActiveAdminTab(tab);
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
    timeSlotId: string;
    timeSlotLabel: string;
    timeSlotTime: string;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    groupSize: string;
    preferredLocation: string;
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

    // Mark slot as booked in availableDays so other clients can't book it
    setAvailableDays(prev =>
      prev.map(d => {
        if (d.date !== data.date) return d;
        return {
          ...d,
          slots: d.slots.map(s => {
            if (s.id === data.timeSlotId) {
              return { ...s, isBooked: true };
            }
            return s;
          }),
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
  };

  return (
    <BookingContext.Provider
      value={{
        availableDays,
        bookings,
        packages: PACKAGES,
        isBookingModalOpen,
        selectedPackage,
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
