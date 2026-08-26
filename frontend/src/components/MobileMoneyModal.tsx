'use client';

import React, { useState } from 'react';
import { Smartphone, CheckCircle, AlertCircle, Loader2, Lock } from 'lucide-react';

interface MobileMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmPayment: (provider: 'orange_money' | 'moov_money', phone: string) => Promise<void>;
  amount: number;
  title?: string;
}

export const MobileMoneyModal: React.FC<MobileMoneyModalProps> = ({
  isOpen,
  onClose,
  onConfirmPayment,
  amount,
  title = 'Paiement Mobile Money',
}) => {
  const [provider, setProvider] = useState<'orange_money' | 'moov_money'>('orange_money');
  const [phone, setPhone] = useState('70001122');
  const [otpPin, setOtpPin] = useState('1234');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 8) {
      setError('Veuillez saisir un numéro de téléphone valide à 8 chiffres.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      // Simuler le délai de confirmation Mobile Money (OTP / Validation USSD)
      await new Promise((res) => setTimeout(res, 1200));
      await onConfirmPayment(provider, phone);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Le paiement a échoué. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-harmattan border border-sand max-w-md w-full rounded-3xl p-6 md:p-8 shadow-2xl relative text-ink">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-ink-soft hover:text-ink w-8 h-8 rounded-full flex items-center justify-center bg-sand/60"
        >
          ✕
        </button>

        {success ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-leaf/20 text-leaf rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 stroke-[2.5]" />
            </div>
            <h3 className="font-serif font-semibold text-2xl text-canopy mb-2">
              Paiement Confirmé !
            </h3>
            <p className="text-sm text-ink-soft mb-6">
              Votre transaction de <span className="font-semibold text-canopy">{amount.toLocaleString()} FCFA</span> a été validée avec succès.
            </p>
            <button
              onClick={onClose}
              className="bg-canopy text-white w-full py-3 rounded-full font-medium text-sm hover:bg-canopy-deep transition"
            >
              Afficher mon billet &amp; QR Code
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-baobab/10 text-baobab flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-semibold text-xl text-canopy">
                  {title}
                </h3>
                <p className="text-xs text-ink-soft">
                  Montant à régler : <span className="font-semibold text-baobab">{amount.toLocaleString()} FCFA</span>
                </p>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl mb-4 flex items-center gap-2 border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Choix de l'opérateur */}
              <div>
                <label className="block text-xs font-medium text-ink-soft mb-2">
                  Opérateur Mobile Money
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setProvider('orange_money')}
                    className={`py-3 px-4 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 border transition ${
                      provider === 'orange_money'
                        ? 'bg-[#FF6600]/10 border-[#FF6600] text-[#FF6600]'
                        : 'bg-white border-[#E9E1CC] text-ink-soft'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-[#FF6600]" /> Orange Money
                  </button>

                  <button
                    type="button"
                    onClick={() => setProvider('moov_money')}
                    className={`py-3 px-4 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 border transition ${
                      provider === 'moov_money'
                        ? 'bg-[#0055A5]/10 border-[#0055A5] text-[#0055A5]'
                        : 'bg-white border-[#E9E1CC] text-ink-soft'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full bg-[#0055A5]" /> Moov Money
                  </button>
                </div>
              </div>

              {/* Numéro de téléphone */}
              <div>
                <label className="block text-xs font-medium text-ink-soft mb-1">
                  Numéro de téléphone ({provider === 'orange_money' ? 'Orange' : 'Moov'})
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-ink-soft">
                    +226
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="70000000"
                    required
                    className="w-full pl-14 pr-4 py-3 bg-white border border-[#E9E1CC] rounded-2xl text-sm font-medium text-ink focus:outline-none focus:border-canopy"
                  />
                </div>
              </div>

              {/* Code secret / Code OTP Simulation */}
              <div>
                <label className="block text-xs font-medium text-ink-soft mb-1">
                  Code Secret PIN (Simulé)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-ink-soft absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    maxLength={4}
                    value={otpPin}
                    onChange={(e) => setOtpPin(e.target.value)}
                    placeholder="••••"
                    required
                    className="w-full pl-10 pr-4 py-3 bg-white border border-[#E9E1CC] rounded-2xl text-sm font-medium text-ink tracking-widest focus:outline-none focus:border-canopy"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-baobab hover:bg-[#966226] text-white py-3.5 rounded-full font-medium text-sm flex items-center justify-center gap-2 shadow-md transition disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Validation du paiement...
                    </>
                  ) : (
                    `Confirmer & Payer (${amount.toLocaleString()} FCFA)`
                  )}
                </button>
              </div>

              <p className="text-[11px] text-center text-ink-soft mt-3">
                🔒 Transaction sécurisée SSL avec chiffrement de bout en bout.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
