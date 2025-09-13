import React, { useState } from 'react';
import { Modal } from './index';

const ModalExample: React.FC = () => {
  const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isLargeModalOpen, setIsLargeModalOpen] = useState(false);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Modal Examples</h1>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button onClick={() => setIsBasicModalOpen(true)}>
          Open Basic Modal
        </button>
        <button onClick={() => setIsConfirmModalOpen(true)}>
          Open Confirmation Modal
        </button>
        <button onClick={() => setIsLargeModalOpen(true)}>
          Open Large Modal
        </button>
      </div>

      {/* Basic Modal */}
      <Modal
        isOpen={isBasicModalOpen}
        onClose={() => setIsBasicModalOpen(false)}
        title="Basic Modal"
        size="medium"
      >
        <p>This is a basic modal with some content. You can close it by clicking the X button, pressing Escape, or clicking outside the modal.</p>
        <p>The modal supports keyboard navigation and focus management for accessibility.</p>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Confirm Action"
        size="small"
        closeOnBackdropClick={false}
        footer={
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={() => setIsConfirmModalOpen(false)}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                alert('Action confirmed!');
                setIsConfirmModalOpen(false);
              }}
              style={{
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '4px',
                background: '#ef4444',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </div>
        }
      >
        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
      </Modal>

      {/* Large Modal */}
      <Modal
        isOpen={isLargeModalOpen}
        onClose={() => setIsLargeModalOpen(false)}
        title="Large Modal with Scrollable Content"
        size="large"
      >
        <div>
          <h3>Section 1</h3>
          <p>This is a large modal with lots of content to demonstrate scrolling behavior.</p>
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
              nostrud exercitation ullamco laboris.
            </p>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default ModalExample;
