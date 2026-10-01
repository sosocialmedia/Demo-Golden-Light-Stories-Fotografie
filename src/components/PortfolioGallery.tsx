import React, { useState } from 'react';
import { PORTFOLIO_ITEMS } from '../data/photographyData';
import { ShootCategory, PortfolioItem } from '../types';
import { Instagram, Eye, Calendar, X, MapPin } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { PHOTOGRAPHER_INFO } from '../data/photographyData';

export const PortfolioGallery: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | ShootCategory>('all');
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);
  const { openBookingModal } = useBooking();

  const filteredItems = selectedFilter === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(item => item.category === selectedFilter);

  const filters: { label: string; value: 'all' | ShootCategory }[] = [
    { label: 'Alles Bekijken', value: 'all' },
    { label: 'Gezinnen & Kids', value: 'gezin' },
    { label: 'Zwangerschap', value: 'zwangerschap' },
    { label: 'Newborn & Baby', value: 'newborn' },
    { label: 'Koppels & Liefde', value: 'koppels' },
  ];

  return (
    <section id="portfolio" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F0E8]/50 border-t border-b border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-[#A67C46] font-semibold">
            Beelden vol gevoel
          </p>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl text-[#2A211D] font-normal">
            Echte verhalen in warm zonlicht
          </h2>
          <p className="text-[#5A4D45] text-sm sm:text-base leading-relaxed">
            Geen gemaakte poses, maar de oprechte lach van je kindje, de tederheid van een hand op je zwangere buik,
            en de warme zonnestralen die door de haren dansen.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filters.map(filter => (
            <button
              key={filter.value}
              onClick={() => setSelectedFilter(filter.value)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
                selectedFilter === filter.value
                  ? 'bg-[#2A211D] text-[#FAF7F2] shadow-xs'
                  : 'bg-[#FAF7F2] text-[#5A4D45] hover:bg-[#EFE7DC] border border-[#E0D6CB]'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Masonry-like Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group cursor-pointer relative overflow-hidden rounded-2xl bg-[#FAF7F2] border border-[#E0D6CB] shadow-xs hover:shadow-md transition-all duration-500"
            >
              <div className="aspect-[3/4] overflow-hidden relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                
                {/* Hover overlay with story details */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A211D]/85 via-[#2A211D]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end text-left">
                  <span className="text-[10px] uppercase tracking-widest text-[#E6C9A2] font-semibold">
                    {item.category}
                  </span>
                  <h3 className="font-serif-editorial text-xl text-white font-medium">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#EAE1D7] flex items-center space-x-1 mt-1">
                    <MapPin className="w-3 h-3 text-[#E6C9A2]" />
                    <span>{item.location}</span>
                  </p>
                  <span className="mt-3 inline-flex items-center space-x-1 text-[11px] text-[#FAF7F2] font-medium bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-full w-fit">
                    <Eye className="w-3 h-3" />
                    <span>Bekijk Verhaal</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Follow Callout */}
        <div className="mt-12 text-center p-6 bg-[#FAF7F2] rounded-2xl border border-[#E5DACD] max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-left">
            <div className="w-10 h-10 rounded-full bg-[#EFE7DC] flex items-center justify-center text-[#A67C46]">
              <Instagram className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#2A211D]">@goldenls_photography</p>
              <p className="text-xs text-[#705E53]">Dagelijkse stories & behind-the-scenes</p>
            </div>
          </div>
          <a
            id="portfolio-instagram-link"
            href={PHOTOGRAPHER_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#EFE7DC] hover:bg-[#E2D6C6] text-[#2A211D] rounded-full transition-colors"
          >
            Volg op Instagram
          </a>
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2A211D]/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative max-w-3xl w-full bg-[#FAF7F2] rounded-2xl overflow-hidden shadow-2xl border border-[#E8DFD5] flex flex-col md:flex-row">
            
            {/* Close button */}
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 text-[#2A211D] hover:bg-white shadow-xs"
              aria-label="Sluiten"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="md:w-1/2 aspect-[4/5] md:aspect-auto max-h-[70vh]">
              <img
                src={activeItem.imageUrl}
                alt={activeItem.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Modal Content */}
            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between text-left space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#A67C46] font-semibold bg-[#EFE7DC] px-2.5 py-1 rounded-full">
                  {activeItem.category}
                </span>
                <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#2A211D] mt-3">
                  {activeItem.title}
                </h3>
                <p className="text-xs text-[#705E53] flex items-center space-x-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#A67C46]" />
                  <span>{activeItem.location}</span>
                </p>
                <p className="text-[#5A4D45] text-sm leading-relaxed mt-4">
                  {activeItem.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8DFD5] space-y-3">
                <p className="text-xs text-[#705E53] italic">
                  "Jullie herinneringen verdienen een tastbare plek in het gouden uur."
                </p>
                <button
                  onClick={() => {
                    setActiveItem(null);
                    openBookingModal();
                  }}
                  className="w-full flex items-center justify-center space-x-2 bg-[#2A211D] hover:bg-[#433730] text-[#FAF7F2] py-3 rounded-full text-xs uppercase tracking-widest font-semibold transition-all"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#E6C9A2]" />
                  <span>Plan Jouw Eigen Shoot</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
