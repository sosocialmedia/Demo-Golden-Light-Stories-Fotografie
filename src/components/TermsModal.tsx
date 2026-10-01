import React from 'react';
import { X, FileText, Download, ShieldCheck, Printer, CheckCircle2, ChevronRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const TermsModal: React.FC = () => {
  const { isTermsOpen, closeTerms, openBrochure, openBookingModal } = useBooking();

  if (!isTermsOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#2A211D]/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#DFCFC0] overflow-hidden my-auto max-h-[92vh] flex flex-col text-left">
        
        {/* Header Bar */}
        <div className="p-5 sm:p-6 border-b border-[#E8DFD5] bg-[#F5F0E8] flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-full bg-[#EFE7DC] flex items-center justify-center text-[#A67C46]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3
                className="text-xl sm:text-2xl text-[#2A211D] font-medium leading-none"
                style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
              >
                Algemene Voorwaarden
              </h3>
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
              onClick={closeTerms}
              className="p-2 rounded-full hover:bg-[#EFE7DC] text-[#705E53] transition-colors"
              aria-label="Voorwaarden sluiten"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-[#4A3E37] text-xs sm:text-sm leading-relaxed font-light print:p-0">
          
          {/* Summary Box */}
          <div className="bg-[#F2ECE1] rounded-2xl p-5 border border-[#DFCFC0] space-y-2">
            <div className="flex items-center space-x-2 text-[#A67C46]">
              <ShieldCheck className="w-4 h-4" />
              <span className="font-semibold uppercase tracking-wider text-[11px]">
                In het kort samengevat
              </span>
            </div>
            <p className="text-xs text-[#5A4D45] leading-relaxed">
              • <strong>Aanbetaling:</strong> Een reservering via de agenda is definitief na een aanbetaling van € 50,-. Het restant voldoe je pas na de shoot.<br />
              • <strong>Slecht-weer garantie:</strong> Bij aanhoudende regen of storm verplaatsen we de buitenshoot kosteloos naar een nieuwe datum in overleg.<br />
              • <strong>Ziekte:</strong> Ziek kindje of zelf koorts? Geen probleem, we verzetten de shoot kosteloos.<br />
              • <strong>Client Closet:</strong> Gratis gebruik van de luxe jurken en outfits. De professionele reiniging verzorg ik voor jou.
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-2">
            <h4
              className="text-base sm:text-lg font-medium text-[#1A1412]"
              style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
            >
              Artikel 1 – Definities & Toepasselijkheid
            </h4>
            <p>
              1.1. Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, offertes, werkzaamheden, fotoshoots en overeenkomsten van <strong>Golden Light Stories Fotografie</strong> (hierna: &apos;de Fotograaf&apos;), gevestigd te Landgraaf, Limburg, vertegenwoordigd door Nikki.
            </p>
            <p>
              1.2. De &apos;Opdrachtgever&apos; is de natuurlijke of rechtspersoon die met de Fotograaf een overeenkomst aangaat of via de online agenda een fotoshoot reserveert.
            </p>
            <p>
              1.3. Door het reserveren van een fotoshoot of het voldoen van de aanbetaling verklaart de Opdrachtgever akkoord te gaan met deze algemene voorwaarden.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-2">
            <h4
              className="text-base sm:text-lg font-medium text-[#1A1412]"
              style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
            >
              Artikel 2 – Boeking, Reservering & Aanbetaling
            </h4>
            <p>
              2.1. Een fotoshoot wordt gereserveerd via de online live agenda of per schriftelijke bevestiging.
            </p>
            <p>
              2.2. Ter definitieve vastlegging van het gekozen tijdslot (gouden uur) geldt een <strong>aanbetaling van € 50,-</strong>. Totdat de aanbetaling is voldaan, behoudt de Fotograaf zich het recht voor het tijdslot vrij te geven.
            </p>
            <p>
              2.3. Het resterende factuurbedrag van het gekozen fotoshootpakket dient uiterlijk 14 dagen na ontvangst van de factuur of voorafgaand aan de definitieve download van de hoge-resolutie galerij voldaan te worden.
            </p>
            <p>
              2.4. Eventuele extra nabestellingen (zoals extra digitale beelden, harmonicaboekjes of fotoboeken) worden gefactureerd bij bestelling in de galerij.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-2">
            <h4
              className="text-base sm:text-lg font-medium text-[#1A1412]"
              style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
            >
              Artikel 3 – Annulering, Ziekte & Slecht-Weer Garantie
            </h4>
            <p>
              3.1. <strong>Slecht-weer garantie:</strong> Omdat buitenshoots afhankelijk zijn van zacht, natuurlijk licht, wordt bij aanhoudende regen, storm of onweer uiterlijk op de ochtend of middag van de shoot in onderling overleg besloten de datum kosteloos te verplaatsen naar een nieuw tijdslot. Bewolkt weer zonder neerslag geldt niet als geldige annuleringsreden.
            </p>
            <p>
              3.2. <strong>Ziekte:</strong> Indien de Opdrachtgever of een van de gezinsleden/kindjes ziek is, kan de shoot kosteloos worden verplaatst naar een andere beschikbare datum. Graag minimaal 24 uur vooraf melden (tenzij overmacht in de nacht/ochtend).
            </p>
            <p>
              3.3. <strong>Definitieve annulering door de Opdrachtgever:</strong> Bij definitieve annulering zonder verplaatsing wordt de aanbetaling van € 50,- niet gerestitueerd, ter vergoeding van de gereserveerde tijd en gemaakte voorbereiding.
            </p>
            <p>
              3.4. <strong>Verhindering door de Fotograaf:</strong> In geval van overmacht (zoals acute ziekte van de fotograaf) wordt zo snel mogelijk een vervangende datum afgestemd. Mocht dit niet wenselijk zijn, dan wordt de aanbetaling volledig gerestitueerd.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-2">
            <h4
              className="text-base sm:text-lg font-medium text-[#1A1412]"
              style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
            >
              Artikel 4 – Uitvoering van de Fotoshoot & Golden Hour
            </h4>
            <p>
              4.1. De Fotograaf voert de fotoshoot uit naar beste inzicht, deskundigheid en in haar eigen artistieke stijl (warm, natuurlijk, spontaan en zacht zonlicht).
            </p>
            <p>
              4.2. De Opdrachtgever zorgt voor tijdige aanwezigheid op de afgesproken locatie. Aangezien gouden uur shoots strikt gebonden zijn aan het dalende zonlicht, kan verloren tijd door te laat komen niet achteraf worden ingehaald.
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-2">
            <h4
              className="text-base sm:text-lg font-medium text-[#1A1412]"
              style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
            >
              Artikel 5 – Gebruik van de Client Closet
            </h4>
            <p>
              5.1. Gebruik van jurken en kinderkleding uit de Client Closet is een kosteloze service voor klanten van Golden Light Stories Fotografie.
            </p>
            <p>
              5.2. De kleding dient met zorg te worden behandeld. Professionele reiniging na afloop wordt te allen tijde verzorgd door de Fotograaf; de klant hoeft de kleding niet zelf te wassen.
            </p>
          </div>

          {/* Section 6 */}
          <div className="space-y-2">
            <h4
              className="text-base sm:text-lg font-medium text-[#1A1412]"
              style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
            >
              Artikel 6 – Nabewerking, Levertijd & Galerij
            </h4>
            <p>
              6.1. De selectie en bewerking van de foto&apos;s gebeurt uitsluitend door de Fotograaf in haar kenmerkende warme stijl. Ruwe, onbewerkte RAW-bestanden worden onder geen enkel beding geleverd.
            </p>
            <p>
              6.2. Binnen 2 tot 3 weken na de fotoshoot ontvangt de Opdrachtgever toegang tot een beveiligde online previewgalerij om de in het pakket inbegrepen beelden te kiezen.
            </p>
            <p>
              6.3. De gekozen beelden worden digitaal geleverd in hoge resolutie (geschikt voor grote afdrukken) en geoptimaliseerd webformaat.
            </p>
          </div>

          {/* Section 7 */}
          <div className="space-y-2">
            <h4
              className="text-base sm:text-lg font-medium text-[#1A1412]"
              style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
            >
              Artikel 7 – Auteursrecht & Publicatie
            </h4>
            <p>
              7.1. Het auteursrecht op alle fotografische werken berust te allen tijde bij de Fotograaf (Nikki / Golden Light Stories Fotografie).
            </p>
            <p>
              7.2. De Opdrachtgever verkrijgt na volledige betaling een niet-commercieel gebruiksrecht voor privédoeleinden (zoals afdrukken voor eigen gebruik, fotoboeken en het plaatsen op eigen persoonlijke social media kanalen).
            </p>
            <p>
              7.3. De Fotograaf mag beelden respectvol gebruiken voor haar eigen portfolio, website en social media kanalen, tenzij de Opdrachtgever vooraf uitdrukkelijk en schriftelijk heeft aangegeven hier bezwaar tegen te hebben.
            </p>
          </div>

          {/* Section 8 */}
          <div className="space-y-2">
            <h4
              className="text-base sm:text-lg font-medium text-[#1A1412]"
              style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
            >
              Artikel 8 – Aansprakelijkheid & Klachten
            </h4>
            <p>
              8.1. Deelname aan een fotoshoot geschiedt op eigen risico. De Fotograaf is niet aansprakelijk voor schade, letsel of verlies van eigendommen op de locatie, behoudens opzet of grove schuld.
            </p>
            <p>
              8.2. Klachten over geleverde diensten of beelden dienen binnen 14 dagen na levering schriftelijk en gemotiveerd te worden ingediend.
            </p>
          </div>

        </div>

        {/* Footer Bar */}
        <div className="p-4 sm:p-5 border-t border-[#E8DFD5] bg-[#F5F0E8] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-[#705E53]">
            Bekijk ook onze{' '}
            <button
              onClick={() => {
                closeTerms();
                openBrochure();
              }}
              className="text-[#2A211D] underline font-medium hover:text-[#A67C46]"
            >
              Brochure & Tarieven
            </button>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={closeTerms}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#1A1412] hover:bg-[#332720] text-white font-medium shadow-xs"
            >
              Sluiten & Akkoord
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
