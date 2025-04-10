'use client';

import React, { useEffect, useRef, useState } from 'react';
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
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        e.stopPropagation();
        onClose();
      }
    };
    
    if (open) {
      document.addEventListener('keydown', handleEsc);
      document.addEventListener('mouseup', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mouseup', handleClickOutside);
      document.body.style.overflow = 'visible';
      setImageLoaded(false);
    };
  }, [open, onClose]);

  const handleImageLoad = (e: any) => {
    setImageLoaded(true);
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl bg-black/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <motion.div 
            ref={modalRef}
            className="bg-background/80 rounded-xl w-[80%] h-[80vh] overflow-hidden border border-accent/30 shadow-[0_0_30px_rgba(var(--color-accent-rgb),0.2)]"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              delay: 0.1
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row h-full">
              {/* Partie image */}
              {imageSrc && (
                <motion.div 
                  className="relative bg-background/80 flex-shrink-0 w-full md:w-[60%] h-[50%] md:h-full flex items-start justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: imageLoaded ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative w-full h-full">
                    <Image 
                      src={imageSrc} 
                      alt={title}
                      fill
                      sizes="(max-width: 768px) 80vw, 50vw"
                      className="object-contain object-left"
                      priority
                      unoptimized
                      onLoad={handleImageLoad}
                    />
                  </div>
                  
                  {/* Bouton de fermeture */}
                  <motion.button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white z-10"
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(var(--color-accent-rgb), 0.5)' }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.button>
                </motion.div>
              )}
              
              {/* Partie contenu */}
              <motion.div 
                className="w-full md:w-[40%] overflow-auto p-5 md:p-8 bg-background/90 h-[50%] md:h-full"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <motion.h3 
                  className="text-2xl md:text-3xl font-bold text-accent mb-6"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {title}
                </motion.h3>
                
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 