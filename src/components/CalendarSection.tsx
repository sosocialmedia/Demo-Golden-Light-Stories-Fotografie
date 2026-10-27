import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight, Settings, ChevronDown, Lock } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { AdminPinModal } from './AdminPinModal';

export const CalendarSection: React.FC = () => {
  const { availableDays, openBookingModal, openPhotographerAdmin, defaultDepositAmount } = useBooking();
  const [showAllDates, setShowAllDates] = useState(false);
  const [activeView, setActiveView] = useState<'google-agenda' | 'beschikbare-data'>('google-agenda');
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);

  const today = '2026-10-01';
  const upcomingDays = availableDays
    .filter(day => !day.isBlocked && day.date >= today);

  const displayedDays = showAllDates ? upcomingDays : upcomingDays.slice(0, 3);

  const googleCalendarEmbedUrl =
    'https://calendar.google.com/calendar/embed?src=nikki.jvdd%40gmail.com&ctz=Europe%2FAmsterdam&hl=nl&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=1&mode=MONTH';

  const formatDutchDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr + 'T12:00:00');
      return {
        weekday: d.toLocaleDateString('nl-NL', { weekday: 'long' }),
        day: d.getDate(),
        month: d.toLocaleDateString('nl-NL', { month: 'long' }),
        year: d.getFullYear(),
      };
    } catch {
      return { weekday: '', day: 0, month: dateStr, year: 2026 };
    }
  };

  return (
    <section id="agenda" className="bg-[#FAF7F2] text-[#241C18] py-20 sm:py-28 border-t border-[#EFE8DE]">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Header: Rustig, overzichtelijk & redactioneel */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
          <p
            className="text-xs uppercase tracking-[0.32em] text-[#7A6B62] font-medium"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            BESCHIKBAARHEID & RESERVEREN
          </p>

          <h2
            className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#1A1412] font-normal"
            style={{ fontFamily: "'Bodoni Moda', 'Cormorant Garamond', Georgia, serif" }}
          >
            Agenda
          </h2>

          <p
            className="text-[#685A52] text-sm sm:text-base leading-relaxed font-light pt-2"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            Bekijk direct mijn actuele beschikbaarheid in Google Agenda of kies een van de aanbevolen data.
            Met een kleine aanbetaling van € {defaultDepositAmount || 50},- leg je de datum direct definitief vast.
          </p>
        </div>

        {/* View Switcher: Google Agenda vs Data & Tijdsloten met discreet beheer-icoontje */}
        <div className="relative flex items-center justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-full bg-[#EFE8DE] border border-[#DFCFC0]">
            <button
              onClick={() => setActiveView('google-agenda')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
                activeView === 'google-agenda'
                  ? 'bg-[#1A1412] text-white shadow-xs'
                  : 'text-[#685A52] hover:text-[#1A1412]'
              }`}
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              <Calendar className="w-3.5 h-3.5 text-[#DFCCA9]" />
              <span>Google Agenda (Live)</span>
            </button>

            <button
              onClick={() => setActiveView('beschikbare-data')}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
                activeView === 'beschikbare-data'
                  ? 'bg-[#1A1412] text-white shadow-xs'
                  : 'text-[#685A52] hover:text-[#1A1412]'
              }`}
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              <Clock className="w-3.5 h-3.5 text-[#DFCCA9]" />
              <span>Direct Reserveren</span>
            </button>
          </div>

          {/* Subtiel, klein icoontje aan de zijkant: alleen voor fotografe Nikki (met code) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <button
              id="photographer-admin-secret-btn"
              onClick={() => setIsPinModalOpen(true)}
              className="p-2 rounded-full text-[#A6978B]/60 hover:text-[#2A211D] hover:bg-[#EFE8DE]/60 transition-all cursor-pointer opacity-50 hover:opacity-100 group"
              title="Fotograaf agenda beheer (beveiligd met code)"
              aria-label="Fotograaf toegang"
            >
              <Lock className="w-3.5 h-3.5 text-[#A67C46]/70 group-hover:text-[#A67C46] transition-colors" />
            </button>
          </div>
        </div>

        {/* VIEW 1: INGEBEDDE GOOGLE AGENDA */}
        {activeView === 'google-agenda' && (
          <div className="bg-white rounded-3xl p-4 sm:p-7 border border-[#E8DFD5] shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-3 border-b border-[#F2ECE1]">
              <div className="flex items-center space-x-3 text-center sm:text-left">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <div className="flex items-center space-x-2">
                    <span
                      className="text-xs uppercase tracking-[0.18em] text-[#241C18] font-semibold"
                      style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                    >
                      Live Agenda • nikki.jvdd@gmail.com
                    </span>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-medium border border-emerald-200">
                      Openbaar actief
                    </span>
                  </div>
                  <p className="text-xs text-[#8C7B71] font-light">
                    Realtime gesynchroniseerd met Google Agenda
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <a
                  href="https://calendar.google.com/calendar/u/0/embed?src=nikki.jvdd@gmail.com&ctz=Europe/Amsterdam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full border border-[#D5C7B8] hover:border-[#A67C46] text-[#241C18] text-xs font-medium transition-colors"
                  style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                >
                  Volledig scherm openen ↗
                </a>

                <button
                  onClick={() => openBookingModal()}
                  className="px-5 py-2.5 rounded-full bg-[#1A1412] hover:bg-[#332720] text-white text-xs uppercase tracking-wider font-medium shadow-xs transition-all flex items-center space-x-2"
                  style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                >
                  <span>Afspraak Plannen</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#DFCCA9]" />
                </button>
              </div>
            </div>

            {/* Google Calendar Iframe Container */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-[#E8DFD5] bg-[#FAF7F2] min-h-[500px] sm:min-h-[620px]">
              <iframe
                title="Google Agenda van Nikki"
                src={googleCalendarEmbedUrl}
                style={{ border: 0 }}
                width="100%"
                height="620"
                className="w-full h-[520px] sm:h-[620px]"
                loading="lazy"
              />
            </div>
          </div>
        )}

        {/* VIEW 2: OVERZICHTELIJKE & RUSTIGE AGENDA LIJST */}
        {activeView === 'beschikbare-data' && (
          <div className="space-y-6">
            <div className="space-y-4">
              {displayedDays.map((day) => {
                const { weekday, day: dayNum, month } = formatDutchDate(day.date);
                const freeSlots = day.slots.filter(s => !s.isBooked);
                const isFull = freeSlots.length === 0;

                return (
                  <div
                    key={day.date}
                    className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E8DFD5] shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-[#D5C7B8] transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
                  >
                    {/* Datum Kolom */}
                    <div className="flex items-center space-x-5">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] flex flex-col items-center justify-center text-center shrink-0">
                        <span
                          className="text-xs uppercase font-medium tracking-wider text-[#A67C46]"
                          style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                        >
                          {month.slice(0, 3)}
                        </span>
                        <span
                          className="text-2xl font-light text-[#1A1412] leading-none mt-0.5"
                          style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                        >
                          {dayNum}
                        </span>
                      </div>

                      <div>
                        <span className="text-xs uppercase tracking-[0.2em] text-[#7A6B62] font-medium block capitalize">
                          {weekday}
                        </span>
                        <h3
                          className="text-lg sm:text-xl font-normal text-[#1A1412]"
                          style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                        >
                          {dayNum} {month}
                        </h3>
                      </div>
                    </div>

                    {/* Tijdsloten Kolom */}
                    <div className="flex flex-wrap items-center gap-2">
                      {day.slots.map((slot) => (
                        <div
                          key={slot.id}
                          className={`text-xs px-3.5 py-2 rounded-full border flex items-center space-x-1.5 ${
                            slot.isBooked
                              ? 'bg-stone-50 border-stone-200 text-stone-400 line-through'
                              : 'bg-[#FAF7F2] border-[#E8DFD5] text-[#241C18]'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5 text-[#A67C46]" />
                          <span className="font-medium">{slot.time}</span>
                          {slot.label && slot.label !== 'Beschikbaar' && (
                            <span className="text-[11px] text-[#7A6B62] font-normal">
                              • {slot.label}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Actie Knop */}
                    <div className="shrink-0 pt-2 md:pt-0 text-center md:text-right">
                      <button
                        disabled={isFull}
                        onClick={() => openBookingModal()}
                        className={`w-full md:w-auto px-6 py-3 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all flex items-center justify-center space-x-2 ${
                          isFull
                            ? 'bg-stone-100 text-stone-400 cursor-not-allowed border border-stone-200'
                            : 'bg-[#1A1412] hover:bg-[#332720] text-white shadow-xs'
                        }`}
                        style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                      >
                        <span>{isFull ? 'Volgeboekt' : 'Reserveren'}</span>
                        {!isFull && <ArrowRight className="w-3.5 h-3.5 text-[#DFCCA9]" />}
                      </button>
                      {!isFull && (
                        <span className="text-[10px] text-[#8C7B71] block mt-1 font-light">
                          Aanbetaling: € {defaultDepositAmount || 50},-
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Knop om volledige agenda te tonen / compacter maken */}
            {upcomingDays.length > 3 && (
              <div className="pt-2 text-center">
                <button
                  id="toggle-full-agenda-btn"
                  onClick={() => setShowAllDates(!showAllDates)}
                  className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#FAF7F2] text-[#241C18] border border-[#D5C7B8] hover:border-[#A67C46] text-xs uppercase tracking-wider font-semibold shadow-xs transition-all cursor-pointer"
                  style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                >
                  <span>
                    {showAllDates ? 'Minder data tonen (3 opties)' : `Toon volledige agenda (${upcomingDays.length} data)`}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#A67C46] transition-transform duration-300 ${
                      showAllDates ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Discreet subtiel slotje voor fotografe Nikki */}
        <div className="pt-8 flex justify-end">
          <button
            id="photographer-admin-bottom-btn"
            onClick={() => setIsPinModalOpen(true)}
            className="inline-flex items-center space-x-1.5 text-[11px] text-[#A6978B]/50 hover:text-[#2A211D] hover:bg-[#EFE8DE]/50 px-2.5 py-1 rounded-full transition-all cursor-pointer opacity-60 hover:opacity-100"
            title="Fotograaf beheer (beveiligd met code)"
          >
            <Lock className="w-3 h-3 text-[#A67C46]/60" />
            <span className="text-[10px] tracking-widest uppercase font-light">Beheer</span>
          </button>
        </div>

        {/* PIN Code Beveiligingsmodal voor Fotografe Nikki */}
        <AdminPinModal
          isOpen={isPinModalOpen}
          onClose={() => setIsPinModalOpen(false)}
          onSuccess={() => openPhotographerAdmin('beschikbaarheid')}
        />

      </div>
    </section>
  );
};
