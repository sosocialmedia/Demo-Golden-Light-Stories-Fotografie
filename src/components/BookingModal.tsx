import React, { useState, useMemo } from 'react';
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  Mail,
  Phone,
  Users,
  Check,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Sun,
  ExternalLink,
  Download,
  MessageSquare,
  BookOpen,
  FileText,
  CreditCard,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { createGoogleCalendarUrl, downloadIcsFile } from '../utils/calendarSync';
import { Booking, ShootPackage, TimeSlot } from '../types';

export const BookingModal: React.FC = () => {
  const {
    isBookingModalOpen,
    closeBookingModal,
    packages,
    selectedPackage: initialPackage,
    availableDays,
    createNewBooking,
    openBrochure,
    openTerms,
    defaultDepositAmount,
  } = useBooking();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [chosenPackage, setChosenPackage] = useState<ShootPackage | null>(initialPackage || packages[0]);
  const [chosenDate, setChosenDate] = useState<string>('');
  const [chosenSlot, setChosenSlot] = useState<TimeSlot | null>(null);

  // Form fields (clean, neutral, no mock data)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [message, setMessage] = useState('');

  // Deposit & Payment state
  const [paymentMethod, setPaymentMethod] = useState<'iDEAL' | 'Bancontact' | 'Betaalverzoek' | 'Factuur'>('iDEAL');
  const [idealBank, setIdealBank] = useState('ING');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Confirmed booking state
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Sync initial package when modal opens
  React.useEffect(() => {
    if (initialPackage) {
      setChosenPackage(initialPackage);
    }
  }, [initialPackage]);

  // Reset when opening
  React.useEffect(() => {
    if (isBookingModalOpen) {
      if (!confirmedBooking) {
        setStep(1);
      }
    }
  }, [isBookingModalOpen]);

  // Filter available days that have at least one unbooked slot and are in future
  const activeAvailableDays = useMemo(() => {
    const today = '2026-10-01';
    return availableDays.filter(day => !day.isBlocked && day.date >= today);
  }, [availableDays]);

  const selectedDayObj = useMemo(() => {
    return availableDays.find(d => d.date === chosenDate);
  }, [availableDays, chosenDate]);

  // Calculation helpers
  const depositNum = defaultDepositAmount || 50;
  const priceInfo = useMemo(() => {
    if (!chosenPackage?.price) {
      return { total: 175, deposit: depositNum, remainder: 125, displayTotal: '€ 175,-' };
    }
    const match = chosenPackage.price.match(/\d+/);
    const total = match ? parseInt(match[0], 10) : 175;
    const remainder = Math.max(0, total - depositNum);
    return {
      total,
      deposit: depositNum,
      remainder,
      displayTotal: chosenPackage.price,
    };
  }, [chosenPackage, depositNum]);

  if (!isBookingModalOpen) return null;

  const handleDateSelect = (dateStr: string) => {
    setChosenDate(dateStr);
    setChosenSlot(null);
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    if (slot.isBooked) return;
    setChosenSlot(slot);
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chosenPackage || !chosenDate || !chosenSlot) return;
    if (!termsAccepted) {
      alert('Gelieve akkoord te gaan met de algemene voorwaarden om de reservering te voltooien.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const clientName = `${firstName} ${lastName}`.trim();
      const booking = createNewBooking({
        packageId: chosenPackage.id,
        packageName: chosenPackage.title,
        date: chosenDate,
        timeSlotId: chosenSlot.id,
        timeSlotLabel: chosenSlot.label,
        timeSlotTime: chosenSlot.time,
        clientName,
        clientEmail,
        clientPhone,
        groupSize: '',
        preferredLocation: '',
        message,
        depositAmount: depositNum,
        depositPaid: true,
        paymentMethod: paymentMethod === 'iDEAL' ? `iDEAL (${idealBank})` : paymentMethod,
        termsAccepted: true,
      });

      setConfirmedBooking(booking);
      setIsProcessing(false);
      setStep(4);
    }, 700);
  };

  // Format nice Dutch date
  const formatDutchDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr + 'T12:00:00');
      return d.toLocaleDateString('nl-NL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#2A211D]/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#DFCFC0] overflow-hidden my-auto max-h-[92vh] flex flex-col text-left">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#E8DFD5] flex items-center justify-between bg-[#F5F0E8]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#EFE7DC] flex items-center justify-center text-[#A67C46]">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h3
                className="text-xl sm:text-2xl text-[#2A211D] font-medium leading-none"
                style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
              >
                Plan jouw fotoshoot
              </h3>
              <p className="text-xs text-[#705E53] mt-1 font-light">
                Kies een datum uit de live agenda van Golden Light Stories Fotografie
              </p>
            </div>
          </div>
          
          <button
            onClick={closeBookingModal}
            className="p-2 rounded-full hover:bg-[#EFE7DC] text-[#705E53] transition-colors"
            aria-label="Sluiten"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Stepper Bar (Steps 1 to 3) */}
        {step < 4 && (
          <div className="px-6 py-3 bg-[#EFE7DC]/60 border-b border-[#E8DFD5] flex items-center justify-between text-xs font-medium">
            <div className="flex items-center space-x-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 1 ? 'bg-[#2A211D] text-white' : 'bg-[#D5C7B8] text-[#2A211D]'}`}>
                1
              </span>
              <span className={step === 1 ? 'text-[#2A211D] font-semibold' : 'text-[#705E53]'}>
                Pakket
              </span>
            </div>
            <div className="h-[1px] w-6 sm:w-10 bg-[#D5C7B8]" />
            <div className="flex items-center space-x-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 2 ? 'bg-[#2A211D] text-white' : 'bg-[#D5C7B8] text-[#2A211D]'}`}>
                2
              </span>
              <span className={step === 2 ? 'text-[#2A211D] font-semibold' : 'text-[#705E53]'}>
                Datum & Slot
              </span>
            </div>
            <div className="h-[1px] w-6 sm:w-10 bg-[#D5C7B8]" />
            <div className="flex items-center space-x-2">
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 3 ? 'bg-[#2A211D] text-white' : 'bg-[#D5C7B8] text-[#2A211D]'}`}>
                3
              </span>
              <span className={step === 3 ? 'text-[#2A211D] font-semibold' : 'text-[#705E53]'}>
                Gegevens & Aanbetaling
              </span>
            </div>
          </div>
        )}

        {/* Modal Body Container */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* STEP 1: Select Shoot Package */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4
                    className="text-xl text-[#2A211D] font-normal"
                    style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                  >
                    Stap 1: Welke herinnering wil je laten vastleggen?
                  </h4>
                  <p className="text-xs text-[#5A4D45]">
                    Selecteer het type fotoshoot dat jullie voor ogen hebben.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={openBrochure}
                  className="inline-flex items-center space-x-1.5 text-xs text-[#A67C46] hover:text-[#2A211D] font-medium underline underline-offset-2 self-start sm:self-auto"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Bekijk Brochure & Tarieven</span>
                </button>
              </div>

              <div className="space-y-3">
                {packages.map(pkg => {
                  const isSelected = chosenPackage?.id === pkg.id;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setChosenPackage(pkg)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#F2ECE1] border-[#A67C46] ring-1 ring-[#A67C46]/30 shadow-xs'
                          : 'bg-[#FAF7F2] border-[#E0D6CB] hover:bg-[#F5F0E8]'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span
                            className="text-lg font-medium text-[#2A211D]"
                            style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                          >
                            {pkg.title}
                          </span>
                          {pkg.isPopular && (
                            <span className="text-[10px] bg-[#A67C46] text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                              Populair
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#5A4D45] max-w-md">
                          {pkg.subtitle}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#705E53] pt-1">
                          <span className="font-semibold text-[#1A1412]">
                            {pkg.price || '€ 175,-'}
                          </span>
                          <span>•</span>
                          <span className="text-[#A67C46] font-medium">
                            Aanbetaling: € {pkg.deposit || '€ 50,-'}
                          </span>
                          <span>•</span>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-[#A67C46]" />
                            <span>{pkg.duration}</span>
                          </span>
                        </div>
                      </div>

                      <div className="text-right pl-4 shrink-0">
                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center ml-auto ${
                          isSelected ? 'bg-[#A67C46] border-[#A67C46] text-white' : 'border-[#D5C7B8]'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={openTerms}
                  className="text-xs text-[#705E53] underline hover:text-[#2A211D]"
                >
                  Algemene Voorwaarden inzien
                </button>

                <button
                  disabled={!chosenPackage}
                  onClick={() => setStep(2)}
                  className="flex items-center space-x-2 bg-[#2A211D] hover:bg-[#3D312A] text-[#FAF7F2] px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold transition-all disabled:opacity-50 shadow-xs"
                >
                  <span>Kies Beschikbare Datum</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Select Date & Available Time Slot */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h4
                  className="text-xl text-[#2A211D] font-normal"
                  style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                >
                  Stap 2: Kies een datum & tijdslot
                </h4>
                <p className="text-xs text-[#5A4D45]">
                  Onderstaande data zijn actueel vrijgegeven. Met de aanbetaling van € {depositNum},- reserveer je dit slot direct.
                </p>
              </div>

              {/* Chosen Package Reminder Banner */}
              <div className="p-3 rounded-xl bg-[#F2ECE1] border border-[#DFCFC0] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#705E53]">Gekozen sessie:</span>{' '}
                  <strong className="text-[#2A211D] font-medium">{chosenPackage?.title}</strong>{' '}
                  <span className="text-[#A67C46] font-semibold">({priceInfo.displayTotal})</span>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-[11px] text-[#A67C46] underline hover:text-[#2A211D]"
                >
                  Wijzigen
                </button>
              </div>

              {/* Available Dates Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#705E53] mb-2">
                  1. Beschikbare Data ({activeAvailableDays.length} data beschikbaar)
                </label>

                {activeAvailableDays.length === 0 ? (
                  <div className="p-6 text-center bg-[#FAF7F2] rounded-2xl border border-dashed border-[#DFCFC0]">
                    <p className="text-sm text-[#705E53]">
                      Er zijn op dit moment geen openstaande data. Neem gerust contact op voor een datum op maat!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
                    {activeAvailableDays.map(day => {
                      const isSelected = chosenDate === day.date;
                      const freeSlotsCount = day.slots.filter(s => !s.isBooked).length;
                      
                      return (
                        <button
                          key={day.date}
                          type="button"
                          onClick={() => handleDateSelect(day.date)}
                          className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'bg-[#2A211D] border-[#2A211D] text-white shadow-xs'
                              : 'bg-[#FAF7F2] border-[#E0D6CB] hover:bg-[#F2ECE1] text-[#2A211D]'
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span
                              className="text-base font-medium capitalize"
                              style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                            >
                              {formatDutchDate(day.date)}
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                              isSelected ? 'bg-white/20 text-white' : 'bg-[#EFE7DC] text-[#705E53]'
                            }`}>
                              {freeSlotsCount} {freeSlotsCount === 1 ? 'slot' : 'slots'}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Time slots for selected date */}
              {chosenDate && selectedDayObj && (
                <div className="pt-2 animate-in fade-in duration-200">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#705E53] mb-2">
                    2. Kies een tijdslot op {formatDutchDate(chosenDate)}
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedDayObj.slots.map(slot => {
                      const isBooked = !!slot.isBooked;
                      const isSelected = chosenSlot?.id === slot.id;

                      return (
                        <button
                          key={slot.id}
                          type="button"
                          disabled={isBooked}
                          onClick={() => handleSlotSelect(slot)}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            isBooked
                              ? 'bg-[#F0EBE3]/50 border-dashed border-[#D5C7B8] opacity-50 cursor-not-allowed'
                              : isSelected
                              ? 'bg-[#F2ECE1] border-[#A67C46] ring-2 ring-[#A67C46] shadow-xs'
                              : 'bg-[#FAF7F2] border-[#E0D6CB] hover:bg-[#F5F0E8]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-[#A67C46]" />
                              <div>
                                <span className="font-semibold text-xs text-[#2A211D] block">
                                  {slot.time}
                                </span>
                                {slot.label && slot.label !== 'Beschikbaar' && (
                                  <span className="text-[10px] text-[#A67C46] font-medium block">
                                    {slot.label}
                                  </span>
                                )}
                              </div>
                            </div>
                            {isBooked ? (
                              <span className="text-[10px] uppercase tracking-wider text-red-600 font-semibold">
                                Bezet
                              </span>
                            ) : (
                              <span className="text-[10px] text-[#A67C46] font-medium bg-[#EFE7DC] px-2 py-0.5 rounded-full">
                                Beschikbaar
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="pt-4 flex items-center justify-between border-t border-[#E8DFD5]">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center space-x-1.5 text-xs text-[#5A4D45] hover:text-[#2A211D]"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Terug naar Pakketten</span>
                </button>

                <button
                  disabled={!chosenDate || !chosenSlot}
                  onClick={() => setStep(3)}
                  className="flex items-center space-x-2 bg-[#2A211D] hover:bg-[#3D312A] text-[#FAF7F2] px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold transition-all disabled:opacity-50 shadow-xs"
                >
                  <span>Verder naar Gegevens & Aanbetaling</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Client Details & Deposit Payment Form */}
          {step === 3 && (
            <form onSubmit={handleSubmitBooking} className="space-y-5">
              <div>
                <h4
                  className="text-xl text-[#2A211D] font-normal"
                  style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                >
                  Stap 3: Jullie gegevens & Aanbetaling
                </h4>
                <p className="text-xs text-[#5A4D45]">
                  Vul hieronder je contactgegevens in en voldoe de kleine aanbetaling om de datum definitief vast te zetten.
                </p>
              </div>

              {/* Summary & Deposit Calculation Card */}
              <div className="p-4 rounded-2xl bg-[#F2ECE1] border border-[#DFCFC0] text-xs space-y-2.5">
                <div className="flex justify-between items-center pb-2 border-b border-[#DFCFC0]">
                  <div>
                    <span className="font-semibold text-sm text-[#2A211D] block">{chosenPackage?.title}</span>
                    <span className="text-[11px] text-[#705E53] capitalize">
                      {chosenDate && formatDutchDate(chosenDate)} • {chosenSlot?.time}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#705E53] block">Totale investering</span>
                    <span
                      className="text-base font-normal text-[#1A1412]"
                      style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                    >
                      {priceInfo.displayTotal}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-0.5">
                  <div className="p-2.5 rounded-xl bg-white/70 border border-[#E0D5C9]">
                    <span className="text-[10px] uppercase tracking-wider text-[#705E53] font-medium block">
                      Aanbetaling nu te voldoen
                    </span>
                    <span
                      className="text-lg font-normal text-[#A67C46]"
                      style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                    >
                      € {priceInfo.deposit},-
                    </span>
                    <span className="text-[10px] text-[#8C7B71] block">
                      Direct definitief vastgelegd
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/70 border border-[#E0D5C9]">
                    <span className="text-[10px] uppercase tracking-wider text-[#705E53] font-medium block">
                      Restantbedrag na fotoshoot
                    </span>
                    <span
                      className="text-lg font-normal text-[#1A1412]"
                      style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                    >
                      € {priceInfo.remainder},-
                    </span>
                    <span className="text-[10px] text-[#8C7B71] block">
                      Per factuur bij levering galerij
                    </span>
                  </div>
                </div>
              </div>

              {/* Form Input Fields: Just Voornaam, Achternaam, E-mail, Telefoonnummer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#5A4D45] mb-1">
                    Voornaam *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#A67C46] absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      placeholder="Voornaam"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#D5C7B8] bg-[#FAF7F2] text-[#2A211D] focus:outline-none focus:ring-1 focus:ring-[#A67C46]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5A4D45] mb-1">
                    Achternaam *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#A67C46] absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      placeholder="Achternaam"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#D5C7B8] bg-[#FAF7F2] text-[#2A211D] focus:outline-none focus:ring-1 focus:ring-[#A67C46]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5A4D45] mb-1">
                    E-mailadres *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#A67C46] absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={e => setClientEmail(e.target.value)}
                      placeholder="E-mailadres"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#D5C7B8] bg-[#FAF7F2] text-[#2A211D] focus:outline-none focus:ring-1 focus:ring-[#A67C46]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5A4D45] mb-1">
                    Telefoonnummer *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#A67C46] absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={e => setClientPhone(e.target.value)}
                      placeholder="Telefoonnummer"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#D5C7B8] bg-[#FAF7F2] text-[#2A211D] focus:outline-none focus:ring-1 focus:ring-[#A67C46]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5A4D45] mb-1">
                  Vragen of opmerkingen (optioneel)
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-[#A67C46] absolute left-3 top-2.5" />
                  <textarea
                    rows={2}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Eventuele vragen of opmerkingen..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#D5C7B8] bg-[#FAF7F2] text-[#2A211D] focus:outline-none focus:ring-1 focus:ring-[#A67C46]"
                  />
                </div>
              </div>

              {/* Payment Method Selector for Deposit */}
              <div className="pt-2 border-t border-[#E8DFD5] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#705E53]">
                    Betaalmethode voor de Aanbetaling (€ {priceInfo.deposit},-)
                  </label>
                  <div className="flex items-center space-x-1 text-[11px] text-[#A67C46]">
                    <Lock className="w-3 h-3" />
                    <span>Veilig & Vertrouwd</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('iDEAL')}
                    className={`p-3 rounded-xl border text-center transition-all text-xs font-medium ${
                      paymentMethod === 'iDEAL'
                        ? 'bg-[#2A211D] border-[#2A211D] text-white shadow-2xs'
                        : 'bg-[#FAF7F2] border-[#D5C7B8] hover:bg-[#F2ECE1] text-[#2A211D]'
                    }`}
                  >
                    iDEAL
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Bancontact')}
                    className={`p-3 rounded-xl border text-center transition-all text-xs font-medium ${
                      paymentMethod === 'Bancontact'
                        ? 'bg-[#2A211D] border-[#2A211D] text-white shadow-2xs'
                        : 'bg-[#FAF7F2] border-[#D5C7B8] hover:bg-[#F2ECE1] text-[#2A211D]'
                    }`}
                  >
                    Bancontact
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Betaalverzoek')}
                    className={`p-3 rounded-xl border text-center transition-all text-xs font-medium ${
                      paymentMethod === 'Betaalverzoek'
                        ? 'bg-[#2A211D] border-[#2A211D] text-white shadow-2xs'
                        : 'bg-[#FAF7F2] border-[#D5C7B8] hover:bg-[#F2ECE1] text-[#2A211D]'
                    }`}
                  >
                    Tikkie / Link
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Factuur')}
                    className={`p-3 rounded-xl border text-center transition-all text-xs font-medium ${
                      paymentMethod === 'Factuur'
                        ? 'bg-[#2A211D] border-[#2A211D] text-white shadow-2xs'
                        : 'bg-[#FAF7F2] border-[#D5C7B8] hover:bg-[#F2ECE1] text-[#2A211D]'
                    }`}
                  >
                    Factuur
                  </button>
                </div>

                {/* iDEAL Bank Selector if chosen */}
                {paymentMethod === 'iDEAL' && (
                  <div className="pt-1">
                    <label className="block text-[11px] text-[#705E53] mb-1">
                      Kies jouw bank:
                    </label>
                    <select
                      value={idealBank}
                      onChange={e => setIdealBank(e.target.value)}
                      className="w-full py-2 px-3 text-xs rounded-xl border border-[#D5C7B8] bg-white text-[#2A211D] focus:outline-none focus:ring-1 focus:ring-[#A67C46]"
                    >
                      <option value="ING">ING Bank</option>
                      <option value="Rabobank">Rabobank</option>
                      <option value="ABN AMRO">ABN AMRO</option>
                      <option value="bunq">bunq</option>
                      <option value="ASN Bank">ASN Bank</option>
                      <option value="RegioBank">RegioBank</option>
                      <option value="SNS Bank">SNS Bank</option>
                      <option value="Triodos Bank">Triodos Bank</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Terms and Conditions Accordance Checkbox */}
              <div className="pt-2 space-y-2">
                <label className="flex items-start space-x-2.5 cursor-pointer text-xs text-[#5A4D45]">
                  <input
                    type="checkbox"
                    required
                    checked={termsAccepted}
                    onChange={e => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 rounded border-[#D5C7B8] text-[#A67C46] focus:ring-[#A67C46]"
                  />
                  <span>
                    Ik ga akkoord met de{' '}
                    <button
                      type="button"
                      onClick={openTerms}
                      className="text-[#2A211D] underline font-semibold hover:text-[#A67C46]"
                    >
                      Algemene Voorwaarden
                    </button>{' '}
                    en begrijp dat de aanbetaling van € {priceInfo.deposit},- de datum en het tijdslot definitief reserveert.
                  </span>
                </label>

                <div className="flex items-center space-x-2 text-[11px] text-[#8C7B71] pl-6">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#A67C46]" />
                  <span>
                    Inclusief kosteloze slecht-weer en ziekte garantie conform artikel 3 van de voorwaarden.
                  </span>
                </div>
              </div>

              {/* Navigation and Submit Buttons */}
              <div className="pt-4 flex items-center justify-between border-t border-[#E8DFD5]">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center space-x-1.5 text-xs text-[#5A4D45] hover:text-[#2A211D]"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Terug naar Datum</span>
                </button>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="flex items-center space-x-2 bg-[#2A211D] hover:bg-[#3D312A] text-[#FAF7F2] px-7 py-3 rounded-full text-xs uppercase tracking-widest font-semibold transition-all shadow-md disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Aanbetaling verwerken...</span>
                  ) : (
                    <>
                      <Check className="w-4 h-4 text-[#E6C9A2]" />
                      <span>Aanbetaling € {priceInfo.deposit},- Voldoen & Reserveren</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Success & Agenda Koppeling (Google Calendar & iCal) */}
          {step === 4 && confirmedBooking && (
            <div className="space-y-6 text-center py-2 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-[#EFE7DC] rounded-full flex items-center justify-center mx-auto text-[#A67C46]">
                <Sparkles className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h4
                  className="text-2xl sm:text-3xl text-[#2A211D] font-normal"
                  style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                >
                  Jullie shoot is gereserveerd!
                </h4>
                <p className="text-xs sm:text-sm text-[#5A4D45] max-w-md mx-auto font-light leading-relaxed">
                  Dankjewel <strong className="text-[#2A211D]">{confirmedBooking.clientName}</strong>!
                  De datum is direct gereserveerd in de agenda. Je ontvangt zo spoedig mogelijk een bevestiging.
                </p>
              </div>

              {/* Deposit Payment Success Banner */}
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-center space-x-2 max-w-md mx-auto">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">
                  Aanbetaling van € {confirmedBooking.depositAmount || 50},- succesvol geregistreerd ({confirmedBooking.paymentMethod || 'iDEAL'})
                </span>
              </div>

              {/* Booking Receipt Summary Card */}
              <div className="p-4 rounded-2xl bg-[#F2ECE1] border border-[#DFCFC0] max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-[#DFCFC0] pb-2 font-medium text-sm text-[#2A211D]">
                  <span style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}>{confirmedBooking.packageName}</span>
                  <span>{confirmedBooking.date}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-[#5A4D45]">
                  <div>
                    <span className="text-[#705E53] block">Tijdslot:</span>
                    <strong className="text-[#2A211D]">{confirmedBooking.timeSlotTime}</strong>
                  </div>
                  <div>
                    <span className="text-[#705E53] block">Naam:</span>
                    <strong className="text-[#2A211D]">{confirmedBooking.clientName}</strong>
                  </div>
                  <div>
                    <span className="text-[#705E53] block">E-mail:</span>
                    <span>{confirmedBooking.clientEmail}</span>
                  </div>
                  <div>
                    <span className="text-[#705E53] block">Telefoon:</span>
                    <span>{confirmedBooking.clientPhone}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#DFCFC0] text-[11px] text-[#705E53] flex justify-between">
                  <span>Aanbetaling voldaan:</span>
                  <strong className="text-[#2A211D]">€ {confirmedBooking.depositAmount || 50},-</strong>
                </div>
              </div>

              {/* Helpful Document Links */}
              <div className="flex items-center justify-center space-x-4 text-xs pt-1">
                <button
                  type="button"
                  onClick={openBrochure}
                  className="flex items-center space-x-1.5 text-[#A67C46] hover:text-[#2A211D] font-medium underline"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Brochure bekijken</span>
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={openTerms}
                  className="flex items-center space-x-1.5 text-[#A67C46] hover:text-[#2A211D] font-medium underline"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Algemene Voorwaarden</span>
                </button>
              </div>

              {/* Agenda Koppelen Acties for Client */}
              <div className="space-y-3 max-w-md mx-auto pt-2">
                <p className="text-xs uppercase tracking-wider text-[#705E53] font-semibold">
                  Zet de fotoshoot direct in jouw agenda:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    id="add-to-google-calendar-btn"
                    href={createGoogleCalendarUrl(confirmedBooking)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl border border-[#D5C7B8] bg-white text-[#2A211D] hover:bg-[#EFE7DC] text-xs font-semibold shadow-2xs transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#A67C46]" />
                    <span>Google Agenda</span>
                  </a>

                  <button
                    id="download-ics-calendar-btn"
                    onClick={() => downloadIcsFile(confirmedBooking)}
                    className="flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl border border-[#D5C7B8] bg-white text-[#2A211D] hover:bg-[#EFE7DC] text-xs font-semibold shadow-2xs transition-all"
                  >
                    <Download className="w-3.5 h-3.5 text-[#A67C46]" />
                    <span>Apple / Outlook (.ics)</span>
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8DFD5] flex justify-center">
                <button
                  onClick={closeBookingModal}
                  className="bg-[#2A211D] hover:bg-[#3D312A] text-white px-8 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold"
                >
                  Sluiten & Terug naar Website
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
