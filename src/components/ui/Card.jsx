import React from 'react';
import { motion } from 'framer-motion';

export default function Card({
  children,
  className = '',
  animated = true,
  padding = 'medium',
  shadow = 'medium'
}) {
  const paddings = {
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8',
  };
  
  const shadows = {
    none: '',
    small: 'shadow-sm',
    medium: 'shadow-md',
    large: 'shadow-lg',
  };
  
  const baseClasses = `rounded-lg bg-white ${paddings[padding]} ${shadows[shadow]} transition-all`;
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    hover: {
      y: -5,
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };
  
  if (animated) {
    return (
      <motion.div
        className={`${baseClasses} ${className}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '0px 0px -100px 0px' }}
        whileHover="hover"
        variants={cardVariants}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  );
} 