'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, TreePine, Ticket, ChevronDown, Landmark, Users } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Fermer le menu déroulant au clic extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isHistoriqueActive = pathname === '/histoire' || pathname === '/personnel';

  return (
    <header className="sticky top-0 z-50 bg-canopy text-harmattan border-b border-white/10 shadow-md transition-all duration-300">
      <div className="max-w-[1180px] mx-auto px-6 py-3.5 flex items-center justify-between">
        
        {/* Logo interactif */}
        <Link
          href="/"
          className="flex items-center gap-3 group transform hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <div className="w-10 h-10 rounded-full bg-leaf flex items-center justify-center text-canopy-deep shadow-md group-hover:rotate-6 transition-transform">
            <TreePine className="w-6 h-6 stroke-[2]" />
          </div>
          <div>
            <div className="font-serif font-bold text-xl text-harmattan tracking-tight leading-none">
              Bangr-Weoogo
            </div>
            <span className="block font-sans font-medium text-[10.5px] uppercase tracking-[0.14em] text-[#C9D8C4] mt-1">
              Parc urbain de Ouagadougou
            </span>
          </div>
        </Link>

        {/* Liens Desktop Dynamiques & Interactifs */}
        <nav className="hidden lg:flex items-center gap-3 font-sans text-[14.5px]">
          {/* Accueil */}
          <Link
            href="/"
            className={`px-3.5 py-1.5 rounded-full font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 ${
              pathname === '/'
                ? 'bg-leaf/30 text-white shadow-inner font-semibold border border-leaf/40'
                : 'text-[#E4EADD] hover:text-white hover:bg-white/10'
            }`}
          >
            Accueil
          </Link>

          {/* Menu Déroulant "Historique" (Contenant Personnel) */}
          <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center gap-1.5 ${
                isHistoriqueActive
                  ? 'bg-leaf/30 text-white shadow-inner font-semibold border border-leaf/40'
                  : 'text-[#E4EADD] hover:text-white hover:bg-white/10'
              }`}
            >
              <span>Historique</span>
              <ChevronDown className={`w-4 h-4 text-leaf transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Card */}
            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-60 bg-canopy-deep/95 backdrop-blur-xl border border-leaf/30 rounded-2xl shadow-2xl p-2 space-y-1 text-sm animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                <Link
                  href="/histoire"
                  onClick={() => setDropdownOpen(false)}
                  className={`flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 transform hover:scale-102 active:scale-95 ${
                    pathname === '/histoire' ? 'bg-leaf/30 text-white font-semibold' : 'text-harmattan hover:bg-white/10'
                  }`}
                >
                  <Landmark className="w-4 h-4 text-leaf flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-xs text-harmattan">Historique du parc</div>
                    <div className="text-[10.5px] text-[#C9D8C4]">De 1932 à nos jours</div>
                  </div>
                </Link>

                <Link
                  href="/personnel"
                  onClick={() => setDropdownOpen(false)}
                  className={`flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 transform hover:scale-102 active:scale-95 ${
                    pathname === '/personnel' ? 'bg-leaf/30 text-white font-semibold' : 'text-harmattan hover:bg-white/10'
                  }`}
                >
                  <Users className="w-4 h-4 text-leaf flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-xs text-harmattan">Personnel & Équipe</div>
                    <div className="text-[10.5px] text-[#C9D8C4]">Guides & agents du parc</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Biodiversité */}
          <Link
            href="/faune-flore"
            className={`px-3.5 py-1.5 rounded-full font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 ${
              pathname === '/faune-flore'
                ? 'bg-leaf/30 text-white shadow-inner font-semibold border border-leaf/40'
                : 'text-[#E4EADD] hover:text-white hover:bg-white/10'
            }`}
          >
            Biodiversité
          </Link>

          {/* Médiathèque */}
          <Link
            href="/mediatheque"
            className={`px-3.5 py-1.5 rounded-full font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 ${
              pathname === '/mediatheque'
                ? 'bg-leaf/30 text-white shadow-inner font-semibold border border-leaf/40'
                : 'text-[#E4EADD] hover:text-white hover:bg-white/10'
            }`}
          >
            Médiathèque
          </Link>

          {/* Billetterie */}
          <Link
            href="/billetterie"
            className={`px-3.5 py-1.5 rounded-full font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 ${
              pathname === '/billetterie'
                ? 'bg-leaf/30 text-white shadow-inner font-semibold border border-leaf/40'
                : 'text-[#E4EADD] hover:text-white hover:bg-white/10'
            }`}
          >
            Billetterie
          </Link>

          {/* Location d'espaces */}
          <Link
            href="/location-espaces"
            className={`px-3.5 py-1.5 rounded-full font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 ${
              pathname === '/location-espaces'
                ? 'bg-leaf/30 text-white shadow-inner font-semibold border border-leaf/40'
                : 'text-[#E4EADD] hover:text-white hover:bg-white/10'
            }`}
          >
            Location d'espaces
          </Link>
        </nav>

        {/* Bouton Action CTA Interactif */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/billetterie"
            className="bg-baobab hover:bg-[#966226] text-white px-5 py-2.5 rounded-full font-sans font-medium text-sm transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md flex items-center gap-2"
          >
            <Ticket className="w-4 h-4" />
            <span>Réserver</span>
          </Link>
        </div>

        {/* Menu Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-harmattan p-2 rounded-xl hover:bg-canopy-deep active:scale-90 transition-transform"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Drawer Mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-canopy-deep px-6 py-6 border-t border-white/10 flex flex-col gap-3 text-sm animate-in slide-in-from-top-2 duration-200">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-harmattan py-2 px-3 rounded-xl hover:bg-white/10 transition-all font-medium border-b border-white/5 active:scale-95"
          >
            Accueil
          </Link>

          {/* Section Historique & Personnel en sous-menu mobile */}
          <div className="py-2 px-3 border-b border-white/5 space-y-2 bg-white/5 rounded-xl">
            <div className="text-xs uppercase font-bold text-leaf tracking-wider">Historique &amp; Équipe</div>
            <Link
              href="/histoire"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-harmattan text-sm pl-2 py-1 hover:text-leaf active:scale-95"
            >
              <Landmark className="w-4 h-4 text-leaf" />
              <span>Historique du parc</span>
            </Link>
            <Link
              href="/personnel"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-harmattan text-sm pl-2 py-1 hover:text-leaf active:scale-95"
            >
              <Users className="w-4 h-4 text-leaf" />
              <span>Personnel &amp; Équipe</span>
            </Link>
          </div>

          <Link
            href="/faune-flore"
            onClick={() => setMobileMenuOpen(false)}
            className="text-harmattan py-2 px-3 rounded-xl hover:bg-white/10 transition-all font-medium border-b border-white/5 active:scale-95"
          >
            Biodiversité
          </Link>

          <Link
            href="/mediatheque"
            onClick={() => setMobileMenuOpen(false)}
            className="text-harmattan py-2 px-3 rounded-xl hover:bg-white/10 transition-all font-medium border-b border-white/5 active:scale-95"
          >
            Médiathèque
          </Link>

          <Link
            href="/billetterie"
            onClick={() => setMobileMenuOpen(false)}
            className="text-harmattan py-2 px-3 rounded-xl hover:bg-white/10 transition-all font-medium border-b border-white/5 active:scale-95"
          >
            Billetterie
          </Link>

          <Link
            href="/location-espaces"
            onClick={() => setMobileMenuOpen(false)}
            className="text-harmattan py-2 px-3 rounded-xl hover:bg-white/10 transition-all font-medium border-b border-white/5 active:scale-95"
          >
            Location d'espaces
          </Link>

          <Link
            href="/billetterie"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-baobab text-white text-center py-3 rounded-full font-medium mt-3 shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            <Ticket className="w-4 h-4" />
            <span>Réserver mon billet</span>
          </Link>
        </div>
      )}
    </header>
  );
};
