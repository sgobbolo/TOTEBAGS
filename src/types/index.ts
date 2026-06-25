// Types and interfaces for ToteScale application

export interface ToteDimensions {
  width: number;
  height: number;
  handleDrop: number;
}

export interface FabricCut {
  name: string;
  width: number;
  height: number;
  quantity: number;
}

export type BagStyle = 'mini' | 'standard' | 'oversized';

export interface ToteScaleState {
  height: number;
  style: BagStyle;
  seamAllowance: number;
  showFabric: boolean;
  copied: boolean;
}
