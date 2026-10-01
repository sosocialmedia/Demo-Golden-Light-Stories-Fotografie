import React from 'react';
import { Star, Quote } from 'lucide-react';
import { REVIEWS } from '../data/photographyData';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F0E8]/50 border-t border-[#E8DFD5]">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#A67C46] font-semibold">
            Ervaringen van klanten
          </p>
          <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl text-[#2A211D] font-normal">
            Liefdevolle woorden
          </h2>
          <p className="text-[#5A4D45] text-sm sm:text-base leading-relaxed">
            De mooiste beloning van mijn werk zijn de warme reacties van ouders en koppels
            wanneer ze hun online galerij voor het eerst openen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#DFCFC0] shadow-xs flex flex-col justify-between text-left relative"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center space-x-1 text-[#C59B63] mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-[#E8DFD5] mb-2" />

                <p className="text-xs sm:text-sm text-[#4A3E38] leading-relaxed italic">
                  "{review.text}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8DFD5]">
                <p
                  className="text-base text-[#1A1412] font-medium tracking-wide"
                  style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                >
                  {review.author}
                </p>
                <div className="text-[11px] text-[#7A6B62] mt-0.5 uppercase tracking-wider font-medium">
                  <span>{review.shootType}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
