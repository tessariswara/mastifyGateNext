import React from 'react';
import Style from '@/app/modal.module.css'
import StyleIndex from '@/app/index.module.css'

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={Style.overlayModal}>
      <div className={Style.containerModal}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
