import React from 'react';
import { useBooking } from '../context/BookingContext';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import clientClosetDressImg from '../assets/images/client_closet_dunes_walk_1790858799287.jpg';

export const ClientClosetSection: React.FC = () => {
  const { openBookingModal } = useBooking();

  return (
    <section id="client-closet" className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-white border-t border-[#F0EBE3] overflow-hidden text-[#241C18]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Content Column (Left on desktop) */}
        <div className="lg:col-span-6 space-y-6 text-left max-w-xl">
          <div className="space-y-2">
            <p
              className="text-xs uppercase tracking-[0.3em] text-[#7A6B62] font-medium"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              WARDROBE & STYLING
            </p>

            <h2
              className="font-editorial text-4xl sm:text-5xl lg:text-[54px] font-normal leading-[1.12] tracking-tight text-[#1A1412]"
              style={{ fontFamily: "'Bodoni Moda', 'Cormorant Garamond', Georgia, serif" }}
            >
              Client Closet
            </h2>
          </div>

          <p
            className="text-[#4E413A] text-sm sm:text-[15px] leading-[1.85] font-light"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            Geen keuzestress over outfits voor jullie fotoshoot. In mijn Client Closet vind je
            een liefdevol samengestelde collectie zwierige jurken, comfortabele stoffen en warme
            natuurtinten die jullie foto’s een tijdloze, dromerige uitstraling geven.
          </p>

          <div className="space-y-3 pt-1">
            <div className="flex items-start space-x-3 text-xs sm:text-sm text-[#4E413A]">
              <CheckCircle2 className="w-4 h-4 text-[#A67C46] shrink-0 mt-0.5" />
              <span><strong>Kosteloos te lenen:</strong> Inbegrepen bij iedere shoot naar keuze.</span>
            </div>
            <div className="flex items-start space-x-3 text-xs sm:text-sm text-[#4E413A]">
              <CheckCircle2 className="w-4 h-4 text-[#A67C46] shrink-0 mt-0.5" />
              <span><strong>Maten & Pasvorm:</strong> XS t/m XXL en one-size modellen die soepel meebewegen.</span>
            </div>
            <div className="flex items-start space-x-3 text-xs sm:text-sm text-[#4E413A]">
              <CheckCircle2 className="w-4 h-4 text-[#A67C46] shrink-0 mt-0.5" />
              <span><strong>Compleet ontzorgd:</strong> Ik neem de gekozen jurken fris gestoomd mee naar de locatie.</span>
            </div>
          </div>

          <div className="pt-3">
            <button
              onClick={() => openBookingModal()}
              className="inline-flex items-center space-x-2 bg-[#1A1412] hover:bg-[#332720] text-white px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-xs"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              <span>Reserveer Jouw Datum</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#DFCCA9]" />
            </button>
          </div>
        </div>

        {/* Visual Column (Right on desktop) */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.06)] bg-[#F5EFE8] aspect-[3/4] sm:aspect-[4/5]">
            <img
              src={clientClosetDressImg}
              alt="Exclusieve jurk uit de Client Closet van Golden Light Stories"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
