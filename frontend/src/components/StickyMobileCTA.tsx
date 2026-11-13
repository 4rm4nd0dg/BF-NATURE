'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Ticket } from 'lucide-react';

export function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      // Visible après avoir défilé de 350px
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ne pas afficher sur la page de billetterie elle-même
  if (!isVisible || pathname.startsWith('/billetterie')) return null;

  return (
    <aside
      aria-label="Accès rapide billetterie"
      className="md:hidden fixed bottom-[calc(4rem+env(safe-area-inset-bottom,0px))] left-0 right-0 z-30 px-4 py-2.5 bg-canopy-deep/95 backdrop-blur-md border-t border-leaf/20 shadow-xl transition-transform duration-300 transform translate-y-0 animate-in fade-in slide-in-from-bottom-2"
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="min-w-0">
          <p className="text-[11px] text-[#C9D8C4] font-medium truncate">Tarif visiteur</p>
          <p className="text-xs font-bold text-harmattan truncate">Entrée dès 500 FCFA</p>
        </div>
        <Link
          href="/billetterie"
          className="min-h-[44px] px-4 py-2 bg-baobab hover:bg-baobab/90 text-white font-bold rounded-xl shadow-md text-xs transition-all transform active:scale-95 flex items-center gap-1.5 shrink-0"
        >
          <Ticket className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Réserver</span>
        </Link>
      </div>
    </aside>
  );
}
