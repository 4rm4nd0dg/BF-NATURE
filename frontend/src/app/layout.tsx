import type { Metadata, Viewport } from 'next';
import { Fraunces, Work_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { StickyMobileCTA } from '../components/StickyMobileCTA';
import { Analytics } from '../components/Analytics';
import { PwaRegister } from '../components/PwaRegister';

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-fraunces',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-work-sans',
});

export const viewport: Viewport = {
  themeColor: '#1E4029',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: {
    default: 'Parc Urbain Bangr-Weoogo — Burkina Nature & Culture',
    template: '%s | Bangr-Weoogo',
  },
  description:
    'Plateforme officielle du Parc Urbain Bangr-Weoogo à Ouagadougou, Burkina Faso. Découvrez la faune, la flore, réservez vos billets en ligne et louez vos espaces événementiels.',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Bangr-Weoogo',
  },
  applicationName: 'Bangr-Weoogo',
  keywords: [
    'Bangr-Weoogo',
    'Parc Urbain Ouagadougou',
    'Burkina Faso',
    'Faune Flore Burkina',
    'Billetterie Parc',
    'Crocodile sacré',
    'Tourisme écologique',
  ],
  authors: [{ name: 'Direction du Parc Bangr-Weoogo' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://bangrweoogo.bf'),
  openGraph: {
    title: 'Parc Urbain Bangr-Weoogo — Burkina Nature & Culture',
    description:
      'Sanctuaire naturel et poumon vert de Ouagadougou. Réservez vos billets en ligne et découvrez la biodiversité du Burkina Faso.',
    url: 'https://bangrweoogo.bf',
    siteName: 'Bangr-Weoogo',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Parc Urbain Bangr-Weoogo à Ouagadougou',
      },
    ],
    locale: 'fr_BF',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parc Urbain Bangr-Weoogo',
    description: 'Poumon vert de Ouagadougou. Réservez votre visite et découvrez notre biodiversité.',
    images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Park', 'TouristAttraction', 'LocalBusiness'],
  name: 'Parc Urbain Bangr-Weoogo',
  description:
    'Forêt classée et parc urbain de 265 hectares situé à Ouagadougou, Burkina Faso. Sanctuaire de faune et flore.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ouagadougou',
    addressRegion: 'Kadiogo',
    addressCountry: 'BF',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 12.3914,
    longitude: -1.4981,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '06:00',
      closes: '18:30',
    },
  ],
  priceRange: '250 FCFA - 500 FCFA',
  telephone: '+226 25 30 00 00',
  url: 'https://bangrweoogo.bf',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${workSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-harmattan text-ink pb-16 md:pb-0">
        <a href="#contenu" className="skip-link">Aller au contenu principal</a>
        <Navbar />
        <main id="contenu" className="flex-grow">{children}</main>
        <Footer />
        <StickyMobileCTA />
        <Analytics />
        <PwaRegister />
      </body>
    </html>
  );
}
