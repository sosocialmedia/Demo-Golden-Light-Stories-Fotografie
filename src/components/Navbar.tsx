import React, { useState, useEffect } from 'react';
import { X, Instagram, Facebook, Calendar, Settings, MapPin, Mail, Phone, ArrowRight, BookOpen, FileText } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useBooking } from '../context/BookingContext';
import { PHOTOGRAPHER_INFO } from '../data/photographyData';

export const Navbar: React.FC = () => {
  const { openBookingModal, openPhotographerAdmin, bookings, openBrochure, openTerms } = useBooking();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when full menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Over Golden Light', href: '#story', subtitle: 'Het verhaal & herinneringen' },
    { name: 'Portfolio', href: '#portfolio', subtitle: 'Discover my work' },
    { name: 'Golden Stories', href: '#golden-stories', subtitle: 'Thema shoots & verhalen' },
    { name: 'Agenda', href: '#agenda', subtitle: 'Beschikbare data & tijden' },
    { name: 'Client Closet', href: '#client-closet', subtitle: 'Luxe kleding voor de shoot' },
    { name: 'Over Mij', href: '#over-mij', subtitle: 'Het gezicht achter de camera' },
    { name: 'Contact', href: '#contact', subtitle: 'Stel een vraag of plan direct' },
  ];

  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 
        HEADER PRECIES ZOALS VOORBEELD:
        - Witte strakke balk bovenaan
        - Exact in het midden: Het Logo
        - Rechts: Alleen "MENU"
        - Verder helemaal niks in de balk!
      */}
      <header
        id="main-navigation"
        className={`fixed top-0 left-0 right-0 z-40 bg-white transition-all duration-300 ${
          isScrolled
            ? 'py-3 sm:py-4 shadow-[0_1px_12px_rgba(0,0,0,0.04)] border-b border-[#F0EAE1]'
            : 'py-4 sm:py-5 border-b border-[#F4EFEA]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          
          {/* Linker spacer (zorgt dat het logo wiskundig perfect in het midden staat) */}
          <div className="w-16 sm:w-20" aria-hidden="true"></div>

          {/* Midden: Het officiële Logo van Golden Light Stories */}
          <a
            href="#"
            className="flex items-center justify-center group focus:outline-none"
            aria-label="Golden Light Stories Fotografie Home"
          >
            <BrandLogo size="md" variant="dark" />
          </a>

          {/* Rechts: Alleen de knop "MENU" - minimalistisch & redactioneel zoals in het voorbeeld */}
          <div className="w-16 sm:w-20 flex justify-end">
            <button
              id="header-menu-button"
              onClick={() => setIsMenuOpen(true)}
              className="text-[11px] sm:text-xs uppercase tracking-[0.26em] font-medium text-[#241C18] hover:text-[#A67C46] transition-colors focus:outline-none py-1 select-none"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
              aria-label="Open menu"
            >
              MENU
            </button>
          </div>

        </div>
      </header>

      {/* 
        LUXE EDITORIAL MENU OVERLAY:
        Opent over het scherm wanneer de bezoeker op MENU klikt
      */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#FAF7F2] text-[#241C18] flex flex-col justify-between animate-in fade-in duration-300 overflow-y-auto">
          
          {/* Menu Top Bar */}
          <div className="max-w-7xl mx-auto w-full px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between border-b border-[#E8DFD5]">
            <div className="w-20" aria-hidden="true"></div>
            
            <a href="#" onClick={() => setIsMenuOpen(false)}>
              <BrandLogo size="sm" variant="dark" />
            </a>

            <div className="w-20 flex justify-end">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-1.5 text-[11px] sm:text-xs uppercase tracking-[0.25em] font-medium text-[#241C18] hover:text-[#A67C46] transition-colors py-1 focus:outline-none"
                style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                aria-label="Sluit menu"
              >
                <span>SLUITEN</span>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Menu Content Links */}
          <div className="max-w-4xl mx-auto w-full px-6 py-10 sm:py-14 flex-1 flex flex-col justify-center text-center">
            <nav className="space-y-4 sm:space-y-6">
              {navLinks.map((link, idx) => (
                <div key={link.name} className="group">
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="font-editorial text-2xl sm:text-4xl lg:text-5xl text-[#241C18] hover:text-[#A67C46] transition-all duration-300 transform group-hover:scale-102 inline-block relative py-1 focus:outline-none"
                    style={{ fontFamily: "'Bodoni Moda', 'Cormorant Garamond', Georgia, serif" }}
                  >
                    {link.name}
                  </button>
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#8C7A6F] opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1">
                    {link.subtitle}
                  </p>
                </div>
              ))}
            </nav>

            {/* Quick Actions in Menu Drawer */}
            <div className="mt-8 sm:mt-10 pt-6 border-t border-[#E8DFD5] space-y-4">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  id="menu-open-brochure-btn"
                  onClick={() => {
                    setIsMenuOpen(false);
                    openBrochure();
                  }}
                  className="flex items-center space-x-2 bg-[#FAF7F2] hover:bg-[#EFE8DE] text-[#241C18] border border-[#D5C7B8] px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all shadow-2xs"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#A67C46]" />
                  <span>Brochure & Tarieven</span>
                </button>

                <button
                  id="menu-open-terms-btn"
                  onClick={() => {
                    setIsMenuOpen(false);
                    openTerms();
                  }}
                  className="flex items-center space-x-2 bg-[#FAF7F2] hover:bg-[#EFE8DE] text-[#241C18] border border-[#D5C7B8] px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all shadow-2xs"
                >
                  <FileText className="w-3.5 h-3.5 text-[#A67C46]" />
                  <span>Algemene Voorwaarden</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    openBookingModal();
                  }}
                  className="flex items-center justify-center space-x-2 bg-[#241C18] hover:bg-[#382B24] text-[#FAF7F2] px-8 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-sm w-full sm:w-auto"
                  style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                >
                  <Calendar className="w-3.5 h-3.5 text-[#DFCCA9]" />
                  <span>Direct Shoot Plannen</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    openPhotographerAdmin('beschikbaarheid');
                  }}
                  className="flex items-center justify-center space-x-2 border border-[#D5C7B8] text-[#5A4D45] hover:bg-[#EFE7DC] hover:text-[#241C18] px-6 py-3 rounded-full text-xs tracking-wider transition-all w-full sm:w-auto"
                >
                  <Settings className="w-3.5 h-3.5 text-[#A67C46]" />
                  <span>Fotograaf Agenda Beheer</span>
                  {bookings.length > 0 && (
                    <span className="bg-[#A67C46] text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                      {bookings.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Menu Footer */}
          <div className="max-w-7xl mx-auto w-full px-6 py-6 border-t border-[#E8DFD5] flex flex-col sm:flex-row items-center justify-between text-xs text-[#705E53] gap-4">
            <div className="flex items-center space-x-4">
              <a
                href={PHOTOGRAPHER_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#241C18] transition-colors flex items-center space-x-1 text-xs"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>@goldenls_photography</span>
              </a>
              <span className="text-[#D0C2B4]">•</span>
              <a
                href={PHOTOGRAPHER_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#241C18] transition-colors flex items-center space-x-1 text-xs"
              >
                <Facebook className="w-3.5 h-3.5" />
                <span>My Looks by N</span>
              </a>
            </div>

            <div className="flex items-center space-x-4 text-[11px]">
              <span className="flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-[#A67C46]" />
                <span>{PHOTOGRAPHER_INFO.travelRadius}</span>
              </span>
              <span>•</span>
              <a href={`mailto:${PHOTOGRAPHER_INFO.email}`} className="hover:text-[#241C18]">
                {PHOTOGRAPHER_INFO.email}
              </a>
            </div>
          </div>

        </div>
      )}
    </>
  );
};
