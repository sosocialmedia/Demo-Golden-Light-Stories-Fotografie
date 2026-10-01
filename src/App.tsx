import React from 'react';
import { BookingProvider } from './context/BookingContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { IntroStorySection } from './components/IntroStorySection';
import { EditorialPortfolio } from './components/EditorialPortfolio';
import { LoveStoriesSection } from './components/LoveStoriesSection';
import { CalendarSection } from './components/CalendarSection';
import { ClientClosetSection } from './components/ClientClosetSection';
import { AboutSection } from './components/AboutSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { PhotographerAdmin } from './components/PhotographerAdmin';
import { BrochureModal } from './components/BrochureModal';
import { TermsModal } from './components/TermsModal';

export default function App() {
  return (
    <BookingProvider>
      <div className="min-h-screen bg-white text-[#241C18] font-sans selection:bg-[#E8DFD5] selection:text-[#241C18]">
        {/* Header precies zoals voorbeeld: Witte strakke balk met Logo in het midden en alleen MENU rechts */}
        <Navbar />

        <main>
          {/* 1. Cinematic Hero met "The Journey of Love and Life" en pijl */}
          <HeroSection />

          {/* 2. Introductie zoals in Voorbeeld 1: Golden Light Stories Fotografie + Verhaal + Kasteelportret + Bloemenbanner */}
          <IntroStorySection />

          {/* 3. Portfolio zoals in Voorbeeld 2: DISCOVER MY WORK / Portfolio + 5-foto redactionele layout */}
          <EditorialPortfolio />

          {/* 4. Golden Stories: 3x3 Grid met Thema Shoots uit de brochure & "BEKIJK GALLERIJ" */}
          <LoveStoriesSection />

          {/* 5. Agenda: Overzichtelijk, rustig, zonder prijzen en met directe koppeling voor de fotograaf */}
          <CalendarSection />

          {/* 6. Client Closet: Luxe jurken & outfits om gratis te lenen */}
          <ClientClosetSection />

          {/* 7. Over Mij: Het gezicht en hart achter Golden Light Stories */}
          <AboutSection />

          {/* 8. Liefdevolle reacties & ervaringen van koppels en gezinnen */}
          <ReviewsSection />
        </main>

        {/* Footer met logo & Instagram/Facebook links */}
        <Footer />

        {/* Reserveringsmodal zonder prijzen (datum & gegevens) */}
        <BookingModal />

        {/* Fotograaf Agenda Beheer & Koppelen paneel (Google Calendar & iCal) */}
        <PhotographerAdmin />

        {/* Brochure & Investeringsgids Modal */}
        <BrochureModal />

        {/* Algemene Voorwaarden Modal */}
        <TermsModal />
      </div>
    </BookingProvider>
  );
}
