import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ModalProps, ModalHeaderProps, ModalBodyProps, ModalFooterProps } from './Modal.types';
import './index.css';

const ModalHeader: React.FC<ModalHeaderProps> = ({ 
  title, 
  onClose, 
  showCloseButton = true, 
  className = '' 
}) => (
  <div className={`modal-header ${className}`}>
    {title && <h2 className="modal-title">{title}</h2>}
    {showCloseButton && onClose && (
      <button 
        className="modal-close-button" 
        onClick={onClose}
        aria-label="Close modal"
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
  </div>
);

const ModalBody: React.FC<ModalBodyProps> = ({ children, className = '' }) => (
  <div className={`modal-body ${className}`}>
    {children}
  </div>
);

const ModalFooter: React.FC<ModalFooterProps> = ({ children, className = '' }) => (
  <div className={`modal-footer ${className}`}>
    {children}
  </div>
);

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  footer
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      // Focus the modal
      if (modalRef.current) {
        modalRef.current.focus();
      }
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll
      document.body.style.overflow = '';
      
      // Restore focus to previously focused element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeOnEscape, onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div 
        ref={modalRef}
        className={`modal modal-${size} ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        tabIndex={-1}
      >
        <ModalHeader 
          title={title} 
          onClose={onClose} 
          showCloseButton={showCloseButton}
          className={headerClassName}
        />
        <ModalBody className={bodyClassName}>
          {children}
        </ModalBody>
        {footer && (
          <ModalFooter className={footerClassName}>
            {footer}
          </ModalFooter>
        )}
      </div>
    </div>
  );

  // Render modal in a portal to avoid z-index issues
  return createPortal(modalContent, document.body);
};

export default Modal;
export { ModalHeader, ModalBody, ModalFooter };
export type { ModalProps, ModalHeaderProps, ModalBodyProps, ModalFooterProps };
