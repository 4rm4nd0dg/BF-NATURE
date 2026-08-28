import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Portail Administration - Burkina Nature & Culture',
  description: 'Espace d\'administration et de gestion centralisée des parcs nationaux et sites protégés du Burkina Faso',
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
      <body className="bg-harmattan min-h-screen font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
