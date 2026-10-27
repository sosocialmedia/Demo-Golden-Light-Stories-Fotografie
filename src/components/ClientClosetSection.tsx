import React, { useState, useRef, useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { CheckCircle2, ArrowRight, ChevronLeft, ChevronRight, Sparkles, X } from 'lucide-react';

import closetTerracottaImg from '../assets/images/closet_terracotta_dress_1792007987586.jpeg';
import closetCreamImg from '../assets/images/closet_cream_boho_1792007987951.jpeg';
import closetRackImg from '../assets/images/closet_rack_collection_1792007987589.jpeg';
import closetBabyImg from '../assets/images/closet_newborn_knit_1792007988859.jpeg';

import closetSageImg from '../assets/images/closet_sage_dress_1792011082138.jpeg';
import closetOatmealImg from '../assets/images/closet_oatmeal_wrap_1792011082420.jpeg';
import closetCaramelImg from '../assets/images/closet_caramel_knit_1792011082885.jpeg';
import closetWhiteLaceImg from '../assets/images/closet_white_lace_1792011083085.jpeg';
import closetDustyPeachImg from '../assets/images/closet_dusty_peach_1792011082940.jpeg';
import closetOliveImg from '../assets/images/closet_olive_linen_1792011106387.jpeg';
import closetKimonoImg from '../assets/images/closet_boho_kimono_1792011106937.jpeg';
import closetChampagneImg from '../assets/images/closet_champagne_satin_1792011107589.jpeg';
import closetRomperImg from '../assets/images/closet_baby_romper_1792011107680.jpeg';
import closetOchreImg from '../assets/images/closet_golden_ochre_1792011107296.jpeg';
import closetJumpsuitImg from '../assets/images/closet_linen_jumpsuit_1792011140036.jpeg';
import closetBlushImg from '../assets/images/closet_blush_tulle_1792011140588.jpeg';
import closetChunkyImg from '../assets/images/closet_chunky_knit_1792011141342.jpeg';
import closetBabySetImg from '../assets/images/closet_baby_set_1792011141116.jpeg';
import closetRustSkirtImg from '../assets/images/closet_rust_skirt_1792011141059.jpeg';

interface ClosetItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  alt: string;
}

const CLOSET_ITEMS: ClosetItem[] = [
  {
    id: 'terracotta-dress',
    title: 'Terracotta Rust Boho Jurk',
    category: 'Dames • Maat XS-XL',
    description: 'Zwierige linnen maxi-jurk met romantische pofmouwen en gelaagde rok.',
    image: closetTerracottaImg,
    alt: 'Terracotta rust linnen maxi-jurk uit de Client Closet',
  },
  {
    id: 'cream-smocked-dress',
    title: 'Cream Smocked Maxi Jurk',
    category: 'Dames & Zwangerschap • One-size',
    description: 'Elegante off-white jurk met gesmokt lijfje en zachte mouwen.',
    image: closetCreamImg,
    alt: 'Off-white zwierige smocked jurk uit de Client Closet',
  },
  {
    id: 'wardrobe-rack',
    title: 'De Complete Collectie',
    category: 'Garderobe Rek',
    description: 'Een zorgvuldig geselecteerde reeks jurken in warme aardetinten.',
    image: closetRackImg,
    alt: 'Kledingrek met jurken in aardetinten uit de Client Closet',
  },
  {
    id: 'baby-newborn',
    title: 'Newborn & Baby Knits',
    category: 'Baby & Kids • 0 t/m 12 mnd',
    description: 'Zachte, gebreide kabeltruitjes en neutrale rompertjes.',
    image: closetBabyImg,
    alt: 'Zachte gebreide babypakjes uit de Client Closet',
  },
  {
    id: 'sage-linen-dress',
    title: 'Saliegroene Linnen Maxi Jurk',
    category: 'Dames • Maat S-XL',
    description: 'Luchtige saliegroene jurk met subtiele volant en pofmouwen.',
    image: closetSageImg,
    alt: 'Saliegroene bohemian linnen jurk uit de Client Closet',
  },
  {
    id: 'oatmeal-wrap-dress',
    title: 'Havermout Linnen Wikkeljurk',
    category: 'Dames & Zwangerschap • One-size',
    description: 'Elegante neutrale wikkeljurk met zwierige fladdermouwtjes.',
    image: closetOatmealImg,
    alt: 'Havermout beige linnen wikkeljurk uit de Client Closet',
  },
  {
    id: 'caramel-knit-set',
    title: 'Caramel Waffle-Knit Set',
    category: 'Dames & Zwangerschap • Maat S-L',
    description: 'Warme comfortabele wafelgebreide trui en rok in rijke karameltint.',
    image: closetCaramelImg,
    alt: 'Caramel wafelgebreide zwangerschapsset uit de Client Closet',
  },
  {
    id: 'white-lace-maternity',
    title: 'Romantische Witte Kant Maxi Jurk',
    category: 'Zwangerschap & Dames • One-size',
    description: 'Dromerige boho kanten jurk met elegante trompetmouwen.',
    image: closetWhiteLaceImg,
    alt: 'Off-white kanten maxi-jurk met trompetmouwen uit de Client Closet',
  },
  {
    id: 'dusty-peach-boho',
    title: 'Dusty Peach Ruffle Jurk',
    category: 'Dames • Maat XS-L',
    description: 'Zachte perziktint jurk met romantische gelaagde ruches.',
    image: closetDustyPeachImg,
    alt: 'Dusty peach bohemian jurk met ruches uit de Client Closet',
  },
  {
    id: 'olive-linen-dress',
    title: 'Olijfgroene Doorknoopjurk',
    category: 'Dames & Voeding • Maat S-XL',
    description: 'Tijdloze olijfgroene linnen jurk met soepele ceintuur.',
    image: closetOliveImg,
    alt: 'Olijfgroene linnen maxi jurk uit de Client Closet',
  },
  {
    id: 'boho-lace-kimono',
    title: 'Boho Gehaakte Kimono',
    category: 'Styling Layer • One-size',
    description: 'Fijn geweven vintage-stijl kimono met kwastjes en kantwerk.',
    image: closetKimonoImg,
    alt: 'Off-white gehaakte boho kimono met kwastjes uit de Client Closet',
  },
  {
    id: 'champagne-satin-dress',
    title: 'Champagne Satin Slip Jurk',
    category: 'Dames • Maat S-L',
    description: 'Vloeiende satijnen maxi-jurk in een glanzende zandgouden tint.',
    image: closetChampagneImg,
    alt: 'Champagne satijnen slip dress uit de Client Closet',
  },
  {
    id: 'baby-oatmeal-romper',
    title: 'Kabelgebreide Baby Romper',
    category: 'Baby • 0 t/m 6 mnd',
    description: 'Grofgebreide romper in warme havermouttint met houten knoopjes.',
    image: closetRomperImg,
    alt: 'Kabelgebreide baby romper met houten knoopjes uit de Client Closet',
  },
  {
    id: 'golden-ochre-dress',
    title: 'Okergouden Tiered Dress',
    category: 'Dames • Maat XS-XL',
    description: 'Stralende warme okergele jurk met zwierige lagen en fijn borduurwerk.',
    image: closetOchreImg,
    alt: 'Warm okergele bohemian jurk uit de Client Closet',
  },
  {
    id: 'sand-linen-jumpsuit',
    title: 'Zandkleurige Linnen Jumpsuit',
    category: 'Dames • Maat S-L',
    description: 'Relaxte bohemian jumpsuit in neutraal zandlinnen met strikceintuur.',
    image: closetJumpsuitImg,
    alt: 'Zandkleurige linnen jumpsuit uit de Client Closet',
  },
  {
    id: 'blush-tulle-gown',
    title: 'Dusty Blush Tule Droomjurk',
    category: 'Zwangerschap & Dames • One-size',
    description: 'Sprookjesachtige gelaagde tule jurk in een zachte poederroze blush.',
    image: closetBlushImg,
    alt: 'Dusty blush tule droomjurk uit de Client Closet',
  },
  {
    id: 'chunky-cream-knit',
    title: 'Chunky Knit & Satin Set',
    category: 'Dames • One-size',
    description: 'Handgebreide wollen trui gecombineerd met een soepele satijnen rok.',
    image: closetChunkyImg,
    alt: 'Grofgebreide cream trui met satijnen rok uit de Client Closet',
  },
  {
    id: 'newborn-baby-set',
    title: 'Luxe Newborn Wollen Setje',
    category: 'Newborn • 0 t/m 3 mnd',
    description: 'Compleet setje met ribgebreid pakje, schattig mutsje en warme slofjes.',
    image: closetBabySetImg,
    alt: 'Newborn gebreid setje met mutsje en slofjes op schapenvacht',
  },
  {
    id: 'rust-skirt-set',
    title: 'Terracotta Wrap & Maxi Rok',
    category: 'Dames • Maat S-XL',
    description: 'Aardetinten linnen wikkelblouse met rijke gelaagde maxi-rok.',
    image: closetRustSkirtImg,
    alt: 'Terracotta rust linnen wikkelblouse en rok uit de Client Closet',
  },
];

export const ClientClosetSection: React.FC = () => {
  const { openBookingModal } = useBooking();
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeItem = CLOSET_ITEMS[activeIndex];

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    thumbnailRefs.current[activeIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [activeIndex]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? CLOSET_ITEMS.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === CLOSET_ITEMS.length - 1 ? 0 : prev + 1));
  };

  const scrollThumbnails = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -220 : 220;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="client-closet" className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-white border-t border-[#F0EBE3] overflow-hidden text-[#241C18]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Content Column (Left on desktop) */}
        <div className="lg:col-span-5 space-y-6 text-left max-w-xl">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[#7A6B62]">
              <Sparkles className="w-3.5 h-3.5 text-[#A67C46]" />
              <p
                className="text-xs uppercase tracking-[0.3em] font-medium"
                style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
              >
                WARDROBE & STYLING
              </p>
            </div>

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
            een liefdevol samengestelde collectie van 19 zwierige jurken, comfortabele stoffen en warme
            natuurtinten die jullie foto’s een tijdloze, dromerige uitstraling geven.
          </p>

          <div className="space-y-3 pt-1">
            <div className="flex items-start space-x-3 text-xs sm:text-sm text-[#4E413A]">
              <CheckCircle2 className="w-4 h-4 text-[#A67C46] shrink-0 mt-0.5" />
              <span><strong>Kosteloos te lenen:</strong> Inbegrepen bij iedere shoot naar keuze.</span>
            </div>
            <div className="flex items-start space-x-3 text-xs sm:text-sm text-[#4E413A]">
              <CheckCircle2 className="w-4 h-4 text-[#A67C46] shrink-0 mt-0.5" />
              <span><strong>Maten & Pasvorm:</strong> XS t/m XXL en soepele one-size modellen die perfect meebewegen.</span>
            </div>
            <div className="flex items-start space-x-3 text-xs sm:text-sm text-[#4E413A]">
              <CheckCircle2 className="w-4 h-4 text-[#A67C46] shrink-0 mt-0.5" />
              <span><strong>Ook voor kleintjes:</strong> Zachte gebreide newborn pakjes en neutrale rompertjes.</span>
            </div>
            <div className="flex items-start space-x-3 text-xs sm:text-sm text-[#4E413A]">
              <CheckCircle2 className="w-4 h-4 text-[#A67C46] shrink-0 mt-0.5" />
              <span><strong>Compleet ontzorgd:</strong> Ik neem de gekozen kleding fris gestoomd mee naar de locatie.</span>
            </div>
          </div>

          <div className="pt-3 flex flex-wrap items-center gap-4">
            <button
              onClick={() => openBookingModal()}
              className="inline-flex items-center space-x-2 bg-[#1A1412] hover:bg-[#332720] text-white px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-xs"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
            >
              <span>Reserveer Jouw Datum</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#DFCCA9]" />
            </button>

            <span className="text-xs text-[#7A6B62] italic" style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}>
              Klik op de foto&apos;s om de kleding te bekijken
            </span>
          </div>
        </div>

        {/* Visual Showcase Column (Right on desktop: 19-Photo Interactive Gallery) */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-end">
          <div className="w-full max-w-lg space-y-3.5">
            
            {/* Featured Photo Frame */}
            <div 
              onClick={() => setLightboxOpen(true)}
              className="relative w-full aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-[#F5EFE8] shadow-[0_8px_30px_rgba(0,0,0,0.08)] cursor-pointer group"
            >
              <img
                key={activeItem.id}
                src={activeItem.image}
                alt={activeItem.alt}
                className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Prev / Next overlay arrows */}
              <button
                onClick={handlePrev}
                aria-label="Vorige foto"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-[#1A1412] backdrop-blur-xs flex items-center justify-center transition-all shadow-sm opacity-90 hover:opacity-100 hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                aria-label="Volgende foto"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-[#1A1412] backdrop-blur-xs flex items-center justify-center transition-all shadow-sm opacity-90 hover:opacity-100 hover:scale-110"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

            </div>

            {/* Thumbnail Strip with 19 Photos (Scrollable carousel, pure visual without subtitles) */}
            <div className="relative w-full">
              {/* Thumbnail scroll controls */}
              <div className="flex items-center justify-end pb-1.5 px-0.5">
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => scrollThumbnails('left')}
                    aria-label="Scroll miniaturen naar links"
                    className="w-6 h-6 rounded-full border border-[#D9CEBF] text-[#4E413A] hover:bg-[#F5EFE8] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => scrollThumbnails('right')}
                    aria-label="Scroll miniaturen naar rechts"
                    className="w-6 h-6 rounded-full border border-[#D9CEBF] text-[#4E413A] hover:bg-[#F5EFE8] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div 
                ref={scrollContainerRef}
                className="flex space-x-2 sm:space-x-2.5 overflow-x-auto py-1 scroll-smooth no-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {CLOSET_ITEMS.map((item, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={item.id}
                      ref={(el) => { thumbnailRefs.current[idx] = el; }}
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`Foto ${idx + 1}`}
                      className={`relative w-16 sm:w-20 shrink-0 aspect-[3/4] overflow-hidden transition-all group cursor-pointer ${
                        isActive
                          ? 'ring-2 ring-[#A67C46] shadow-md scale-[1.03] opacity-100'
                          : 'opacity-65 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Lightbox Modal for Full View */}
      {lightboxOpen && (
        <div 
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
        >
          <button
            onClick={() => setLightboxOpen(false)}
            aria-label="Sluiten"
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl max-h-[90vh] flex flex-col items-center bg-[#1A1412] text-white overflow-hidden shadow-2xl"
          >
            <div className="relative w-full max-h-[75vh] flex items-center justify-center bg-black/40">
              <img
                src={activeItem.image}
                alt={activeItem.alt}
                className="max-h-[75vh] w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={handlePrev}
                aria-label="Vorige foto"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Volgende foto"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="w-full px-6 py-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-[#DFCCA9] tracking-widest uppercase font-medium">
                Client Closet • {activeIndex + 1} van {CLOSET_ITEMS.length}
              </span>

              <button
                onClick={() => {
                  setLightboxOpen(false);
                  openBookingModal();
                }}
                className="inline-flex items-center space-x-2 bg-[#A67C46] hover:bg-[#8e6939] text-white px-5 py-2 rounded-full text-xs uppercase tracking-wider font-medium shrink-0 transition-all cursor-pointer"
              >
                <span>Plan Jouw Shoot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
