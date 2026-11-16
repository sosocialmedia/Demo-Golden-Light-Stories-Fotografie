import React, { useEffect, useRef } from 'react';
import { Calendar, ArrowUpRight } from 'lucide-react';

const CALENDLY_URL = 'https://calendly.com/nikki-jvdd/fotoshoot-boeken';
const CALENDLY_EMBED_URL =
  'https://calendly.com/nikki-jvdd/fotoshoot-boeken?hide_gdpr_banner=1&background_color=ffffff&text_color=241c18&primary_color=a67c46';

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
      }) => void;
    };
  }
}

export const CalendarSection: React.FC = () => {
  const calendlyContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initWidget = () => {
      if (window.Calendly && calendlyContainerRef.current) {
        calendlyContainerRef.current.innerHTML = '';
        window.Calendly.initInlineWidget({
          url: CALENDLY_EMBED_URL,
          parentElement: calendlyContainerRef.current,
        });
      }
    };

    if (window.Calendly) {
      initWidget();
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    );

    if (existingScript) {
      existingScript.addEventListener('load', initWidget);
      return () => {
        existingScript.removeEventListener('load', initWidget);
      };
    }

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = initWidget;
    document.body.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, []);

  return (
    <section
      id="agenda"
      className="bg-[#FAF7F2] text-[#241C18] py-20 sm:py-28 border-t border-[#EFE8DE] scroll-mt-20"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <p
            className="text-xs uppercase tracking-[0.32em] text-[#7A6B62] font-medium"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            PLAN JOUW FOTOSHOOT
          </p>

          <h2
            className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#1A1412] font-normal"
            style={{ fontFamily: "'Bodoni Moda', 'Cormorant Garamond', Georgia, serif" }}
          >
            Afspraak maken
          </h2>

          <p
            className="text-[#685A52] text-sm sm:text-base leading-relaxed font-light pt-2"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            Kies direct een passend moment in mijn agenda om jouw fotoshoot vast te leggen.
          </p>

          {/* Aanbetaling €50 & Bevestigingsmelding */}
          <div className="mt-5 p-4 sm:p-5 bg-[#F2ECE1] border border-[#DFCFC0] text-left max-w-xl mx-auto">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-[#FAF7F2] border border-[#DFCFC0] flex items-center justify-center text-[#A67C46] shrink-0 mt-0.5">
                <span
                  className="text-sm font-medium"
                  style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                >
                  €50
                </span>
              </div>
              <div className="space-y-1">
                <p
                  className="text-xs uppercase tracking-[0.18em] text-[#1A1412] font-semibold"
                  style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                >
                  Aanbetaling € 50,-
                </p>
                <p
                  className="text-xs sm:text-sm text-[#5A4D45] leading-relaxed font-light"
                  style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                >
                  Bij het maken van een afspraak geldt een aanbetaling van <strong className="font-medium text-[#1A1412]">€ 50,-</strong>. Zodra deze aanbetaling is betaald, wordt jouw boeking definitief bevestigd.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2.5 px-7 py-3.5 bg-[#1A1412] hover:bg-[#332720] text-white text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-xs"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              <Calendar className="w-4 h-4 text-[#DFCCA9]" />
              <span>Afspraak maken via Calendly</span>
              <ArrowUpRight className="w-4 h-4 text-[#DFCCA9]" />
            </a>
          </div>
        </div>

        {/* Inline Calendly Booking Widget */}
        <div className="bg-white border border-[#E8DFD5] shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden p-2 sm:p-4">
          <div
            ref={calendlyContainerRef}
            className="w-full min-w-[280px] h-[700px]"
          />
        </div>
      </div>
    </section>
  );
};

