// Hook for managing tote bag dimensions

import { useMemo } from 'react';
import { ToteDimensions, BagStyle } from '../types';
import { calculateDimensions } from '../utils/calculations';

/**
 * Custom hook to calculate and memoize tote dimensions
 */
export const useToteDimensions = (height: number, style: BagStyle): ToteDimensions => {
  return useMemo(
    () => calculateDimensions(height, style),
    [height, style]
  );
};
