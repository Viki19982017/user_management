import { ReactNode, InputHTMLAttributes } from 'react';

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  error?: string;
  label?: string;
  helperText?: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'outlined' | 'filled';
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  clearable?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  onEnterPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}
