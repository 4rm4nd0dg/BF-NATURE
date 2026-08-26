'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, TreePine, Shield } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="relative z-30 pt-6 pb-2 bg-canopy text-harmattan">
      <div className="max-w-[1180px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-leaf flex items-center justify-center text-canopy-deep shadow-sm transition-transform group-hover:scale-105">
            <TreePine className="w-6 h-6 stroke-[2]" />
          </div>
          <div>
            <div className="font-serif font-semibold text-xl text-harmattan tracking-tight leading-none">
              Bangr-Weoogo
            </div>
            <span className="block font-sans font-medium text-[10.5px] uppercase tracking-[0.14em] text-[#C9D8C4] mt-1">
              Parc urbain de Ouagadougou
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-7 font-sans text-[14.5px]">
          <Link href="/" className="text-[#E4EADD] hover:text-white transition-colors">
            Accueil
          </Link>
          <Link href="/histoire" className="text-[#E4EADD] hover:text-white transition-colors">
            Histoire du parc
          </Link>
          <Link href="/faune-flore" className="text-[#E4EADD] hover:text-white transition-colors">
            Faune &amp; flore
          </Link>
          <Link href="/personnel" className="text-[#E4EADD] hover:text-white transition-colors">
            Personnel
          </Link>
          <Link href="/mediatheque" className="text-[#E4EADD] hover:text-white transition-colors">
            Médiathèque
          </Link>
          <Link href="/billetterie" className="text-[#E4EADD] hover:text-white transition-colors">
            Billetterie
          </Link>
          <Link href="/location-espaces" className="text-[#E4EADD] hover:text-white transition-colors">
            Location d'espaces
          </Link>
        </div>

        {/* Action CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/billetterie"
            className="bg-baobab text-white px-5 py-2.5 rounded-full font-sans font-medium text-sm hover:bg-[#966226] transition-colors shadow-sm"
          >
            Réserver
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-harmattan p-2 rounded-lg hover:bg-canopy-deep transition"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-canopy-deep px-6 py-6 border-t border-white/10 flex flex-col gap-4">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-harmattan py-2 border-b border-white/5"
          >
            Accueil
          </Link>
          <Link
            href="/histoire"
            onClick={() => setMobileMenuOpen(false)}
            className="text-harmattan py-2 border-b border-white/5"
          >
            Histoire du parc
          </Link>
          <Link
            href="/faune-flore"
            onClick={() => setMobileMenuOpen(false)}
            className="text-harmattan py-2 border-b border-white/5"
          >
            Faune &amp; flore
          </Link>
          <Link
            href="/personnel"
            onClick={() => setMobileMenuOpen(false)}
            className="text-harmattan py-2 border-b border-white/5"
          >
            Personnel du parc
          </Link>
          <Link
            href="/mediatheque"
            onClick={() => setMobileMenuOpen(false)}
            className="text-harmattan py-2 border-b border-white/5"
          >
            Médiathèque (Photos &amp; Vidéos)
          </Link>
          <Link
            href="/billetterie"
            onClick={() => setMobileMenuOpen(false)}
            className="text-harmattan py-2 border-b border-white/5"
          >
            Billetterie
          </Link>
          <Link
            href="/location-espaces"
            onClick={() => setMobileMenuOpen(false)}
            className="text-harmattan py-2 border-b border-white/5"
          >
            Location d'espaces
          </Link>
          <Link
            href="/sensibilisation"
            onClick={() => setMobileMenuOpen(false)}
            className="text-harmattan py-2 border-b border-white/5"
          >
            Sensibilisation
          </Link>
          <Link
            href="/billetterie"
            onClick={() => setMobileMenuOpen(false)}
            className="bg-baobab text-white text-center py-3 rounded-full font-medium mt-2"
          >
            Réserver mon billet
          </Link>
        </div>
      )}
    </nav>
  );
};
