'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  if (typeof window === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <button
        aria-label="Close modal"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-lg rounded-xl bg-white p-5 shadow-xl">
        {title && (
          <div className="mb-4 flex items-start justify-between gap-3">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <button
              className="rounded-md px-2 py-1 text-gray-600 hover:bg-gray-100"
              onClick={onClose}
              type="button"
            >
              ✕
            </button>
          </div>
        )}

        {children}
      </div>
    </div>,
    document.body,
  );
};

