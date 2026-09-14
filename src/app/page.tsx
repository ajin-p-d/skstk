import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/public/Hero';
import ScrollStory from '@/components/public/ScrollStory';
import AboutSection from '@/components/public/AboutSection';
import ProgramsSection from '@/components/public/ProgramsSection';
import InstructorsSection from '@/components/public/InstructorsSection';
import GallerySection from '@/components/public/GallerySection';
import ScheduleSection from '@/components/public/ScheduleSection';
import ContactSection from '@/components/public/ContactSection';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-kalari-black text-kalari-white selection:bg-kalari-gold selection:text-kalari-black">
      <Navbar />
      <Hero />
      <ScrollStory />
      <AboutSection />
      <ProgramsSection />
      <InstructorsSection />
      <GallerySection />
      <ScheduleSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
