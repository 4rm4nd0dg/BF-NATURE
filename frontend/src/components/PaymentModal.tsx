'use client';

import React, { useState } from 'react';
import { Smartphone, CheckCircle, AlertCircle, Loader2, Lock, CreditCard, ShieldCheck, ArrowRight } from 'lucide-react';

export type PaymentProvider = 'orange_money' | 'moov_money' | 'wave' | 'coris_money' | 'card';

export interface PaymentDetails {
  provider: PaymentProvider;
  phoneNumber?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmPayment: (details: PaymentDetails) => Promise<void>;
  amount: number;
  title?: string;
  itemDescription?: string;
}

// Official Payment Provider Logos referencing /images/paiement/
export const PaymentProviderLogos: Record<
  PaymentProvider,
  { name: string; subtitle: string; logoUrl: string; color: string; bg: string; border: string }
> = {
  orange_money: {
    name: 'Orange Money',
    subtitle: 'Burkina Faso (*144#)',
    color: 'text-[#FF6600]',
    bg: 'bg-[#FF6600]/10',
    border: 'border-[#FF6600]',
    logoUrl: '/images/paiement/orange-money.svg',
  },
  moov_money: {
    name: 'Moov Money',
    subtitle: 'Moov Africa (*555#)',
    color: 'text-[#0055A5]',
    bg: 'bg-[#0055A5]/10',
    border: 'border-[#0055A5]',
    logoUrl: '/images/paiement/moov-money.svg',
  },
  wave: {
    name: 'Wave Burkina',
    subtitle: 'Transferts sans frais',
    color: 'text-[#00C3E7]',
    bg: 'bg-[#00C3E7]/10',
    border: 'border-[#00C3E7]',
    logoUrl: '/images/paiement/wave.svg',
  },
  coris_money: {
    name: 'Coris Money',
    subtitle: 'Coris Bank (*226#)',
    color: 'text-[#007A3D]',
    bg: 'bg-[#007A3D]/10',
    border: 'border-[#007A3D]',
    logoUrl: '/images/paiement/coris-money.svg',
  },
  card: {
    name: 'Carte Bancaire',
    subtitle: 'Visa / Mastercard',
    color: 'text-[#1A1F71]',
    bg: 'bg-[#1A1F71]/10',
    border: 'border-[#1A1F71]',
    logoUrl: '/images/paiement/carte-bancaire.svg',
  },
};

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onConfirmPayment,
  amount,
  title = 'Paiement Sécurisé Bangr-Weoogo',
  itemDescription,
}) => {
  const [provider, setProvider] = useState<PaymentProvider>('orange_money');
  const [phone, setPhone] = useState('70001122');
  const [cardNumber, setCardNumber] = useState('4532 1234 5678 9012');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('321');
  const [otpPin, setOtpPin] = useState('1234');

  const [loading, setLoading] = useState(false);
  const [apiStep, setApiStep] = useState<string>('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (provider !== 'card' && (!phone || phone.length < 8)) {
      setError('Veuillez saisir un numéro de téléphone valide à 8 chiffres.');
      return;
    }

    if (provider === 'card' && cardNumber.replace(/\s/g, '').length < 15) {
      setError('Numéro de carte bancaire invalide.');
      return;
    }

    setLoading(true);

    try {
      setApiStep('Connexion sécurisée aux serveurs de paiement...');
      await new Promise((res) => setTimeout(res, 600));

      if (provider !== 'card') {
        setApiStep(`Envoi du prompt USSD / OTP vers +226 ${phone}...`);
        await new Promise((res) => setTimeout(res, 800));
        setApiStep('Confirmation du code PIN et débit du solde...');
      } else {
        setApiStep('Vérification 3D Secure & Autorisation bancaire...');
      }
      await new Promise((res) => setTimeout(res, 800));

      await onConfirmPayment({
        provider,
        phoneNumber: phone,
        cardNumber,
        cardExpiry,
        cardCvc,
      });

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Le paiement a été refusé. Veuillez réessayer.');
    } finally {
      setLoading(false);
      setApiStep('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fadeIn">
      <div className="bg-harmattan border border-[#E9E1CC] max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl relative text-ink overflow-hidden">
        {/* Header Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-ink-soft hover:text-ink w-9 h-9 rounded-full flex items-center justify-center bg-sand border border-[#DED2B4] transition"
        >
          ✕
        </button>

        {success ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-leaf/20 text-leaf rounded-full flex items-center justify-center mx-auto mb-4 border border-leaf/30 shadow-inner">
              <CheckCircle className="w-10 h-10 stroke-[2.5]" />
            </div>
            <h3 className="font-serif font-semibold text-2xl text-canopy mb-2">
              Paiement Confirmé !
            </h3>
            <p className="text-xs sm:text-sm text-ink-soft mb-6 max-w-sm mx-auto leading-relaxed">
              Votre transaction de <span className="font-bold text-baobab font-mono">{amount.toLocaleString()} FCFA</span> a été validée via <strong className="text-canopy">{PaymentProviderLogos[provider].name}</strong>.
            </p>

            <div className="bg-sand/80 p-4 rounded-2xl border border-[#DED2B4] text-xs text-left mb-6 space-y-2">
              <div className="flex justify-between">
                <span className="text-ink-soft">Référence Transaction :</span>
                <span className="font-mono font-semibold text-canopy">TX-{Date.now().toString().slice(-8)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-soft">Mode de Paiement :</span>
                <span className="font-medium text-ink flex items-center gap-1.5">
                  <img src={PaymentProviderLogos[provider].logoUrl} alt={provider} className="h-4 w-auto object-contain" />
                  {PaymentProviderLogos[provider].name}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#DED2B4]">
                <span className="text-ink-soft">Statut Quittance :</span>
                <span className="font-semibold text-leaf flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> PAYÉ &amp; ACQUITTÉ
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="bg-canopy text-white w-full py-3.5 rounded-full font-medium text-sm hover:bg-canopy-deep transition shadow-md"
            >
              Fermer &amp; Obtenir mon Récépissé Officiel
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-baobab/10 text-baobab flex items-center justify-center flex-shrink-0 border border-baobab/20">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-semibold text-xl text-canopy">
                  {title}
                </h3>
                {itemDescription && (
                  <p className="text-xs text-ink-soft line-clamp-1">{itemDescription}</p>
                )}
                <p className="text-xs font-medium text-ink-soft mt-0.5">
                  Montant total : <span className="font-serif font-bold text-baobab text-base">{amount.toLocaleString()} FCFA</span>
                </p>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 text-xs p-3.5 rounded-2xl mb-4 flex items-center gap-2.5 border border-red-200 shadow-sm">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span className="leading-snug">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Choix de l'opérateur avec logos officiels */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2.5">
                  Sélectionnez votre moyen de paiement
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {(Object.keys(PaymentProviderLogos) as PaymentProvider[]).map((key) => {
                    const item = PaymentProviderLogos[key];
                    const isSelected = provider === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setProvider(key)}
                        className={`p-3 rounded-2xl text-left border transition flex flex-col justify-between ${
                          isSelected
                            ? `${item.bg} ${item.border} ring-2 ring-canopy/20 shadow-sm`
                            : 'bg-white border-[#E9E1CC] hover:bg-sand/60'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <img
                            src={item.logoUrl}
                            alt={item.name}
                            className="h-7 w-auto max-w-[70px] object-contain rounded"
                          />
                          <span className={`w-3 h-3 rounded-full border ${isSelected ? 'bg-canopy border-canopy' : 'border-gray-300'}`} />
                        </div>
                        <div className="mt-2">
                          <div className={`text-xs font-bold ${isSelected ? 'text-canopy-deep' : 'text-ink'}`}>
                            {item.name}
                          </div>
                          <div className="text-[10px] text-ink-soft line-clamp-1">{item.subtitle}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Formulaire dynamique */}
              {provider !== 'card' ? (
                <div className="bg-white p-4 rounded-2xl border border-[#E9E1CC] space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-ink-soft mb-1">
                      Numéro de Téléphone {PaymentProviderLogos[provider].name}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-canopy bg-sand px-2 py-0.5 rounded border border-[#DED2B4]">
                        +226
                      </span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="70000000"
                        required
                        className="w-full pl-20 pr-4 py-3 bg-harmattan/50 border border-[#E9E1CC] rounded-xl text-sm font-semibold text-ink focus:outline-none focus:border-canopy"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-ink-soft mb-1 flex items-center justify-between">
                      <span>Code Secret PIN / Validation OTP</span>
                      <span className="text-[10px] text-leaf font-medium">Simulation API</span>
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
                        className="w-full pl-10 pr-4 py-3 bg-harmattan/50 border border-[#E9E1CC] rounded-xl text-sm font-semibold text-ink tracking-widest focus:outline-none focus:border-canopy"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-4 rounded-2xl border border-[#E9E1CC] space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-ink-soft mb-1">
                      Numéro de Carte Bancaire (Visa / Mastercard)
                    </label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-ink-soft absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4532 0000 0000 0000"
                        required
                        className="w-full pl-10 pr-4 py-3 bg-harmattan/50 border border-[#E9E1CC] rounded-xl text-sm font-mono text-ink focus:outline-none focus:border-canopy"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-ink-soft mb-1">
                        Expiration (MM/YY)
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="12/28"
                        required
                        className="w-full px-3 py-2.5 bg-harmattan/50 border border-[#E9E1CC] rounded-xl text-xs font-mono text-ink text-center focus:outline-none focus:border-canopy"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-ink-soft mb-1">
                        Cryptogramme CVC
                      </label>
                      <input
                        type="password"
                        maxLength={3}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="123"
                        required
                        className="w-full px-3 py-2.5 bg-harmattan/50 border border-[#E9E1CC] rounded-xl text-xs font-mono text-ink text-center focus:outline-none focus:border-canopy"
                      />
                    </div>
                  </div>
                </div>
              )}

              {loading && (
                <div className="p-3 bg-canopy/10 border border-canopy/20 rounded-xl flex items-center gap-3 text-xs text-canopy font-medium animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin text-canopy shrink-0" />
                  <span>{apiStep || 'Communication avec l\'opérateur en cours...'}</span>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-baobab hover:bg-[#966226] text-white py-3.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition disabled:opacity-50"
                >
                  {loading ? (
                    'Traitement du paiement...'
                  ) : (
                    <>
                      Confirmer &amp; Payer {amount.toLocaleString()} FCFA <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-ink-soft pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-leaf" />
                <span>Paiement sécurisé crypté — Parc Urbain Bangr-Weoogo</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
