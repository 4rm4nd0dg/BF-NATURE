'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Visible après avoir défilé de 250px
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 bg-canopy-deep/95 backdrop-blur-md border-t border-leaf/20 shadow-2xl transition-transform duration-300 transform translate-y-0">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs text-harmattan/80 font-medium">Visitez Bangr-Weoogo</p>
          <p className="text-sm font-bold text-harmattan">Billet d'entrée dès 500 FCFA</p>
        </div>
        <Link
          href="/billetterie"
          className="px-5 py-2.5 bg-baobab hover:bg-baobab/90 text-harmattan font-bold rounded-lg shadow-lg text-sm transition-all transform active:scale-95 flex items-center gap-2"
        >
          <span>🎟️ Réserver</span>
        </Link>
      </div>
    </div>
  );
}
