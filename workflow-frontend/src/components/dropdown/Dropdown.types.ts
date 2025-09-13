import { ReactNode } from 'react';

export interface DropdownOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  label?: string;
  helperText?: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'outlined' | 'filled';
  searchable?: boolean;
  clearable?: boolean;
  multiple?: boolean;
  maxHeight?: number;
  onChange?: (value: string | number | (string | number)[]) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onSearch?: (query: string) => void;
}
