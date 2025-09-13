import React, { useState, useRef, forwardRef } from 'react';
import { TextInputProps } from './TextInput.types';
import './index.css';

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({
  value,
  defaultValue,
  placeholder,
  disabled = false,
  required = false,
  readOnly = false,
  error,
  label,
  helperText,
  className = '',
  size = 'medium',
  variant = 'default',
  type = 'text',
  leftIcon,
  rightIcon,
  clearable = false,
  maxLength,
  showCharCount = false,
  autoComplete,
  autoFocus = false,
  onChange,
  onFocus,
  onBlur,
  onClear,
  onEnterPress,
  ...rest
}, ref) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const actualRef = ref || inputRef;

  const currentValue = value !== undefined ? value : internalValue;
  const isControlled = value !== undefined;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    onChange?.(newValue, event);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  const handleClear = () => {
    const newValue = '';
    
    if (!isControlled) {
      setInternalValue(newValue);
    }
    
    if (actualRef && typeof actualRef !== 'function') {
      actualRef.current?.focus();
    }
    
    onClear?.();
    onChange?.(newValue, {} as React.ChangeEvent<HTMLInputElement>);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onEnterPress?.(event);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;
  const hasValue = currentValue && currentValue.length > 0;
  const charCount = currentValue ? currentValue.length : 0;

  return (
    <div className={`textinput-container ${className}`}>
      {label && (
        <label className={`textinput-label ${required ? 'required' : ''}`}>
          {label}
        </label>
      )}
      
      <div
        className={`textinput textinput-${size} textinput-${variant} ${
          disabled ? 'disabled' : ''
        } ${error ? 'error' : ''} ${isFocused ? 'focused' : ''} ${
          readOnly ? 'readonly' : ''
        }`}
      >
        {leftIcon && (
          <div className="textinput-left-icon">
            {leftIcon}
          </div>
        )}
        
        <input
          ref={actualRef}
          type={inputType}
          value={currentValue}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          maxLength={maxLength}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          className="textinput-field"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          aria-invalid={!!error}
          aria-describedby={
            error ? 'textinput-error' : helperText ? 'textinput-helper' : undefined
          }
          {...rest}
        />
        
        <div className="textinput-actions">
          {type === 'password' && (
            <button
              type="button"
              className="textinput-password-toggle"
              onClick={togglePasswordVisibility}
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M9.88 9.88C9.56 10.2 9.12 10.4 8.64 10.4C7.68 10.4 6.88 9.6 6.88 8.64C6.88 8.16 7.08 7.72 7.4 7.4M12.16 12.16C11.04 13.04 9.6 13.6 8 13.6C4.8 13.6 2.08 11.52 1.6 8.64C2 7.36 2.72 6.24 3.68 5.36M6.4 2.88C6.92 2.72 7.44 2.64 8 2.64C11.2 2.64 13.92 4.72 14.4 7.6C14.16 8.48 13.76 9.28 13.2 9.96M9.88 6.12C9.56 5.8 9.12 5.6 8.64 5.6C7.68 5.6 6.88 6.4 6.88 7.36C6.88 7.84 7.08 8.28 7.4 8.6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1.6 1.6L14.4 14.4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M1.6 8C2.08 4.8 4.8 2.4 8 2.4C11.2 2.4 13.92 4.8 14.4 8C13.92 11.2 11.2 13.6 8 13.6C4.8 13.6 2.08 11.2 1.6 8Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 10.4C9.32 10.4 10.4 9.32 10.4 8C10.4 6.68 9.32 5.6 8 5.6C6.68 5.6 5.6 6.68 5.6 8C5.6 9.32 6.68 10.4 8 10.4Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          )}
          
          {clearable && hasValue && !disabled && !readOnly && (
            <button
              type="button"
              className="textinput-clear"
              onClick={handleClear}
              tabIndex={-1}
              aria-label="Clear input"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M12 4L4 12M4 4L12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
          
          {rightIcon && (
            <div className="textinput-right-icon">
              {rightIcon}
            </div>
          )}
        </div>
      </div>

      <div className="textinput-footer">
        {(error || helperText) && (
          <div
            className={`textinput-helper ${error ? 'error' : ''}`}
            id={error ? 'textinput-error' : 'textinput-helper'}
          >
            {error || helperText}
          </div>
        )}
        
        {showCharCount && maxLength && (
          <div className="textinput-char-count">
            {charCount}/{maxLength}
          </div>
        )}
      </div>
    </div>
  );
});

TextInput.displayName = 'TextInput';

export default TextInput;
