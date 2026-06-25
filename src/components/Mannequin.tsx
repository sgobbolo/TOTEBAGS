// Mannequin visualization component

import { SCALE_FACTOR } from '../utils/constants';

interface MannequinProps {
  height: number;
}

export const Mannequin = ({ height }: MannequinProps) => {
  const scaledHeight = height * SCALE_FACTOR;

  return (
    <div className="flex flex-col items-center relative">
      <div
        style={{ height: `${scaledHeight}px` }}
        className="relative flex flex-col items-center mannequin-shadow"
      >
        <svg
          width="120"
          height={scaledHeight}
          viewBox={`0 0 120 ${scaledHeight}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Head */}
          <rect x="50" y="0" width="20" height="10" rx="5" fill="#8B5E3C" />
          {/* Body and Arms */}
          <path
            d="M30 15 C30 15 10 20 10 40 C10 80 30 140 30 160 C30 180 40 190 60 190 C80 190 90 180 90 160 C90 140 110 80 110 40 C110 20 90 15 90 15 L30 15Z"
            fill="#8B5E3C"
            fillOpacity="0.9"
          />
          {/* Left Leg */}
          <rect x="35" y="190" width="4" height={scaledHeight - 190} fill="#8B5E3C" fillOpacity="0.8" />
          {/* Right Leg */}
          <rect x="58" y="190" width="4" height={scaledHeight - 190} fill="#8B5E3C" fillOpacity="0.8" />
          {/* Base */}
          <rect x="35" y={scaledHeight - 10} width="50" height="4" rx="2" fill="#8B5E3C" />
        </svg>
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 text-sm font-serif italic text-brand-accent opacity-60 rotate-90">
          {height} CM
        </div>
      </div>
      <p className="mt-10 text-[11px] font-bold tracking-[0.4em] opacity-30 uppercase">
        Manichino
      </p>
    </div>
  );
};
