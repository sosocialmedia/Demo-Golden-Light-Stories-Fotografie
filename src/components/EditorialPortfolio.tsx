import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import maternityDunesImg from '../assets/images/maternity_dunes_bump_1790850026527.jpeg';
import coupleMeadowImg from '../assets/images/couple_meadow_sunset_1790850013841.jpeg';
import motherToddlerImg from '../assets/images/mother_toddler_studio_1790850037968.jpeg';
import brandingDunesImg from '../assets/images/branding_dunes_dress_1790850055961.jpg';
import newbornHandsImg from '../assets/images/newborn_peaceful_hands_1790850047140.jpeg';

interface ShowcasePhoto {
  id: string;
  url: string;
  alt: string;
  caption: string;
  category: string;
}

export const EditorialPortfolio: React.FC = () => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // The 5 iconic editorial photos featuring Nikki's real photography
  const showcasePhotos: ShowcasePhoto[] = [
    {
      id: 'photo-1',
      url: maternityDunesImg,
      alt: 'Zwangerschap in de zandduinen tijdens het gouden uur',
      caption: 'De magie van nieuw leven gekoesterd in warm strijklicht',
      category: 'Zwangerschap',
    },
    {
      id: 'photo-2',
      url: coupleMeadowImg,
      alt: 'Liefdevol koppel wandelend door de weide in gouden zonlicht',
      caption: 'Pure connectie, humor en tederheid voor jullie samen',
      category: 'Koppels & Liefde',
    },
    {
      id: 'photo-3',
      url: motherToddlerImg,
      alt: 'Moeder en peuterdochtertje geven een eskimokus',
      caption: 'Onvoorwaardelijke liefde, tederheid en geborgenheid',
      category: 'Moeder & Kind',
    },
    {
      id: 'photo-4',
      url: brandingDunesImg,
      alt: 'Vrouw in zwierige jurk uit de Client Closet in de duinen',
      caption: 'Elegante jurken en natuurlijke zandtinten die dansen in de wind',
      category: 'Client Closet & Portret',
    },
    {
      id: 'photo-5',
      url: newbornHandsImg,
      alt: 'Puur newborn kindje slapend in vaders handen',
      caption: 'De allereerste magische dagen in alle rust vastgelegd',
      category: 'Puur Newborn',
    },
  ];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + showcasePhotos.length) % showcasePhotos.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % showcasePhotos.length);
    }
  };

  return (
    <section id="portfolio" className="bg-white text-[#241C18] pt-28 pb-24 sm:pt-36 sm:pb-32 overflow-hidden">
      
      {/* Header section exactly matching Image 2 */}
      <div className="max-w-4xl mx-auto text-center px-4 mb-16 sm:mb-20">
        <p
          className="text-xs sm:text-[13px] uppercase tracking-[0.32em] text-[#7A6B62] font-medium mb-3"
          style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
        >
          DISCOVER MY WORK
        </p>

        <h2
          className="font-editorial text-6xl sm:text-7xl md:text-8xl lg:text-[104px] font-normal leading-none text-[#1A1412] tracking-tight"
          style={{ fontFamily: "'Bodoni Moda', 'Cormorant Garamond', Georgia, serif" }}
        >
          Portfolio
        </h2>
      </div>

      {/* 
        5-Photo Layout matching Image 2:
        Center photo is the tallest hero piece, flanked symmetrically by 2 vertical photos on each side.
      */}
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-7 overflow-x-auto pb-4 pt-2 no-scrollbar">
          
          {/* Photo 1: Far Left */}
          <div
            onClick={() => setActivePhotoIndex(0)}
            className="group cursor-pointer flex-shrink-0 w-36 sm:w-48 md:w-56 lg:w-64 h-[280px] sm:h-[380px] md:h-[460px] lg:h-[500px] overflow-hidden bg-[#F5EFE8] relative transition-transform duration-500 hover:opacity-95"
          >
            <img
              src={showcasePhotos[0].url}
              alt={showcasePhotos[0].alt}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
              <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
            </div>
          </div>

          {/* Photo 2: Left Middle */}
          <div
            onClick={() => setActivePhotoIndex(1)}
            className="group cursor-pointer flex-shrink-0 w-40 sm:w-52 md:w-64 lg:w-72 h-[320px] sm:h-[440px] md:h-[520px] lg:h-[580px] overflow-hidden bg-[#F5EFE8] relative transition-transform duration-500 hover:opacity-95"
          >
            <img
              src={showcasePhotos[1].url}
              alt={showcasePhotos[1].alt}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
              <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
            </div>
          </div>

          {/* Photo 3: The Big Central Hero (Taller & Dominant, exactly like Image 2) */}
          <div
            onClick={() => setActivePhotoIndex(2)}
            className="group cursor-pointer flex-shrink-0 w-48 sm:w-64 md:w-80 lg:w-96 h-[380px] sm:h-[520px] md:h-[620px] lg:h-[680px] overflow-hidden bg-[#F5EFE8] relative shadow-[0_10px_40px_rgba(0,0,0,0.08)] z-10 transition-transform duration-500 hover:opacity-95"
          >
            <img
              src={showcasePhotos[2].url}
              alt={showcasePhotos[2].alt}
              className="w-full h-full object-cover object-[center_30%] transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
              <Eye className="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
            </div>
          </div>

          {/* Photo 4: Right Middle */}
          <div
            onClick={() => setActivePhotoIndex(3)}
            className="group cursor-pointer flex-shrink-0 w-40 sm:w-52 md:w-64 lg:w-72 h-[320px] sm:h-[440px] md:h-[520px] lg:h-[580px] overflow-hidden bg-[#F5EFE8] relative transition-transform duration-500 hover:opacity-95"
          >
            <img
              src={showcasePhotos[3].url}
              alt={showcasePhotos[3].alt}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
              <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
            </div>
          </div>

          {/* Photo 5: Far Right */}
          <div
            onClick={() => setActivePhotoIndex(4)}
            className="group cursor-pointer flex-shrink-0 w-36 sm:w-48 md:w-56 lg:w-64 h-[280px] sm:h-[380px] md:h-[460px] lg:h-[500px] overflow-hidden bg-[#F5EFE8] relative transition-transform duration-500 hover:opacity-95"
          >
            <img
              src={showcasePhotos[4].url}
              alt={showcasePhotos[4].alt}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
              <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
            </div>
          </div>

        </div>
      </div>

      {/* Lightbox Modal for individual photo view */}
      {activePhotoIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setActivePhotoIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full z-10 focus:outline-none"
            aria-label="Sluiten"
          >
            <X className="w-7 h-7" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 text-white/80 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors focus:outline-none z-10"
            aria-label="Vorige"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 text-white/80 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors focus:outline-none z-10"
            aria-label="Volgende"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Large Image View */}
          <div
            className="max-w-4xl max-h-[85vh] flex flex-col items-center select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={showcasePhotos[activePhotoIndex].url}
              alt={showcasePhotos[activePhotoIndex].alt}
              className="max-h-[75vh] w-auto object-contain shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="mt-4 text-center">
              <p
                className="text-white text-base font-light"
                style={{ fontFamily: "'Bodoni Moda', Georgia, serif" }}
              >
                {showcasePhotos[activePhotoIndex].caption}
              </p>
              <p className="text-white/60 text-xs uppercase tracking-[0.2em] mt-1">
                {showcasePhotos[activePhotoIndex].category} • {activePhotoIndex + 1} / {showcasePhotos.length}
              </p>
            </div>
          </div>

        </div>
      )}
    </section>
  );
};
