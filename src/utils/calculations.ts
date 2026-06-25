// Business logic for ToteScale calculations

import { ToteDimensions, FabricCut, BagStyle } from '../types';
import { DIMENSION_RATIOS, DEFAULT_HEM } from './constants';

/**
 * Calculate bag dimensions based on height and style
 */
export const calculateDimensions = (
  height: number,
  style: BagStyle
): ToteDimensions => {
  const ratios = DIMENSION_RATIOS[style];
  
  return {
    width: Math.round(height * ratios.width),
    height: Math.round(height * ratios.height),
    handleDrop: Math.round(height * ratios.handleDrop),
  };
};

/**
 * Calculate fabric cuts based on bag dimensions and seam allowance
 */
export const calculateFabricCuts = (
  dimensions: ToteDimensions,
  seamAllowance: number
): FabricCut[] => {
  const { width, height: bagHeight, handleDrop } = dimensions;
  const sa = seamAllowance;
  const hem = DEFAULT_HEM;

  return [
    {
      name: 'Pannelli Principali',
      width: width + sa * 2,
      height: bagHeight + sa + hem,
      quantity: 2,
    },
    {
      name: 'Manici',
      width: 8,
      height: handleDrop * 2.5 + sa * 2,
      quantity: 2,
    },
  ];
};

/**
 * Format fabric cuts for copying to clipboard
 */
export const formatFabricCutsText = (cuts: FabricCut[]): string => {
  return cuts
    .map((c) => `${c.name}: ${c.width.toFixed(1)} x ${c.height.toFixed(1)} cm (x${c.quantity})`)
    .join('\n');
};
