// ToteBag visualization component

import { ToteDimensions, BagStyle } from '../types';
import { SCALE_FACTOR } from '../utils/constants';

interface ToteBagProps {
  dimensions: ToteDimensions;
  style: BagStyle;
}

export const ToteBag = ({ dimensions, style }: ToteBagProps) => {
  const widthScaled = dimensions.width * SCALE_FACTOR * 0.6;
  const heightScaled = dimensions.handleDrop * SCALE_FACTOR;
  const bagWidth = dimensions.width * SCALE_FACTOR;
  const bagHeight = dimensions.height * SCALE_FACTOR;

  return (
    <div className="flex flex-col items-center relative">
      {/* Handle */}
      <div
        style={{
          width: `${widthScaled}px`,
          height: `${heightScaled}px`,
        }}
        className="border-[4px] border-brand-accent rounded-full mb-3"
      />
      {/* Bag */}
      <div
        style={{
          width: `${bagWidth}px`,
          height: `${bagHeight}px`,
        }}
        className="bg-brand-accent rounded-sm shadow-2xl relative z-10 flex items-center justify-center"
      >
        <div className="absolute bottom-6 left-6 text-white opacity-40 font-serif text-[12px] tracking-[0.3em] italic uppercase">
          Atelier
        </div>
      </div>
      <p className="mt-10 text-[11px] font-bold tracking-[0.4em] text-brand-accent uppercase">
        {style}
      </p>
    </div>
  );
};
