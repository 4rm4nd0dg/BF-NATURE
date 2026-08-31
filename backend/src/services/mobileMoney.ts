import QRCode from 'qrcode';

export interface PaymentRequest {
  provider: 'orange_money' | 'moov_money' | 'wave' | 'coris_money' | 'card';
  phoneNumber?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  amount: number;
  otp?: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  providerLabel: string;
  message: string;
  timestamp: string;
}

export async function processMobileMoneyPayment(req: PaymentRequest): Promise<PaymentResponse> {
  if (req.amount <= 0) {
    throw new Error('Le montant du paiement doit être supérieur à 0 FCFA.');
  }

  let prefix = 'PAY';
  let providerLabel = 'Paiement Sécurisé';

  switch (req.provider) {
    case 'orange_money':
      prefix = 'OM_BF';
      providerLabel = 'Orange Money Burkina Faso';
      if (!req.phoneNumber || req.phoneNumber.length < 8) {
        throw new Error('Veuillez fournir un numéro Orange Money valide à 8 chiffres.');
      }
      break;

    case 'moov_money':
      prefix = 'MOOV_BF';
      providerLabel = 'Moov Money (Moov Africa)';
      if (!req.phoneNumber || req.phoneNumber.length < 8) {
        throw new Error('Veuillez fournir un numéro Moov Money valide à 8 chiffres.');
      }
      break;

    case 'wave':
      prefix = 'WAVE_BF';
      providerLabel = 'Wave Burkina Faso';
      if (!req.phoneNumber || req.phoneNumber.length < 8) {
        throw new Error('Veuillez fournir un numéro Wave valide à 8 chiffres.');
      }
      break;

    case 'coris_money':
      prefix = 'CORIS_BF';
      providerLabel = 'Coris Money';
      if (!req.phoneNumber || req.phoneNumber.length < 8) {
        throw new Error('Veuillez fournir un numéro Coris Money valide à 8 chiffres.');
      }
      break;

    case 'card':
      prefix = 'CARD_VISA';
      providerLabel = 'Carte Bancaire (Visa / Mastercard)';
      if (!req.cardNumber || req.cardNumber.replace(/\s/g, '').length < 15) {
        throw new Error('Numéro de carte bancaire invalide.');
      }
      break;

    default:
      throw new Error('Moyen de paiement non pris en charge.');
  }

  const randomTxId = `${prefix}_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;

  return {
    success: true,
    transactionId: randomTxId,
    providerLabel,
    message: `Paiement de ${req.amount.toLocaleString()} FCFA validé avec succès via ${providerLabel}.`,
    timestamp: new Date().toISOString(),
  };
}

export async function generateTicketQRCodeDataUrl(reservationId: string, siteName: string, visitorCount: number, visitDate: string): Promise<string> {
  const qrData = JSON.stringify({
    resId: reservationId,
    site: siteName,
    qty: visitorCount,
    date: visitDate,
    valid: true,
    issued: new Date().toISOString(),
  });

  try {
    return await QRCode.toDataURL(qrData, {
      errorCorrectionLevel: 'M',
      margin: 2,
      color: {
        dark: '#132B1B',
        light: '#F7F3E8',
      },
    });
  } catch (err) {
    console.error('Erreur de génération du QR Code:', err);
    return `QR_TICKET_${reservationId}`;
  }
}
