'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

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
    <AnimatePresence>
      {open && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            ref={modalRef}
            className="bg-background rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto shadow-card border border-accent-light/60"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              delay: 0.1
            }}
          >
            <motion.div 
              className="sticky top-0 bg-background/90 p-4 border-b border-accent-light/30 flex justify-between items-center z-10 backdrop-blur-xs"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <h3 className="text-xl font-medium text-accent">{title}</h3>
              <motion.button 
                onClick={onClose}
                className="text-gray-dark hover:text-accent transition-colors p-2 rounded-full hover:bg-accent/5"
                aria-label="Fermer"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </motion.div>
            
            <div className="p-6">
              {imageSrc && (
                <motion.div 
                  className="relative mx-auto w-full max-w-[640px] aspect-square mb-6 rounded-lg overflow-hidden border border-accent-light/40 shadow-soft"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-accent/5">
                    <motion.div
                      className="w-full h-full relative"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
                    >
                      <Image 
                        src={imageSrc} 
                        alt={title} 
                        fill 
                        className="object-contain"
                        priority
                        unoptimized
                      />
                    </motion.div>
                  </div>
                </motion.div>
              )}
              
              <motion.div 
                className="space-y-4 p-4 bg-background rounded-lg border border-gray-light/70 shadow-soft"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                {children}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 