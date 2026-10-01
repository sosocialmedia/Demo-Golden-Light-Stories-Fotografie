import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import photographerPortrait from '../assets/images/photographer_portrait_1789723124705.jpg';

export const AboutSection: React.FC = () => {
  const { openBookingModal } = useBooking();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="over-mij" className="bg-white text-[#241C18] py-24 sm:py-32 lg:py-36 border-t border-[#F0EBE3] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* 
          EXACT MATCH WITH IMAGE.PNG:
          - Left: Editorial Portrait of Nikki
          - Right: BEHIND THE CAMERA / I'm Nikki + text + MEER OVER MIJ
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-md aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-[#F5EFE8] select-none shadow-[0_4px_30px_rgba(0,0,0,0.04)]">
              <img
                src={photographerPortrait}
                alt="Nikki - Golden Light Stories Fotografie"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right Column: Editorial Copy matching image.png */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 max-w-xl text-left">
            
            <div className="space-y-3">
              <p
                className="text-xs sm:text-[13px] uppercase tracking-[0.32em] text-[#7A6B62] font-medium"
                style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
              >
                BEHIND THE CAMERA
              </p>

              <h2
                className="font-editorial text-5xl sm:text-6xl lg:text-[76px] font-normal leading-[1.05] tracking-tight text-[#1A1412]"
                style={{ fontFamily: "'Bodoni Moda', 'Cormorant Garamond', Georgia, serif" }}
              >
                I'm Nikki
              </h2>
            </div>

            {/* Paragraphs exactly following the user's provided copy */}
            <div
              className="space-y-5 text-[#4E413A] text-sm sm:text-[15px] leading-[1.85] font-light"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              <p>
                Ik ben Nikki, het gezicht achter Golden Light Stories Fotografie.
              </p>

              <p>
                Wat begon als een hobby, groeide uit tot mijn grootste passie. Ik leg graag echte momenten vast: de knuffels, lachjes, kleine details en liefdevolle blikken die je later voor altijd wilt herinneren.
              </p>

              <p>
                Mijn stijl? Warm, tijdloos en natuurlijk. Geen stijve poses, maar foto’s waarin jullie jezelf kunnen zijn.
              </p>

              <p>
                Naast fotograaf ben ik mama van twee lieve kindjes en geniet ik van de kleine momenten die het leven zo bijzonder maken.
              </p>

              {/* Extra uitklapbare informatie wanneer op 'MEER OVER MIJ' wordt geklikt */}
              {isExpanded && (
                <div className="pt-2 space-y-3 text-xs sm:text-sm text-[#6E5E55] border-t border-[#E8DFD5] animate-in fade-in duration-300">
                  <p>
                    <strong>Gevestigd in Landgraaf</strong> en werkzaam door heel Limburg en daarbuiten.
                    Naast fotografie geef ik met heel veel passie en plezier dansles, geniet ik van een goede kop koffie in de
                    ochtendzon en breng ik het liefst tijd door met mijn gezin en dierbaren.
                  </p>
                  <p>
                    Ik werk altijd met natuurlijk zonlicht en help je graag met styling en kledingadvies
                    (inclusief gratis gebruik van mijn Client Closet).
                  </p>
                </div>
              )}
            </div>

            {/* MEER OVER MIJ button with line matching image.png */}
            <div className="pt-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-block text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#1A1412] font-medium pb-1.5 border-b border-[#1A1412] hover:text-[#A67C46] hover:border-[#A67C46] transition-all focus:outline-none"
                style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
              >
                {isExpanded ? 'MINDER WEERGEVEN' : 'MEER OVER MIJ'}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
