import { Request, Response } from 'express';
import crypto from 'crypto';

export async function handlePaymentWebhook(req: Request, res: Response) {
  try {
    const signatureHeader = req.headers['x-webhook-signature'] as string;
    const webhookSecret = process.env.WEBHOOK_SECRET || 'secret-webhook-key-bf-nature';

    if (!signatureHeader) {
      return res.status(401).json({ error: 'Signature du webhook manquante.' });
    }

    const payload = JSON.stringify(req.body);
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(payload)
      .digest('hex');

    if (!crypto.timingSafeEqual(Buffer.from(signatureHeader), Buffer.from(expectedSignature))) {
      return res.status(403).json({ error: 'Signature du webhook invalide.' });
    }

    const { eventType, reservationId, status } = req.body;

    console.log(`[Webhook Reçu] Evenement: ${eventType}, ID: ${reservationId}, Statut: ${status}`);

    return res.status(200).json({ received: true, status: 'processed' });
  } catch (error) {
    console.error('Erreur webhook:', error);
    return res.status(500).json({ error: 'Erreur lors du traitement du webhook.' });
  }
}
