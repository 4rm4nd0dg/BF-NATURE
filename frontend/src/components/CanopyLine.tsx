import React from 'react';

interface CanopyLineProps {
  fillColor?: string;
  className?: string;
}

export const CanopyLine: React.FC<CanopyLineProps> = ({ fillColor = '#F7F3E8', className = '' }) => {
  return (
    <svg
      className={`w-full h-auto block relative z-10 ${className}`}
      viewBox="0 0 1180 90"
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M0 90V52C40 40 70 30 100 34C120 20 140 14 165 26C185 10 210 6 235 22C260 8 285 4 310 20C335 6 365 10 385 28C410 14 440 10 465 24C490 12 515 8 540 22C565 8 595 4 620 22C645 8 670 6 695 24C720 10 750 6 775 22C800 8 828 10 850 26C875 12 900 8 925 22C950 10 978 6 1000 22C1030 8 1060 12 1085 28C1110 16 1140 24 1180 30V90H0Z"
        fill={fillColor}
      />
    </svg>
  );
};
