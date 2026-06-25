// Main App component for ToteScale

import { useState } from 'react';
import { BagStyle } from './types';
import { useToteDimensions } from './hooks/useToteDimensions';
import { useFabricCuts } from './hooks/useFabricCuts';
import { useClipboard } from './hooks/useClipboard';
import { formatFabricCutsText } from './utils/calculations';
import { Header } from './components/Header';
import { Controls } from './components/Controls';
import { Mannequin } from './components/Mannequin';
import { ToteBag } from './components/ToteBag';
import { FabricCalculator } from './components/FabricCalculator';

export const App = () => {
  const [height, setHeight] = useState(170);
  const [style, setStyle] = useState<BagStyle>('standard');
  const [seamAllowance, setSeamAllowance] = useState(1.5);
  const [showFabric, setShowFabric] = useState(false);

  const dimensions = useToteDimensions(height, style);
  const fabricCuts = useFabricCuts(dimensions, seamAllowance);
  const { copied, copy } = useClipboard();

  const handleCopyFabricCuts = () => {
    const text = formatFabricCutsText(fabricCuts);
    copy(text);
  };

  return (
    <div className="p-4 md:p-8 flex flex-col items-center">
      <Header />

      <main className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Panel - Controls */}
        <div className="lg:col-span-4 space-y-8">
          <Controls
            height={height}
            onHeightChange={setHeight}
            style={style}
            onStyleChange={setStyle}
            seamAllowance={seamAllowance}
            onSeamAllowanceChange={setSeamAllowance}
          />

          <button
            onClick={() => setShowFabric(!showFabric)}
            className="w-full py-6 bg-brand-ink text-brand-warm rounded-[24px] shadow-xl text-lg font-serif italic hover:opacity-90 transition-opacity"
          >
            {showFabric ? '🙈 Nascondi Piano di Taglio' : '✂️ Calcola Taglio Tessuto'}
          </button>

          {showFabric && (
            <FabricCalculator
              cuts={fabricCuts}
              copied={copied}
              onCopy={handleCopyFabricCuts}
            />
          )}
        </div>

        {/* Right Panel - Visualization */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center min-h-[850px] bg-white bg-opacity-90 backdrop-blur-md rounded-[48px] border border-white shadow-2xl sartorial-grid">
          <div className="relative flex items-end justify-center gap-24 h-full w-full pt-16">
            <Mannequin height={height} />
            <ToteBag dimensions={dimensions} style={style} />
          </div>
        </div>
      </main>
    </div>
  );
};
