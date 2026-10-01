import React from 'react';
import coupleMeadowImg from '../assets/images/couple_meadow_sunset_1790850013841.jpeg';
import coupleBannerImg from '../assets/images/couple_meadow_banner_1790850066606.jpg';

export const IntroStorySection: React.FC = () => {
  return (
    <section id="story" className="bg-white text-[#241C18] pt-24 sm:pt-32 pb-0 overflow-hidden">
      {/* Upper 2-column layout matching Image 1 */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-20 sm:mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-8 max-w-xl">
            <h2
              className="font-editorial text-3xl sm:text-5xl lg:text-[54px] font-normal leading-[1.15] tracking-tight text-[#1A1412]"
              style={{ fontFamily: "'Bodoni Moda', 'Cormorant Garamond', Georgia, serif" }}
            >
              Golden Light Stories
              <br />
              <span className="font-light">Fotografie</span>
            </h2>

            <p
              className="text-[#5A4D45] text-sm sm:text-[15px] lg:text-[16px] leading-[1.85] font-normal"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif", fontWeight: 350 }}
            >
              Herinneringen zijn er om gemaakt te worden. Herinneringen zijn er om te koesteren,
              om aan vast te houden. Herinneringen zijn er om naar terug te kijken. Ieder moment
              waar de liefde en het leven gevierd wordt, verdient het om te worden vastgelegd.
              Laat dat nou net zijn, waar ik héél blij van word! Ik leg heel graag jullie
              belangrijkste momenten vast.
            </p>
          </div>

          {/* Right Image Column: vertical golden hour meadow couple portrait */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-[3/4] overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.06)] bg-[#F5EFE8]">
              <img
                src={coupleMeadowImg}
                alt="Golden Light Stories - Liefdevol koppel tijdens het gouden uur"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Panoramic Horizontal Banner matching the bottom crop */}
      <div className="w-full h-44 sm:h-64 md:h-80 overflow-hidden relative">
        <img
          src={coupleBannerImg}
          alt="Liefdevol koppel ontspannen in het zachte weidelicht"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-white/5" />
      </div>
    </section>
  );
};
