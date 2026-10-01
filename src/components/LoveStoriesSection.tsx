import React, { useState } from 'react';
import { LOVE_STORIES } from '../data/photographyData';
import { LoveStoryItem } from '../types';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const LoveStoriesSection: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<LoveStoryItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const handleOpenGallery = (story: LoveStoryItem) => {
    if (story.isComingSoon) return;
    setSelectedStory(story);
    setActiveImageIndex(0);
  };

  const handleCloseGallery = () => {
    setSelectedStory(null);
    setActiveImageIndex(0);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedStory && selectedStory.galleryImages.length > 0) {
      setActiveImageIndex((prev) => (prev - 1 + selectedStory.galleryImages.length) % selectedStory.galleryImages.length);
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedStory && selectedStory.galleryImages.length > 0) {
      setActiveImageIndex((prev) => (prev + 1) % selectedStory.galleryImages.length);
    }
  };

  return (
    <section id="golden-stories" className="bg-white text-[#241C18] pt-16 pb-28 sm:pb-36 scroll-mt-20">
      <span id="love-stories" className="block -mt-20 pt-20" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Heading: GOLDEN STORIES */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            className="text-xs sm:text-sm md:text-[15px] uppercase tracking-[0.38em] text-[#1A1412] font-medium"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            GOLDEN STORIES
          </h2>
        </div>

        {/* 
          6 BROCHURE THEMES: NEWBORN, CAKESMASH, BRANDING, PREGNANCY, GEZINSSHOOT, KINDER PORTRET
          Clean, perfectly spaced square tiles with uppercase centered typography 
          and "BEKIJK GALLERIJ" at the bottom
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {LOVE_STORIES.map((story) => (
            <div
              key={story.id}
              onClick={() => handleOpenGallery(story)}
              className={`group relative aspect-square overflow-hidden bg-[#F0EAE1] ${
                story.isComingSoon
                  ? 'cursor-default'
                  : 'cursor-pointer'
              }`}
            >
              {story.coverImage ? (
                <>
                  {/* Background Cover Photo */}
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out ${
                      story.isComingSoon
                        ? 'opacity-65 scale-100'
                        : 'group-hover:scale-105'
                    }`}
                    referrerPolicy="no-referrer"
                  />

                  {/* Subtiel donker vignet om de witte letters kraakhelder leesbaar te houden */}
                  <div
                    className={`absolute inset-0 transition-colors duration-500 ${
                      story.isComingSoon
                        ? 'bg-white/40'
                        : 'bg-black/30 group-hover:bg-black/40'
                    }`}
                  />

                  {/* Centered Typography & "BEKIJK GALLERIJ" */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none">
                    <div className="space-y-1.5 transform transition-transform duration-500 group-hover:-translate-y-1">
                      <h3
                        className="text-white text-sm sm:text-[15px] md:text-base uppercase tracking-[0.28em] font-medium drop-shadow-md leading-relaxed"
                        style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                      >
                        {story.title}
                      </h3>
                      <p
                        className="text-white/90 text-xs sm:text-[13px] uppercase tracking-[0.28em] font-light drop-shadow-sm"
                        style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                      >
                        {story.country}
                      </p>
                    </div>

                    <div className="absolute bottom-8 left-0 right-0 text-center">
                      <span
                        className="text-white/95 text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-light border-b border-transparent group-hover:border-white/70 transition-all pb-0.5"
                        style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                      >
                        BEKIJK GALLERIJ
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                /* Beige achtergrond voor thema's zonder foto (bijv. Cakesmash) */
                <div className="w-full h-full bg-[#F5EFE6] border border-[#E5DACD] flex flex-col items-center justify-center p-6 sm:p-8 text-center select-none group-hover:bg-[#EFE8DE] transition-colors duration-500">
                  <div className="space-y-2">
                    <h3
                      className="text-[#241C18] text-sm sm:text-[15px] md:text-base uppercase tracking-[0.28em] font-medium leading-relaxed"
                      style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                    >
                      {story.title}
                    </h3>
                    <p
                      className="text-[#7A6B62] text-xs sm:text-[13px] uppercase tracking-[0.28em] font-light"
                      style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                    >
                      {story.country}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#DFD3C3] w-32">
                    <span
                      className="text-[10px] uppercase tracking-[0.22em] text-[#9A897F] font-light block"
                      style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                    >
                      Foto's volgen binnenkort
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* GALLERY LIGHTBOX MODAL */}
      {selectedStory && (
        <div
          className="fixed inset-0 z-50 bg-[#1A1412]/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={handleCloseGallery}
        >
          {/* Top Bar with Story Name & Close */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white z-20">
            <div className="text-left">
              <span
                className="text-xs sm:text-sm uppercase tracking-[0.3em] font-medium block text-white"
                style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
              >
                {selectedStory.title}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-white/70">
                {selectedStory.country}
              </span>
            </div>

            <button
              onClick={handleCloseGallery}
              className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors focus:outline-none"
              aria-label="Sluit galerij"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Arrows */}
          {selectedStory.galleryImages.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 sm:left-8 text-white/80 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors focus:outline-none z-20"
                aria-label="Vorige foto"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              <button
                onClick={handleNextImage}
                className="absolute right-4 sm:right-8 text-white/80 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors focus:outline-none z-20"
                aria-label="Volgende foto"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          {/* Gallery View */}
          <div
            className="max-w-4xl max-h-[82vh] flex flex-col items-center select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden bg-black/40 shadow-2xl">
              <img
                src={selectedStory.galleryImages[activeImageIndex]}
                alt={`${selectedStory.title} - Foto ${activeImageIndex + 1}`}
                className="max-h-[72vh] w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Story Description & Image Indicator */}
            <div className="mt-4 text-center max-w-xl">
              {selectedStory.description && (
                <p
                  className="text-white/90 text-sm font-light leading-relaxed"
                  style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                >
                  {selectedStory.description}
                </p>
              )}
              <div className="flex items-center justify-center space-x-2 mt-3">
                {selectedStory.galleryImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`h-1.5 transition-all rounded-full ${
                      idx === activeImageIndex
                        ? 'w-6 bg-white'
                        : 'w-1.5 bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Ga naar foto ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      )}
    </section>
  );
};
