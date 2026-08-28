import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: 'Bangr-Weoogo — Burkina Nature & Culture',
  description: 'Plateforme officielle du Parc Urbain Bangr-Weoogo à Ouagadougou, Burkina Faso. Découvrez la faune, la flore, réservez vos billets et louez vos espaces.',
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col antialiased bg-harmattan text-ink">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
