// Hook for managing fabric cut calculations

import { useMemo } from 'react';
import { FabricCut, ToteDimensions } from '../types';
import { calculateFabricCuts } from '../utils/calculations';

/**
 * Custom hook to calculate and memoize fabric cuts
 */
export const useFabricCuts = (dimensions: ToteDimensions, seamAllowance: number): FabricCut[] => {
  return useMemo(
    () => calculateFabricCuts(dimensions, seamAllowance),
    [dimensions, seamAllowance]
  );
};
