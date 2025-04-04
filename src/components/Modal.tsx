'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
  imageSrc?: string;
}

export default function Modal({ open, onClose, title, children, imageSrc }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    
    if (open) {
      document.addEventListener('keydown', handleEsc);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Empêcher le défilement du corps
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'visible'; // Réactiver le défilement du corps
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-md animate-fadeIn">
      <div 
        ref={modalRef}
        className="bg-background rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto shadow-card border border-accent-light/60 animate-float"
      >
        <div className="sticky top-0 bg-background/90 p-4 border-b border-accent-light/30 flex justify-between items-center z-10 backdrop-blur-xs">
          <h3 className="text-xl font-medium text-accent">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-dark hover:text-accent transition-colors p-2 rounded-full hover:bg-accent/5"
            aria-label="Fermer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          {imageSrc && (
            <div className="relative mx-auto w-full max-w-[640px] aspect-square mb-6 rounded-lg overflow-hidden border border-accent-light/40 shadow-soft">
              <div className="absolute inset-0 flex items-center justify-center bg-accent/5">
                <Image 
                  src={imageSrc} 
                  alt={title} 
                  fill 
                  className="object-contain"
                  priority
                  unoptimized
                />
              </div>
            </div>
          )}
          
          <div className="space-y-4 p-4 bg-background rounded-lg border border-gray-light/70 shadow-soft">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 