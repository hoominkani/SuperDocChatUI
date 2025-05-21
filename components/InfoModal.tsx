"use client";

import React from 'react';
import { siteConfig } from '@/config/site';

interface InfoModalProps {
  show: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ show, onClose }) => {
  if (!show) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal show" onClick={handleBackdropClick}>
      <div className="modal-content">
        <h2>{siteConfig.modal.title}</h2>
        {siteConfig.modal.description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        <button className="modal-button" onClick={onClose}>{siteConfig.modal.closeButton}</button>
      </div>
    </div>
  );
};

export default InfoModal;