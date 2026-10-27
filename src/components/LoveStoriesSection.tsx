import React, { useState } from 'react';
import { LoveStoryItem } from '../types';
import { X, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { AdminPinModal } from './AdminPinModal';

export const LoveStoriesSection: React.FC = () => {
  const { stories, openPhotographerAdmin } = useBooking();
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [targetStoryId, setTargetStoryId] = useState<string | undefined>(undefined);

  const selectedStory = stories.find(s => s.id === selectedStoryId) || null;

  const handleOpenGallery = (story: LoveStoryItem) => {
    if (story.isComingSoon) return;
    setSelectedStoryId(story.id);
    setActiveImageIndex(0);
  };

  const handleCloseGallery = () => {
    setSelectedStoryId(null);
    setActiveImageIndex(0);
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedStory && selectedStory.galleryImages.length > 0) {
      setActiveImageIndex((prev) => (prev - 1 + selectedStory.galleryImages.length) % selectedStory.galleryImages.length);
    }
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedStory && selectedStory.galleryImages.length > 0) {
      setActiveImageIndex((prev) => (prev + 1) % selectedStory.galleryImages.length);
    }
  };

  React.useEffect(() => {
    if (!selectedStory) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseGallery();
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedStory]);

  return (
    <section id="golden-stories" className="bg-white text-[#241C18] pt-16 pb-28 sm:pb-36 scroll-mt-20">
      <span id="love-stories" className="block -mt-20 pt-20" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Heading: GOLDEN STORIES met subtiel discreet slotje */}
        <div className="relative flex items-center justify-center mb-12 sm:mb-16">
          <h2
            className="text-xs sm:text-sm md:text-[15px] uppercase tracking-[0.38em] text-[#1A1412] font-medium"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            GOLDEN STORIES
          </h2>

          {/* Subtiel discreet slotje aan de zijkant voor fotografe Nikki */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <button
              id="golden-stories-secret-admin-btn"
              onClick={() => {
                setTargetStoryId(undefined);
                setIsPinModalOpen(true);
              }}
              className="p-2 rounded-full text-[#A6978B]/60 hover:text-[#2A211D] hover:bg-[#EFE8DE]/60 transition-all cursor-pointer opacity-50 hover:opacity-100 group"
              title="Foto's beheren & toevoegen (beveiligd met code)"
              aria-label="Foto beheer"
            >
              <Lock className="w-3.5 h-3.5 text-[#A67C46]/70 group-hover:text-[#A67C46] transition-colors" />
            </button>
          </div>
        </div>

        {/* 
          6 BROCHURE THEMES: NEWBORN, CAKESMASH, BRANDING, PREGNANCY, GEZINSSHOOT, KINDER PORTRET
          Clean, perfectly spaced square tiles with uppercase centered typography 
          and "BEKIJK GALLERIJ" at the bottom
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {stories.map((story) => (
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
                    <div className="space-y-1 transform transition-transform duration-500 group-hover:-translate-y-1">
                      <h3
                        className="text-white text-sm sm:text-[15px] md:text-base uppercase tracking-[0.28em] font-medium drop-shadow-md leading-relaxed"
                        style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                      >
                        {story.title}
                      </h3>
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
                  <div className="space-y-1">
                    <h3
                      className="text-[#241C18] text-sm sm:text-[15px] md:text-base uppercase tracking-[0.28em] font-medium leading-relaxed"
                      style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                    >
                      {story.title}
                    </h3>
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
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setTargetStoryId(selectedStory.id);
                  setIsPinModalOpen(true);
                }}
                className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors focus:outline-none cursor-pointer"
                title="Foto's aan deze categorie toevoegen (beveiligd met code)"
                aria-label="Foto's toevoegen"
              >
                <Lock className="w-4 h-4 text-[#DFCCA9]/70 hover:text-[#DFCCA9]" />
              </button>

              <button
                onClick={handleCloseGallery}
                className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors focus:outline-none cursor-pointer"
                aria-label="Sluit galerij"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
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
            className="max-w-4xl max-h-[85vh] flex flex-col items-center select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden bg-black/40 shadow-2xl">
              <img
                src={selectedStory.galleryImages[activeImageIndex]}
                alt={`${selectedStory.title} - Foto ${activeImageIndex + 1}`}
                className="max-h-[80vh] w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {selectedStory.galleryImages.length > 1 && (
              <div className="flex items-center justify-center gap-2 mt-4 max-w-full overflow-x-auto px-2 py-1 no-scrollbar">
                {selectedStory.galleryImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-md overflow-hidden transition-all duration-200 flex-shrink-0 cursor-pointer ${
                      idx === activeImageIndex
                        ? 'ring-2 ring-white scale-105 opacity-100 shadow-md'
                        : 'opacity-40 hover:opacity-80'
                    }`}
                    aria-label={`Ga naar foto ${idx + 1}`}
                  >
                    <img
                      src={imgUrl}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* PIN Code Beveiligingsmodal voor Fotografe Nikki */}
      <AdminPinModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onSuccess={() => {
          openPhotographerAdmin('fotos', targetStoryId);
        }}
      />
    </section>
  );
};
