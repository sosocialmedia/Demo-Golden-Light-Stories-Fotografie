export type ShootCategory = 'gezin' | 'zwangerschap' | 'newborn' | 'koppels' | 'branding';

export interface ShootPackage {
  id: string;
  title: string;
  category: ShootCategory;
  subtitle: string;
  duration: string;
  description: string;
  inclusions: string[];
  recommendedTime: string;
  price?: string; // e.g. "€ 175,-"
  deposit?: string; // e.g. "€ 50,-"
  isPopular?: boolean;
}

export interface LoveStoryItem {
  id: string;
  title: string;
  country: string;
  coverImage: string;
  galleryImages: string[];
  description?: string;
  isComingSoon?: boolean;
}

export type SlotType = 'golden_hour_sunset' | 'morning_glow' | 'afternoon' | 'evening' | 'morning';

export interface TimeSlot {
  id: string;
  time: string; // e.g. "19:30 - 20:45"
  type: SlotType;
  label: string; // e.g. "Gezin", "Pregnancy", "Newborn"
  isBooked?: boolean;
}

export interface AvailableDay {
  date: string; // "YYYY-MM-DD"
  slots: TimeSlot[];
  locationNote?: string;
  isBlocked?: boolean;
}

export type BookingStatus = 'bevestigd' | 'in_afwachting' | 'geannuleerd' | 'voltooid';

export interface Booking {
  id: string;
  packageId: string;
  packageName: string;
  date: string; // "YYYY-MM-DD"
  timeSlotId: string;
  timeSlotLabel: string;
  timeSlotTime: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  groupSize: string;
  preferredLocation: string;
  message?: string;
  createdAt: string;
  status: BookingStatus;
  notes?: string;
  depositAmount?: number;
  depositPaid?: boolean;
  paymentMethod?: string;
  termsAccepted?: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: ShootCategory;
  imageUrl: string;
  location: string;
  description: string;
}

export interface Review {
  id: string;
  author: string;
  shootType: string;
  location: string;
  text: string;
  rating: number;
  date: string;
}

export interface CalendarSettings {
  photographerName: string;
  email: string;
  phone: string;
  instagramUrl: string;
  facebookUrl: string;
  city: string;
  travelRadius: string;
  externalCalendarUrl?: string;
  autoConfirmBookings: boolean;
  defaultDepositAmount?: number;
}
