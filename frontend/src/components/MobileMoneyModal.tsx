'use client';

import React from 'react';
import { PaymentModal, PaymentDetails, PaymentProvider } from './PaymentModal';

interface MobileMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmPayment: (provider: 'orange_money' | 'moov_money' | 'wave' | 'coris_money' | 'card', phone: string) => Promise<void>;
  amount: number;
  title?: string;
}

export const MobileMoneyModal: React.FC<MobileMoneyModalProps> = ({
  isOpen,
  onClose,
  onConfirmPayment,
  amount,
  title = 'Paiement Sécurisé',
}) => {
  const handleConfirm = async (details: PaymentDetails) => {
    await onConfirmPayment(details.provider, details.phoneNumber || '70001122');
  };

  return (
    <PaymentModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirmPayment={handleConfirm}
      amount={amount}
      title={title}
    />
  );
};
