import React from 'react';
import Modal from '@/components/modal/modal';
import Style from '@/app/index.module.css';
import StyleModal from '@/app/modal.module.css'

const ConfirmModal: React.FC<{ isOpen: boolean, onClose: () => void, onConfirm: (confirm: string) => void }> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={StyleModal.layoutModal}>
        <h2>Confirmation</h2>
        <p>Are you sure you want to proceed?</p>
        <div className={Style.control}>
          <button onClick={() => onConfirm('No')}>No</button>
          <button onClick={() => onConfirm('Yes')}>Yes</button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
