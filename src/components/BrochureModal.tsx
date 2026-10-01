import React, { useState } from 'react';
import { X, BookOpen, Download, Sparkles, Check, Heart, Clock, Camera, Sun, Shield, ChevronRight, Printer } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { PACKAGES } from '../data/photographyData';
import { BrandLogo } from './BrandLogo';

export const BrochureModal: React.FC = () => {
  const { isBrochureOpen, closeBrochure, openBookingModal, openTerms } = useBooking();
  const [activeTab, setActiveTab] = useState<'pakketten' | 'producten' | 'werkwijze'>('pakketten');

  if (!isBrochureOpen) return null;

  const handleBookFromBrochure = (pkgId?: string) => {
    closeBrochure();
    openBookingModal(pkgId);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#2A211D]/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#DFCFC0] overflow-hidden my-auto max-h-[92vh] flex flex-col text-left">
        
        {/* Header Bar */}
        <div className="p-5 sm:p-6 border-b border-[#E8DFD5] bg-[#F5F0E8] flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-full bg-[#EFE7DC] flex items-center justify-center text-[#A67C46]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3
                  className="text-xl sm:text-2xl text-[#2A211D] font-medium leading-none"
                  style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                >
                  Brochure & Investeringsgids
                </h3>
                <span className="hidden sm:inline-block text-[10px] bg-[#A67C46] text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                  Seizoen 2025 / 2026
                </span>
              </div>
              <p className="text-xs text-[#705E53] mt-1 font-light">
                Golden Light Stories Fotografie • Landgraaf, Limburg
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              title="Afdrukken of opslaan als PDF"
              className="p-2 sm:px-3 sm:py-1.5 rounded-full border border-[#D5C7B8] hover:bg-[#EFE7DC] text-[#705E53] transition-colors flex items-center space-x-1 text-xs"
            >
              <Printer className="w-4 h-4 text-[#A67C46]" />
              <span className="hidden sm:inline text-[11px] font-medium">Printen / PDF</span>
            </button>

            <button
              onClick={closeBrochure}
              className="p-2 rounded-full hover:bg-[#EFE7DC] text-[#705E53] transition-colors"
              aria-label="Brochure sluiten"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2.5 bg-[#EFE7DC]/60 border-b border-[#E8DFD5] flex items-center space-x-2 sm:space-x-4 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('pakketten')}
            className={`px-4 py-2 rounded-full transition-all whitespace-nowrap ${
              activeTab === 'pakketten'
                ? 'bg-[#2A211D] text-white shadow-xs'
                : 'text-[#705E53] hover:text-[#2A211D] hover:bg-[#EAE2D5]'
            }`}
          >
            1. Fotoshoot Pakketten & Tarieven
          </button>
          <button
            onClick={() => setActiveTab('producten')}
            className={`px-4 py-2 rounded-full transition-all whitespace-nowrap ${
              activeTab === 'producten'
                ? 'bg-[#2A211D] text-white shadow-xs'
                : 'text-[#705E53] hover:text-[#2A211D] hover:bg-[#EAE2D5]'
            }`}
          >
            2. Extra Foto's & Albums
          </button>
          <button
            onClick={() => setActiveTab('werkwijze')}
            className={`px-4 py-2 rounded-full transition-all whitespace-nowrap ${
              activeTab === 'werkwijze'
                ? 'bg-[#2A211D] text-white shadow-xs'
                : 'text-[#705E53] hover:text-[#2A211D] hover:bg-[#EAE2D5]'
            }`}
          >
            3. Werkwijze & Kledingadvies
          </button>
        </div>

        {/* Brochure Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-8 print:p-0">
          
          {/* TAB 1: Pakketten & Investeringen */}
          {activeTab === 'pakketten' && (
            <div className="space-y-6">
              
              {/* Introduction Callout */}
              <div className="bg-[#F2ECE1] rounded-2xl p-5 sm:p-6 border border-[#DFCFC0]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-[#A67C46] font-semibold">
                      Heldere Investering • Eerlijke Prijzen
                    </span>
                    <h4
                      className="text-xl sm:text-2xl text-[#1A1412] font-normal"
                      style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                    >
                      Warme herinneringen die met de jaren meer waard worden
                    </h4>
                    <p className="text-xs sm:text-sm text-[#685A52] leading-relaxed max-w-2xl font-light">
                      Elke fotoshoot is inclusief zorgvuldige nabewerking in mijn kenmerkende warme stijl,
                      een beveiligde online keuzegalerij en kosteloos gebruik van de luxe Client Closet.
                    </p>
                  </div>
                  
                  <div className="bg-white/80 rounded-xl p-3.5 border border-[#DFCFC0] shrink-0 text-center sm:text-right">
                    <span className="text-[10px] uppercase tracking-wider text-[#705E53] block font-medium">
                      Aanbetaling ter reservering
                    </span>
                    <span
                      className="text-2xl font-light text-[#A67C46]"
                      style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                    >
                      € 50,-
                    </span>
                    <span className="text-[10px] text-[#705E53] block">
                      Restant pas na de shoot
                    </span>
                  </div>
                </div>
              </div>

              {/* Grid of Packages from Brochure */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {PACKAGES.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E8DFD5] shadow-[0_2px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-[#D5C7B8] transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-[#A67C46] font-semibold">
                            {pkg.category}
                          </span>
                          <h5
                            className="text-lg sm:text-xl font-normal text-[#1A1412] mt-0.5"
                            style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                          >
                            {pkg.title}
                          </h5>
                        </div>
                        {pkg.isPopular && (
                          <span className="text-[10px] bg-[#A67C46] text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                            Favoriet
                          </span>
                        )}
                      </div>

                      {/* Pricing Tag */}
                      <div className="flex items-baseline space-x-2 pt-1 border-b border-[#FAF7F2] pb-3">
                        <span
                          className="text-2xl font-normal text-[#1A1412]"
                          style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                        >
                          {pkg.price || '€ 175,-'}
                        </span>
                        <span className="text-xs text-[#705E53]">
                          (incl. btw • aanbetaling € 50,-)
                        </span>
                      </div>

                      <p className="text-xs text-[#685A52] leading-relaxed">
                        {pkg.subtitle}
                      </p>

                      <div className="space-y-1.5 pt-2">
                        <div className="text-[11px] text-[#7A6B62] flex items-center space-x-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#A67C46] shrink-0" />
                          <span>Duur: {pkg.duration}</span>
                        </div>
                        <div className="text-[11px] text-[#7A6B62] flex items-center space-x-1.5">
                          <Sun className="w-3.5 h-3.5 text-[#A67C46] shrink-0" />
                          <span>Tijdstip: {pkg.recommendedTime}</span>
                        </div>
                      </div>

                      {/* Inclusions */}
                      <div className="pt-2 border-t border-[#FAF7F2] space-y-1.5">
                        <span className="text-[10px] uppercase tracking-wider text-[#705E53] font-semibold block">
                          Wat zit erin:
                        </span>
                        {pkg.inclusions.map((inc, i) => (
                          <div key={i} className="flex items-start space-x-2 text-xs text-[#5A4D45]">
                            <Check className="w-3.5 h-3.5 text-[#A67C46] shrink-0 mt-0.5" />
                            <span>{inc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-5 mt-4 border-t border-[#F0EBE3]">
                      <button
                        onClick={() => handleBookFromBrochure(pkg.id)}
                        className="w-full py-2.5 px-4 rounded-full bg-[#FAF7F2] hover:bg-[#2A211D] text-[#2A211D] hover:text-white border border-[#D5C7B8] text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center space-x-2"
                      >
                        <span>Reserveer via Live Agenda</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 2: Extra Foto's & Luxe Albums */}
          {activeTab === 'producten' && (
            <div className="space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#A67C46] font-semibold">
                  Tastbare Herinneringen
                </span>
                <h4
                  className="text-2xl text-[#1A1412] font-normal mt-1"
                  style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                >
                  Extra Digitale Beelden & Luxe Fotoproducten
                </h4>
                <p className="text-xs sm:text-sm text-[#685A52] leading-relaxed max-w-2xl font-light mt-1">
                  Wil je na het zien van de online previewgalerij toch meer beelden behouden? Of de foto's
                  vasthouden in een met linnen bekleed harmonicaboekje of luxe layflat fotoalbum?
                  Dat kan eenvoudig direct via jouw eigen galerij.
                </p>
              </div>

              {/* Extra Images Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-5 border border-[#E8DFD5] text-center space-y-2">
                  <span className="text-xs text-[#705E53] uppercase tracking-wider font-semibold">
                    Los digitaal bestand
                  </span>
                  <div
                    className="text-3xl text-[#1A1412] font-light"
                    style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                  >
                    € 10,-
                  </div>
                  <p className="text-[11px] text-[#685A52]">
                    Per extra zorgvuldig nabewerkt bestand in hoge resolutie zonder watermerk.
                  </p>
                </div>

                <div className="bg-[#F2ECE1] rounded-2xl p-5 border border-[#A67C46]/40 text-center space-y-2 relative shadow-2xs">
                  <span className="text-[10px] bg-[#A67C46] text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold inline-block">
                    Voordeelpakket
                  </span>
                  <span className="text-xs text-[#705E53] uppercase tracking-wider font-semibold block">
                    Pakket van 5 beelden
                  </span>
                  <div
                    className="text-3xl text-[#1A1412] font-light"
                    style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                  >
                    € 40,-
                  </div>
                  <p className="text-[11px] text-[#685A52]">
                    € 8,- per foto. Populairste keuze bij gezins- en zwangerschapsshoots.
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-[#E8DFD5] text-center space-y-2">
                  <span className="text-xs text-[#705E53] uppercase tracking-wider font-semibold">
                    Complete Galerij Upgrade
                  </span>
                  <div
                    className="text-3xl text-[#1A1412] font-light"
                    style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                  >
                    € 145,-
                  </div>
                  <p className="text-[11px] text-[#685A52]">
                    Ontvang álle beelden uit de galerij (gemiddeld 35-50 beelden) in hoge resolutie.
                  </p>
                </div>
              </div>

              {/* Physical Albums Section */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E8DFD5] space-y-4">
                <h5
                  className="text-xl text-[#1A1412] font-normal"
                  style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                >
                  Tastbare fotoproducten van topkwaliteit
                </h5>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="font-semibold text-sm text-[#2A211D]">
                        Linnen Harmonicaboekje (10x10 cm)
                      </span>
                      <span className="font-semibold text-sm text-[#A67C46]">€ 39,-</span>
                    </div>
                    <p className="text-xs text-[#685A52] leading-relaxed">
                      Een prachtig miniboekje met linnen kaft en magneetsluiting. Ruimte voor 10 tot 12
                      favoriete beelden. Perfect voor opa & oma of op de salontafel.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD5] space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="font-semibold text-sm text-[#2A211D]">
                        Luxe Layflat Album (20x20 cm)
                      </span>
                      <span className="font-semibold text-sm text-[#A67C46]">vanaf € 119,-</span>
                    </div>
                    <p className="text-xs text-[#685A52] leading-relaxed">
                      Handgemaakt met dikke layflat fotobladen (geen vouwnaad in het midden) en een
                      verfijnde linnen of suède kaft met reliëfopdruk naar keuze.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: Werkwijze & Kledingadvies */}
          {activeTab === 'werkwijze' && (
            <div className="space-y-6">
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#A67C46] font-semibold">
                  Voorbereiding & Stappen
                </span>
                <h4
                  className="text-2xl text-[#1A1412] font-normal mt-1"
                  style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                >
                  Hoe werkt een fotoshoot bij Golden Light Stories?
                </h4>
              </div>

              {/* 4 Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-[#E8DFD5] space-y-2">
                  <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#D5C7B8] flex items-center justify-center text-xs font-semibold text-[#A67C46]">
                    1
                  </div>
                  <h6 className="font-medium text-sm text-[#2A211D]">Kies jouw datum & tijdslot</h6>
                  <p className="text-xs text-[#685A52] leading-relaxed">
                    Via de live agenda op deze website kies je het gewenste tijdslot. Met een
                    aanbetaling van € 50,- staat de datum definitief gereserveerd voor jullie.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#E8DFD5] space-y-2">
                  <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#D5C7B8] flex items-center justify-center text-xs font-semibold text-[#A67C46]">
                    2
                  </div>
                  <h6 className="font-medium text-sm text-[#2A211D]">Styling & Client Closet</h6>
                  <p className="text-xs text-[#685A52] leading-relaxed">
                    Je ontvangt mijn uitgebreide kledinggids vol kleurenpaletten. Als mama mag je gratis
                    gebruikmaken van de prachtige jurken uit de Client Closet!
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#E8DFD5] space-y-2">
                  <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#D5C7B8] flex items-center justify-center text-xs font-semibold text-[#A67C46]">
                    3
                  </div>
                  <h6 className="font-medium text-sm text-[#2A211D]">De Fotoshoot (Ontspannen & Puur)</h6>
                  <p className="text-xs text-[#685A52] leading-relaxed">
                    Geen geforceerde poses! We wandelen, kletsen, knuffelen en laten kindjes lekker rennen.
                    Het zachte gouden avondlicht doet de rest van de magie.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#E8DFD5] space-y-2">
                  <div className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#D5C7B8] flex items-center justify-center text-xs font-semibold text-[#A67C46]">
                    4
                  </div>
                  <h6 className="font-medium text-sm text-[#2A211D]">Jouw Online Galerij & Levering</h6>
                  <p className="text-xs text-[#685A52] leading-relaxed">
                    Binnen 2 tot 3 weken ontvangen jullie de beveiligde keuzegalerij om jullie favorieten
                    te kiezen en te downloaden in hoge resolutie.
                  </p>
                </div>
              </div>

              {/* Clothing Advice Callout */}
              <div className="p-6 rounded-2xl bg-[#F2ECE1] border border-[#DFCFC0] space-y-3">
                <h5
                  className="text-lg text-[#1A1412] font-normal"
                  style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
                >
                  Kledingadvies: Wat trekken we aan?
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#5A4D45]">
                  <div className="space-y-1.5">
                    <span className="font-semibold text-[#2A211D] flex items-center space-x-1.5">
                      <span className="text-emerald-700">✓</span>
                      <span>Aanraders:</span>
                    </span>
                    <ul className="space-y-1 list-disc pl-4 text-[#685A52]">
                      <li>Natuurlijke tinten: beige, ecru, camel, warm roest, olijfgroen en terracotta</li>
                      <li>Natuurlijke stoffen: linnen, grof gebreide wol, ribfluweel en mousseline</li>
                      <li>Kleding die matched qua kleurtinten zonder dat iedereen exact hetzelfde draagt</li>
                      <li>Kleding uit de Client Closet voor mama en kind</li>
                    </ul>
                  </div>

                  <div className="space-y-1.5">
                    <span className="font-semibold text-[#2A211D] flex items-center space-x-1.5">
                      <span className="text-amber-800">✕</span>
                      <span>Liever vermijden:</span>
                    </span>
                    <ul className="space-y-1 list-disc pl-4 text-[#685A52]">
                      <li>Grote merkopdrukken, teksten of cartoonfiguren</li>
                      <li>Felle neonkleuren of harde zwart/wit contrasten</li>
                      <li>Drukke patronen zoals hele fijne ruitjes (geeft moiré-effect op foto's)</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Brochure Footer Bar with CTAs */}
        <div className="p-4 sm:p-5 border-t border-[#E8DFD5] bg-[#F5F0E8] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-[#705E53]">
            <Shield className="w-4 h-4 text-[#A67C46]" />
            <span>
              Bekijk ook onze{' '}
              <button
                onClick={() => {
                  closeBrochure();
                  openTerms();
                }}
                className="text-[#2A211D] underline font-medium hover:text-[#A67C46]"
              >
                Algemene Voorwaarden
              </button>
            </span>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={closeBrochure}
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-full border border-[#D5C7B8] hover:bg-[#EFE7DC] text-[#2A211D] font-medium"
            >
              Sluiten
            </button>
            <button
              onClick={() => handleBookFromBrochure()}
              className="w-1/2 sm:w-auto px-6 py-2.5 rounded-full bg-[#1A1412] hover:bg-[#332720] text-white font-medium flex items-center justify-center space-x-1.5 shadow-xs"
            >
              <span>Naar de Agenda</span>
              <ChevronRight className="w-3.5 h-3.5 text-[#DFCCA9]" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
