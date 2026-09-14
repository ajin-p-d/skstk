'use client';

import React, { useRef, useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

export default function Hero() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen bg-kalari-black overflow-hidden"
    >
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <video
          ref={videoRef}
          src="/videos/hero-bg.mp4"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover object-center filter contrast-125 brightness-90"
        />
      </div>

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-kalari-black via-kalari-black/55 to-kalari-black/80 pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-radial-flame opacity-60 pointer-events-none" />

      <div className="absolute top-4 left-4 z-20 hidden sm:block w-12 h-12 border-t-2 border-l-2 border-kalari-gold/40 pointer-events-none" />
      <div className="absolute top-4 right-4 z-20 hidden sm:block w-12 h-12 border-t-2 border-r-2 border-kalari-gold/40 pointer-events-none" />
      <div className="absolute bottom-4 left-4 z-20 hidden sm:block w-12 h-12 border-b-2 border-l-2 border-kalari-gold/40 pointer-events-none" />
      <div className="absolute bottom-4 right-4 z-20 hidden sm:block w-12 h-12 border-b-2 border-r-2 border-kalari-gold/40 pointer-events-none" />

      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center sm:text-left flex flex-col items-center sm:items-start justify-center w-full min-h-screen pt-20 pb-16 sm:pt-0 sm:pb-0">
        <div className="mb-3 sm:mb-4 inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-kalari-darkBrown/85 border border-kalari-gold/40 text-kalari-gold text-[10px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase shadow-gold self-center sm:self-auto">
          <Sparkles className="w-3 h-3 text-kalari-goldLight shrink-0" />
          <span className="truncate">Thulunadan Kalari Tradition</span>
        </div>

        <h1 className="font-serif font-black text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-kalari-white uppercase drop-shadow-2xl mb-4 sm:mb-6 text-gold-gradient select-none leading-none tracking-tight sm:tracking-normal">
          KALARIPAYATTU
        </h1>

        <div className="space-y-2 sm:space-y-3 font-serif max-w-2xl mb-6 sm:mb-10 w-full px-2 text-center sm:text-left">
          <div className="text-base sm:text-2xl md:text-3xl font-light text-kalari-beige tracking-wide sm:tracking-wider">
            The Art of{' '}
            <span className="font-bold text-kalari-gold border-b border-kalari-gold/40 pb-0.5">
              Discipline.
            </span>
          </div>

          <div className="text-base sm:text-2xl md:text-3xl font-light text-kalari-beige tracking-wide sm:tracking-wider">
            The Art of{' '}
            <span className="font-bold text-kalari-gold border-b border-kalari-gold/40 pb-0.5">
              Movement.
            </span>
          </div>

          <div className="text-base sm:text-2xl md:text-3xl font-light text-kalari-beige tracking-wide sm:tracking-wider">
            The Art of{' '}
            <span className="font-bold text-kalari-gold border-b border-kalari-gold/40 pb-0.5">
              Survival.
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 z-30 w-full max-w-full justify-center sm:justify-start px-0 sm:px-0">
          <a
            href="#story"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg gold-gradient-bg text-kalari-black font-serif font-bold text-xs sm:text-sm tracking-widest uppercase hover:brightness-110 shadow-gold text-center transition-all duration-300"
          >
            Experience The Journey
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg bg-kalari-black/80 border border-kalari-gold/50 text-kalari-beige hover:text-kalari-gold hover:border-kalari-gold font-serif font-medium text-xs sm:text-sm tracking-widest uppercase backdrop-blur text-center transition-all duration-300"
          >
            Join Our Kalari
          </a>
        </div>
      </div>

      <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 z-30 flex items-center">
        <button
          onClick={toggleSound}
          className="p-2.5 sm:p-3 rounded-full bg-kalari-darkBrown/90 border border-kalari-gold/40 text-kalari-gold hover:bg-kalari-gold hover:text-kalari-black transition-all shadow-gold"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          aria-label="Toggle Sound"
        >
          {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
        </button>
      </div>
    </section>
  );
}
