'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

export function Analytics() {
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-BFNATURE2026';

  useEffect(() => {
    const consent = localStorage.getItem('bf_nature_cookie_consent');
    if (consent === 'true') {
      setConsentGiven(true);
    } else if (consent === 'false') {
      setConsentGiven(false);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('bf_nature_cookie_consent', 'true');
    setConsentGiven(true);
  };

  const declineCookies = () => {
    localStorage.setItem('bf_nature_cookie_consent', 'false');
    setConsentGiven(false);
  };

  return (
    <>
      {consentGiven && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {consentGiven === null && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-canopy-deep text-harmattan p-5 rounded-2xl shadow-2xl border border-leaf/30 z-50 animate-fade-in">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🍪</span>
            <div>
              <h3 className="font-bold text-sm text-harmattan">Gestion de la Confidentialité</h3>
              <p className="text-xs text-harmattan/80 mt-1 leading-relaxed">
                Nous utilisons des cookies analytiques anonymes pour améliorer votre expérience de navigation et la mesure d'audience du parc.
              </p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={acceptCookies}
                  className="px-4 py-2 bg-leaf hover:bg-leaf/90 text-canopy font-bold text-xs rounded-lg transition-colors"
                >
                  Accepter
                </button>
                <button
                  onClick={declineCookies}
                  className="px-4 py-2 bg-sand/20 hover:bg-sand/30 text-harmattan font-medium text-xs rounded-lg transition-colors"
                >
                  Refuser
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
