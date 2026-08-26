import QRCode from 'qrcode';

export interface PaymentRequest {
  provider: 'orange_money' | 'moov_money';
  phoneNumber: string;
  amount: number;
  otp?: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  message: string;
  timestamp: string;
}

export async function processMobileMoneyPayment(req: PaymentRequest): Promise<PaymentResponse> {
  // Stub/Mock d'intégration paiement Mobile Money pour Orange Money / Moov Money
  // En production, cette fonction appellerait l'API OM/Moov (ex: CinetPay, Bizao, FedaPay, Direct API)
  
  if (!req.phoneNumber || req.phoneNumber.length < 8) {
    throw new Error('Numéro de téléphone invalide.');
  }

  if (req.amount <= 0) {
    throw new Error('Le montant du paiement doit être supérieur à 0.');
  }

  const prefix = req.provider === 'orange_money' ? 'OM' : 'MOOV';
  const randomTxId = `${prefix}_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;

  return {
    success: true,
    transactionId: randomTxId,
    message: `Paiement de ${req.amount} FCFA effectué avec succès via ${req.provider === 'orange_money' ? 'Orange Money' : 'Moov Money'}.`,
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
