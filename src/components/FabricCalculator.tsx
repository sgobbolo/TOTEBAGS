// Fabric calculator panel component

import { FabricCut } from '../types';
import { formatFabricCutsText } from '../utils/calculations';

interface FabricCalculatorProps {
  cuts: FabricCut[];
  copied: boolean;
  onCopy: () => void;
}

export const FabricCalculator = ({ cuts, copied, onCopy }: FabricCalculatorProps) => {
  return (
    <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-[32px] shadow-2xl p-8 space-y-6 border-t-8 border-brand-highlight">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-serif">Piano di Taglio</h3>
        <button
          onClick={onCopy}
          className="text-brand-accent hover:opacity-80 transition-opacity"
        >
          {copied ? '✓ Copiato!' : '📋 Copia'}
        </button>
      </div>
      {cuts.map((cut, idx) => (
        <div
          key={idx}
          className="p-4 bg-brand-highlight bg-opacity-10 rounded-2xl border border-brand-highlight border-opacity-20"
        >
          <div className="flex justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">
              {cut.name}
            </span>
            <span className="text-[10px] font-bold text-brand-accent">x{cut.quantity}</span>
          </div>
          <div className="text-2xl font-serif text-brand-accent">
            {cut.width.toFixed(1)}
            <span className="text-xs font-sans opacity-30"> cm</span> ×{' '}
            {cut.height.toFixed(1)}
            <span className="text-xs font-sans opacity-30"> cm</span>
          </div>
        </div>
      ))}
    </div>
  );
};
