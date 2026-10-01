import React from 'react';
import { CalendarCheck, Shirt, SunMedium, Sparkles, HeartHandshake } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const WorkflowSection: React.FC = () => {
  const { openBookingModal } = useBooking();

  const steps = [
    {
      number: '01',
      icon: CalendarCheck,
      title: 'Datum kiezen in de agenda',
      description:
        'Kies eenvoudig online een beschikbare datum en tijdslot dat bij jullie past. Je ziet direct welke gouden uur sessies nog vrij zijn.',
    },
    {
      number: '02',
      icon: Shirt,
      title: 'Stylingadvies & Client Closet',
      description:
        'Twijfels over wat je moet aantrekken? Geen zorgen! Je ontvangt een uitgebreide stijlgids én hebt gratis toegang tot prachtige jurken en babykleertjes.',
    },
    {
      number: '03',
      icon: SunMedium,
      title: 'De ontspannen shoot',
      description:
        'We wandelen, knuffelen en lachen in de natuur tijdens het zachtste avondlicht. Ik leid jullie subtiel zodat iedereen zich 100% op zijn gemak voelt.',
    },
    {
      number: '04',
      icon: Sparkles,
      title: 'Luxe galerij & koesteren',
      description:
        'Binnen 2 weken staat jullie persoonlijke online galerij klaar met zorgvuldig nabewerkte beelden in hoge resolutie, klaar om te downloaden of af te drukken.',
    },
  ];

  return (
    <section id="werkwijze" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#A67C46] font-semibold">
            Van wens naar tastbare herinnering
          </p>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl text-[#2A211D] font-normal">
            Hoe verloopt een shoot bij mij?
          </h2>
          <p className="text-[#5A4D45] text-sm sm:text-base leading-relaxed">
            Geen stress over outfits, huilende peuters of 'niet fotogeniek zijn'.
            Mijn werkwijze is warm, geduldig en volledig ontspannen.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative p-6 rounded-2xl bg-[#F5F0E8] border border-[#E8DFD5] flex flex-col justify-between text-left group hover:shadow-md transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#DFCFC0] flex items-center justify-center text-[#A67C46] group-hover:bg-[#2A211D] group-hover:text-[#FAF7F2] transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-serif-editorial text-3xl font-semibold text-[#D5C7B8] group-hover:text-[#A67C46] transition-colors">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-serif-editorial text-xl font-medium text-[#2A211D] mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5A4D45] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E8DFD5]/60 flex items-center space-x-1 text-[11px] text-[#8C7A6F]">
                  <HeartHandshake className="w-3.5 h-3.5 text-[#A67C46]" />
                  <span>Liefdevolle begeleiding</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA banner */}
        <div className="mt-14 text-center">
          <button
            onClick={() => openBookingModal()}
            className="inline-flex items-center space-x-2 bg-[#2A211D] hover:bg-[#3D312A] text-[#FAF7F2] px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all shadow-sm"
          >
            <span>Kies Jouw Datum in de Agenda</span>
          </button>
        </div>

      </div>
    </section>
  );
};
