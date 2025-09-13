import { ReactNode } from 'react';

export type LabelVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
export type LabelSize = 'small' | 'medium' | 'large';

export interface LabelProps {
  children: ReactNode;
  variant?: LabelVariant;
  size?: LabelSize;
  color?: string;
  backgroundColor?: string;
  removable?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
  onRemove?: () => void;
  onClick?: () => void;
  id?: string | number;
}

export interface LabelColorConfig {
  background: string;
  text: string;
  border?: string;
}

export interface DynamicColorOptions {
  saturation?: number;
  lightness?: number;
  alpha?: number;
}
