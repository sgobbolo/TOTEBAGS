// Constants and configuration for ToteScale

export const SCALE_FACTOR = 2.5;

export const BAG_STYLES = ['mini', 'standard', 'oversized'] as const;

export const HEIGHT_RANGE = {
  min: 140,
  max: 210,
} as const;

export const SEAM_ALLOWANCE_RANGE = {
  min: 0.5,
  max: 3,
  step: 0.1,
} as const;

export const DEFAULT_HEM = 3;

export const BRAND_COLORS = {
  warm: '#FDF8F3',
  ink: '#3D342D',
  accent: '#C68E74',
  secondary: '#E9DCC9',
  highlight: '#B4C4B4',
  wood: '#8B5E3C',
} as const;

export const DIMENSION_RATIOS = {
  mini: {
    width: 0.15,
    height: 0.14,
    handleDrop: 0.08,
  },
  standard: {
    width: 0.22,
    height: 0.2,
    handleDrop: 0.12,
  },
  oversized: {
    width: 0.28,
    height: 0.25,
    handleDrop: 0.14,
  },
} as const;
