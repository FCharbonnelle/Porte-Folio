'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
  imageSrc?: string;
}

export default function Modal({ open, onClose, title, children, imageSrc }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const imageControls = useAnimationControls();
  const contentControls = useAnimationControls();
  const titleControls = useAnimationControls();

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
      
      // Animations séquentielles
      if (imageSrc) {
        imageControls.start({
          opacity: 1, 
          y: 0,
          scale: [0.9, 1.05, 1],
          filter: ["blur(10px)", "blur(0px)"],
          transition: { duration: 0.8, delay: 0.4 }
        });
      }
      
      titleControls.start({
        y: 0,
        opacity: 1,
        transition: { 
          duration: 0.5, 
          delay: 0.3,
          type: "spring"
        }
      });
      
      contentControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: 0.7 }
      });
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'visible'; // Réactiver le défilement du corps
    };
  }, [open, onClose, imageSrc, imageControls, contentControls, titleControls]);

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%"
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      borderRadius: "8px",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 25,
        duration: 0.7
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
      transition: { duration: 0.4 }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0, backdropFilter: "blur(0px)" },
    visible: { 
      opacity: 1, 
      backdropFilter: "blur(8px)",
      transition: { duration: 0.4 }
    },
    exit: { 
      opacity: 0, 
      backdropFilter: "blur(0px)",
      transition: { duration: 0.3, delay: 0.1 } 
    }
  };

  const imageWrapperVariants = {
    hover: { 
      scale: 1.03,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
        >
          <motion.div 
            ref={modalRef}
            className="bg-background rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto shadow-card border border-accent-light/60"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            whileHover={{ 
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
          >
            <motion.div 
              className="sticky top-0 bg-background/90 p-4 border-b border-accent-light/30 flex justify-between items-center z-10 backdrop-blur-xs"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <motion.h3 
                className="text-xl font-medium text-accent"
                initial={{ opacity: 0, y: -10 }}
                animate={titleControls}
              >{title}</motion.h3>
              <motion.button 
                onClick={onClose}
                className="text-gray-dark hover:text-accent transition-colors p-2 rounded-full hover:bg-accent/5"
                aria-label="Fermer"
                whileHover={{ rotate: 90, scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
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
                  initial={{ opacity: 0, y: 30 }}
                  animate={imageControls}
                  whileHover="hover"
                  variants={imageWrapperVariants}
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-accent/5">
                    <motion.div
                      className="w-full h-full relative"
                      whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.5 }
                      }}
                    >
                      <Image 
                        src={imageSrc} 
                        alt={title} 
                        fill 
                        className="object-contain"
                        priority
                        unoptimized
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.8 }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              )}
              
              <motion.div 
                className="space-y-4 p-4 bg-background rounded-lg border border-gray-light/70 shadow-soft"
                initial={{ opacity: 0, y: 30 }}
                animate={contentControls}
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.3 }
                }}
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