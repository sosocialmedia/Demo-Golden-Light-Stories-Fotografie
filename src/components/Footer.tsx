import React from 'react';
import { Instagram, Facebook, Mail, Phone, MapPin, Calendar, Settings, FileText } from 'lucide-react';
import { PHOTOGRAPHER_INFO } from '../data/photographyData';
import { useBooking } from '../context/BookingContext';
import { BrandLogo } from './BrandLogo';
import { openTermsPdf } from '../utils/pdfDownload';

export const Footer: React.FC = () => {
  const { openBookingModal, openPhotographerAdmin } = useBooking();

  return (
    <footer id="contact" className="bg-[#2A211D] text-[#FAF7F2] pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-[#433730]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10 text-left">
        
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="w-fit">
            <BrandLogo size="md" variant="gold" className="!items-start !text-left" />
          </div>
          <p className="text-xs sm:text-sm text-[#D5C7B8] leading-relaxed max-w-sm pt-2">
            Warme, liefdevolle en spontane gezins-, zwangerschaps-, newborn- en kinderfotografie in natuurlijk warm licht.
          </p>

          {/* Social Links from user input */}
          <div className="flex items-center space-x-3 pt-2">
            <a
              id="footer-instagram-link"
              href={PHOTOGRAPHER_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/10 hover:bg-[#A67C46] hover:text-white transition-all text-[#FAF7F2]"
              aria-label="Instagram @goldenls_photography"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              id="footer-facebook-link"
              href={PHOTOGRAPHER_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/10 hover:bg-[#A67C46] hover:text-white transition-all text-[#FAF7F2]"
              aria-label="Facebook My Looks by N"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="md:col-span-3 space-y-3">
          <p className="text-xs uppercase tracking-widest text-[#E6C9A2] font-semibold">
            Navigatie & Informatie
          </p>
          <ul className="space-y-2 text-xs text-[#D5C7B8]">
            <li>
              <a href="#story" className="hover:text-white transition-colors">Over Golden Light</a>
            </li>
            <li>
              <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
            </li>
            <li>
              <a href="#golden-stories" className="hover:text-white transition-colors">Golden Stories</a>
            </li>
            <li>
              <a href="#agenda" className="hover:text-white transition-colors">Agenda</a>
            </li>
            <li>
              <a href="#client-closet" className="hover:text-white transition-colors">Client Closet</a>
            </li>
            <li>
              <a href="#over-mij" className="hover:text-white transition-colors">Over Mij</a>
            </li>
            <li className="pt-2 border-t border-white/10">
              <button
                id="footer-open-terms-btn"
                onClick={openTermsPdf}
                className="hover:text-[#DFCCA9] transition-colors flex items-center space-x-1.5 text-left text-[#E6C9A2] cursor-pointer"
                title="Open of download de algemene voorwaarden als PDF"
              >
                <FileText className="w-3 h-3 text-[#E6C9A2]" />
                <span>Algemene Voorwaarden (PDF)</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Contact & Booking Column */}
        <div className="md:col-span-4 space-y-4">
          <p className="text-xs uppercase tracking-widest text-[#E6C9A2] font-semibold">
            Contact & Boekingen
          </p>

          <div className="space-y-2 text-xs text-[#D5C7B8]">
            <p className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#E6C9A2] shrink-0" />
              <span>{PHOTOGRAPHER_INFO.travelRadius}</span>
            </p>
            <p className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-[#E6C9A2] shrink-0" />
              <a href={`mailto:${PHOTOGRAPHER_INFO.email}`} className="hover:text-white">
                {PHOTOGRAPHER_INFO.email}
              </a>
            </p>
            <p className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-[#E6C9A2] shrink-0" />
              <a href={`tel:${PHOTOGRAPHER_INFO.phone}`} className="hover:text-white">
                {PHOTOGRAPHER_INFO.phone}
              </a>
            </p>
          </div>

          <div className="pt-2 flex flex-col space-y-2">
            <button
              onClick={() => openBookingModal()}
              className="flex items-center justify-center space-x-2 bg-[#FAF7F2] text-[#2A211D] hover:bg-[#EFE7DC] px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all"
            >
              <Calendar className="w-3.5 h-3.5 text-[#A67C46]" />
              <span>Plan Direct Jouw Shoot</span>
            </button>

            <button
              onClick={() => openPhotographerAdmin('beschikbaarheid')}
              className="flex items-center justify-center space-x-1.5 border border-white/20 text-[#D5C7B8] hover:text-white hover:border-white/40 px-4 py-2 rounded-full text-[11px] transition-all"
            >
              <Settings className="w-3 h-3 text-[#E6C9A2]" />
              <span>Fotograaf Agenda Beheer</span>
            </button>
          </div>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#A6978B] gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <p>© {new Date().getFullYear()} Golden Light Stories Fotografie. Alle rechten voorbehouden.</p>
          <span>•</span>
          <button onClick={openTermsPdf} className="hover:text-white underline cursor-pointer">
            Algemene Voorwaarden (PDF)
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <span>
            Website gemaakt door{' '}
            <a
              href="https://so-socialmedia.nl/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#DFCCA9] transition-colors underline underline-offset-4 decoration-[#C59B63]/60 font-medium"
            >
              So Social
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};
