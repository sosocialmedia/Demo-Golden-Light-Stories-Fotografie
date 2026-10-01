import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import heroImg from '../assets/images/hero_golden_hour_1789723084074.jpg';

export const HeroSection: React.FC = () => {
  const { availableDays } = useBooking();

  // Count upcoming free slots
  const totalFreeSlots = availableDays.reduce(
    (acc, day) => acc + day.slots.filter(s => !s.isBooked).length,
    0
  );

  const scrollToStory = () => {
    const el = document.querySelector('#story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-[88vh] sm:h-[92vh] min-h-[580px] bg-[#241C18] flex items-center justify-center overflow-hidden">
      {/* Achtergrondfoto in gouden uur */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Liefdevolle shoot in het gouden uur - Golden Light Stories"
          className="w-full h-full object-cover object-[center_35%] scale-102"
          referrerPolicy="no-referrer"
        />
        {/* Subtiel warm donker vignet om de typografie perfect leesbaar te maken zoals in het voorbeeld */}
        <div className="absolute inset-0 bg-black/25 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </div>

      {/* Gecentreerde redactionele tekst precies zoals in het voorbeeld */}
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto flex flex-col items-center select-none animate-in fade-in duration-700">
        <h1
          className="text-white font-light text-sm sm:text-lg md:text-xl tracking-[0.28em] sm:tracking-[0.32em] uppercase leading-relaxed text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
          style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
        >
          The Journey of<br />Love and Life
        </h1>

        {/* Subtiele pijl omlaag (zoals in het voorbeeld) */}
        <button
          onClick={scrollToStory}
          aria-label="Scroll naar beneden voor het verhaal en portfolio"
          className="mt-6 sm:mt-8 text-white/90 hover:text-white transition-all transform hover:translate-y-1 focus:outline-none p-2 animate-bounce-subtle"
        >
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.25]" />
        </button>
      </div>

      {/* Subtiel badge onderin over actuele beschikbaarheid */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex items-center space-x-2.5 px-4 py-2 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white/90 text-xs">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#DFCCA9] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#DFCCA9]"></span>
        </span>
        <span className="tracking-wide">
          Agenda geopend • <strong className="font-semibold text-white">{totalFreeSlots} tijdsloten</strong> beschikbaar
        </span>
      </div>
    </section>
  );
};
