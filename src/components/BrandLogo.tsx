import React from 'react';

interface BrandLogoProps {
  variant?: 'dark' | 'light' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  size = 'md',
  className = '',
}) => {
  // Color combinations matching the official branding
  const textMainColor =
    variant === 'light'
      ? 'text-[#FAF7F2]'
      : variant === 'gold'
      ? 'text-[#DFCCA9]'
      : 'text-[#241C18]';

  const textSubColor =
    variant === 'light'
      ? 'text-[#D5C7B8]'
      : variant === 'gold'
      ? 'text-[#9B8579]'
      : 'text-[#7D6B60]';

  // Size scalers
  const sizeClasses = {
    sm: {
      golden: 'text-xl sm:text-2xl tracking-[0.14em]',
      subtitle: 'text-[8px] sm:text-[9px] tracking-[0.34em] mt-0.5',
    },
    md: {
      golden: 'text-2xl sm:text-3xl tracking-[0.16em]',
      subtitle: 'text-[9px] sm:text-[10px] tracking-[0.38em] mt-0.5',
    },
    lg: {
      golden: 'text-4xl sm:text-5xl tracking-[0.18em]',
      subtitle: 'text-xs sm:text-sm tracking-[0.42em] mt-1.5',
    },
  }[size];

  return (
    <div className={`flex flex-col items-center justify-center select-none text-center ${className}`}>
      {/* Primary Brand Name: GOLDEN */}
      <span
        className={`font-editorial font-medium uppercase leading-none transition-colors ${textMainColor} ${sizeClasses.golden}`}
        style={{
          fontFamily: "'Bodoni Moda', 'Cormorant Garamond', Georgia, serif",
          fontWeight: 500,
        }}
      >
        GOLDEN
      </span>

      {/* Sub-brand: LIGHT STORIES (High-tracking spaced uppercase) */}
      <span
        className={`uppercase font-light leading-none ${textSubColor} ${sizeClasses.subtitle}`}
        style={{
          fontFamily: "'Montserrat', system-ui, sans-serif",
          fontWeight: 400,
        }}
      >
        LIGHT STORIES
      </span>
    </div>
  );
};
