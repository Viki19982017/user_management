import React from 'react';
import { LabelProps } from './Label.types';
import { LABEL_COLORS, generateColorFromString } from './Label.utils';
import './index.css';

const Label: React.FC<LabelProps> = ({
  children,
  variant = 'default',
  size = 'medium',
  color,
  backgroundColor,
  removable = false,
  disabled = false,
  className = '',
  icon,
  onRemove,
  onClick,
  id
}) => {
  // Determine colors based on props
  const getColors = () => {
    // If custom colors are provided, use them
    if (backgroundColor || color) {
      return {
        background: backgroundColor || '#f3f4f6',
        text: color || '#374151',
        border: backgroundColor ? `${backgroundColor}20` : '#d1d5db'
      };
    }
    
    // If variant is provided, use predefined colors
    if (variant !== 'default' && LABEL_COLORS[variant]) {
      return LABEL_COLORS[variant];
    }
    
    // Generate dynamic color based on content
    if (typeof children === 'string') {
      return generateColorFromString(children);
    }
    
    // Fallback to default
    return LABEL_COLORS.default;
  };

  const colors = getColors();

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && onRemove) {
      onRemove();
    }
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
    
    if (removable && (e.key === 'Delete' || e.key === 'Backspace')) {
      e.preventDefault();
      handleRemove(e as any);
    }
  };

  return (
    <span
      className={`label label-${size} ${disabled ? 'disabled' : ''} ${
        onClick ? 'clickable' : ''
      } ${className}`}
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        borderColor: colors.border
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={onClick && !disabled ? 0 : -1}
      role={onClick ? 'button' : 'text'}
      aria-label={typeof children === 'string' ? children : undefined}
      data-id={id}
    >
      {icon && <span className="label-icon">{icon}</span>}
      
      <span className="label-content">{children}</span>
      
      {removable && (
        <button
          type="button"
          className="label-remove"
          onClick={handleRemove}
          disabled={disabled}
          aria-label="Remove label"
          tabIndex={-1}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M9 3L3 9M3 3L9 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </span>
  );
};

export default Label;
