import React from 'react';
import { ArrowRight, Check, Sparkles, Plus, Image as ImageIcon, Home } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const PackagesSection: React.FC = () => {
  const { packages, openBookingModal } = useBooking();

  return (
    <section id="pakketten" className="bg-[#FAF7F2] text-[#241C18] py-24 sm:py-32 border-b border-[#EFE8DE] scroll-mt-20">
      <span id="aanbod" className="block -mt-20 pt-20" aria-hidden="true" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header: AANBOD & PAKKETTEN */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 space-y-3">
          <p
            className="text-xs uppercase tracking-[0.38em] text-[#A67C46] font-semibold"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            AANBOD
          </p>

          <h2
            className="font-editorial text-4xl sm:text-5xl lg:text-[52px] text-[#1A1412] font-normal tracking-tight"
            style={{ fontFamily: "'Bodoni Moda', 'Cormorant Garamond', Georgia, serif" }}
          >
            Pakketten
          </h2>

          <p
            className="text-[#685A52] text-sm sm:text-base leading-relaxed font-light pt-2"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            Een waardevolle investering in herinneringen die voor altijd blijven.
            Kies het pakket dat het beste bij jullie wensen past.
          </p>
        </div>

        {/* Highlight Banner: Extra Foto's & Studio Vita Optie */}
        <div className="mb-14 p-5 sm:p-6 rounded-3xl bg-white border border-[#E8DFD5] shadow-[0_2px_18px_rgba(0,0,0,0.02)] grid grid-cols-1 md:grid-cols-2 gap-4 divide-y md:divide-y-0 md:divide-x divide-[#F0E6D8]">
          <div className="flex items-start space-x-3.5 pr-0 md:pr-4 pt-1 md:pt-0">
            <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#DFCFC0] flex items-center justify-center shrink-0 text-[#A67C46]">
              <Plus className="w-4 h-4" />
            </div>
            <div className="text-left space-y-1">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1412]">
                Foto&apos;s Bijbestellen
              </h4>
              <p className="text-xs text-[#7A6B62] leading-relaxed">
                <strong className="text-[#1A1412]">€ 10,-</strong> per stuk • <strong className="text-[#1A1412]">€ 45,-</strong> voor 5 foto&apos;s • <strong className="text-[#1A1412]">€ 85,-</strong> voor 10 foto&apos;s
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5 pl-0 md:pl-6 pt-4 md:pt-0">
            <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#DFCFC0] flex items-center justify-center shrink-0 text-[#A67C46]">
              <Home className="w-4 h-4" />
            </div>
            <div className="text-left space-y-1">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1A1412]">
                Studio Vita Bijboeken
              </h4>
              <p className="text-xs text-[#7A6B62] leading-relaxed">
                Voor een meerprijs van <strong className="text-[#1A1412]">€ 75,-</strong> kan professionele daglichtstudio Studio Vita bij de shoot worden geboekt.
              </p>
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {packages.map((pkg, idx) => {
            const isFeatured = pkg.id === 'pakket-2' || pkg.id === 'newborn-pregnancy';

            return (
              <div
                key={pkg.id}
                className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 text-left bg-white border ${
                  isFeatured
                    ? 'border-[#C59B63] shadow-[0_8px_30px_rgba(197,155,99,0.12)] ring-1 ring-[#C59B63]/30'
                    : 'border-[#E8DFD5] shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:border-[#DFCFC0]'
                }`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span
                    className="text-[10px] uppercase tracking-[0.28em] text-[#A67C46] font-semibold"
                    style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                  >
                    AANBOD
                  </span>

                  {isFeatured && (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-[#F5EFE6] text-[#A67C46] border border-[#E5DACD] text-[10px] font-medium tracking-wide">
                      <Sparkles className="w-3 h-3 text-[#A67C46]" />
                      <span>Veelgekozen</span>
                    </span>
                  )}
                </div>

                {/* Package Title & Price */}
                <div className="space-y-3 mb-6">
                  <h3
                    className="font-editorial text-2xl sm:text-3xl text-[#1A1412] font-normal leading-tight"
                    style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                  >
                    {pkg.title}
                  </h3>

                  {/* Price */}
                  <div className="pt-1">
                    <span
                      className="text-xs uppercase tracking-widest text-[#8C7B71] block font-light mb-1"
                      style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                    >
                      INVESTERING:
                    </span>
                    <div className="flex items-baseline space-x-2">
                      <span className="font-editorial text-3xl sm:text-4xl text-[#1A1412] font-normal">
                        {pkg.price?.replace(' excl. studio', '')}
                      </span>
                      {pkg.price?.includes('excl. studio') && (
                        <span className="text-xs uppercase tracking-wider text-[#8C7B71] font-medium">
                          excl. studio
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Subtitle / Compact description */}
                  <p className="text-xs text-[#685A52] leading-relaxed font-light pt-1">
                    {pkg.description}
                  </p>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-[#F0E6D8] my-4" />

                {/* Inclusions list */}
                <div className="space-y-3 mb-8 flex-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#8C7B71] font-medium block">
                    Wat is inbegrepen:
                  </span>
                  <ul className="space-y-2.5 text-xs text-[#4A3E38]">
                    {pkg.inclusions.map((inc, incIdx) => (
                      <li key={incIdx} className="flex items-start space-x-2.5 leading-snug">
                        <Check className="w-3.5 h-3.5 text-[#A67C46] shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action button */}
                <div className="pt-2 border-t border-[#F0E6D8] space-y-2">
                  <button
                    onClick={() => openBookingModal(pkg.id)}
                    className={`w-full py-3.5 px-6 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-xs ${
                      isFeatured
                        ? 'bg-[#1A1412] hover:bg-[#332720] text-white'
                        : 'bg-[#FAF7F2] hover:bg-[#1A1412] text-[#241C18] hover:text-white border border-[#DFCFC0] hover:border-[#1A1412]'
                    }`}
                    style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                  >
                    <span>Kies Dit Pakket</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#DFCCA9]" />
                  </button>

                  <p className="text-[10px] text-center text-[#8C7B71] font-light">
                    Direct datum reserveren met € 50,- aanbetaling
                  </p>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Booking & Questions note */}
        <div className="mt-16 text-center max-w-xl mx-auto space-y-3">
          <p className="text-xs text-[#7A6B62] leading-relaxed">
            Heb je een vraag over een shoot of wil je een op maat gemaakt pakket bespreken?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium">
            <a
              href="#agenda"
              className="text-[#1A1412] hover:text-[#A67C46] underline underline-offset-4 decoration-[#DFCCA9] transition-colors"
            >
              Bekijk Beschikbare Data in de Agenda &darr;
            </a>
            <span className="text-stone-300">•</span>
            <a
              href="mailto:goldenlsphotography@gmail.com"
              className="text-[#1A1412] hover:text-[#A67C46] underline underline-offset-4 decoration-[#DFCCA9] transition-colors"
            >
              Stuur een e-mail naar Nikki &rarr;
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
