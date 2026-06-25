// Control panel component for ToteScale settings

import { BagStyle } from '../types';
import { BAG_STYLES, HEIGHT_RANGE, SEAM_ALLOWANCE_RANGE } from '../utils/constants';

interface ControlsProps {
  height: number;
  onHeightChange: (height: number) => void;
  style: BagStyle;
  onStyleChange: (style: BagStyle) => void;
  seamAllowance: number;
  onSeamAllowanceChange: (allowance: number) => void;
}

export const Controls = ({
  height,
  onHeightChange,
  style,
  onStyleChange,
  seamAllowance,
  onSeamAllowanceChange,
}: ControlsProps) => {
  return (
    <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-[32px] overflow-hidden shadow-2xl p-8 space-y-10">
      {/* Height Control */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <label className="text-sm font-bold uppercase tracking-widest opacity-60">
            Altezza Persona
          </label>
          <span className="text-3xl font-serif font-bold text-brand-accent">
            {height}
            <span className="text-sm font-sans font-light opacity-40"> cm</span>
          </span>
        </div>
        <input
          type="range"
          min={HEIGHT_RANGE.min}
          max={HEIGHT_RANGE.max}
          value={height}
          onChange={(e) => onHeightChange(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Style Selector */}
      <div className="space-y-6">
        <label className="text-sm font-bold uppercase tracking-widest opacity-60">
          Stile della Borsa
        </label>
        <div className="grid grid-cols-3 bg-brand-secondary bg-opacity-30 p-1 rounded-xl">
          {BAG_STYLES.map((s) => (
            <button
              key={s}
              onClick={() => onStyleChange(s)}
              className={`py-2 rounded-lg text-sm transition-all ${
                style === s
                  ? 'bg-white text-brand-accent shadow-sm'
                  : 'opacity-50'
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Seam Allowance Control */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <label className="text-sm font-bold uppercase tracking-widest opacity-60">
            Margine Cucitura
          </label>
          <span className="text-xl font-serif font-bold text-brand-accent">
            {seamAllowance}
            <span className="text-xs font-sans font-light opacity-40"> cm</span>
          </span>
        </div>
        <input
          type="range"
          min={SEAM_ALLOWANCE_RANGE.min}
          max={SEAM_ALLOWANCE_RANGE.max}
          step={SEAM_ALLOWANCE_RANGE.step}
          value={seamAllowance}
          onChange={(e) => onSeamAllowanceChange(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
};
