import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight, Settings, ChevronDown } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const CalendarSection: React.FC = () => {
  const { availableDays, openBookingModal, openPhotographerAdmin, defaultDepositAmount } = useBooking();
  const [showAllDates, setShowAllDates] = useState(false);

  const today = '2026-10-01';
  const upcomingDays = availableDays
    .filter(day => !day.isBlocked && day.date >= today);

  const displayedDays = showAllDates ? upcomingDays : upcomingDays.slice(0, 3);

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
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
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
            Kies hieronder een van de beschikbare data en tijden. Met een kleine aanbetaling van
            € {defaultDepositAmount || 50},- leg je de datum direct definitief vast in mijn agenda.
            Het resterende bedrag betaal je pas na de fotoshoot.
          </p>
        </div>

        {/* 
          OVERZICHTELIJKE & RUSTIGE AGENDA LIJST (3 opties standaard voor compacte pagina)
        */}
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
          <div className="pt-6 text-center">
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

        {/* 
          AGENDA KOPPELEN SECTION VOOR DE FOTOGRAAF ZELF:
          "hier moet ik zelf dan nog aan koppelen"
        */}
        <div className="mt-16 bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DFD5] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#A67C46]" />
              <span
                className="text-xs uppercase tracking-[0.24em] text-[#7A6B62] font-semibold"
                style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
              >
                Agenda Koppeling & Beheer
              </span>
            </div>
            <h4
              className="text-lg sm:text-xl font-normal text-[#1A1412]"
              style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
            >
              Koppel je eigen Google Agenda of Apple iCal
            </h4>
            <p className="text-xs sm:text-sm text-[#685A52] max-w-xl font-light">
              Beheer hier zelf jouw data, voeg nieuwe tijdsloten toe of synchroniseer
              automatisch met je smartphone of desktop agenda.
            </p>
          </div>

          <button
            onClick={() => openPhotographerAdmin('beschikbaarheid')}
            className="shrink-0 flex items-center space-x-2 bg-[#FAF7F2] hover:bg-[#EFE8DE] text-[#241C18] border border-[#D5C7B8] px-6 py-3.5 rounded-full text-xs uppercase tracking-[0.18em] font-medium transition-all"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            <Settings className="w-3.5 h-3.5 text-[#A67C46]" />
            <span>Agenda Koppelen & Beheren</span>
          </button>
        </div>

      </div>
    </section>
  );
};
