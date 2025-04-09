import React from 'react';
import { motion } from 'framer-motion';

export default function Card({
  children,
  className = '',
  animated = true,
  padding = 'medium',
  shadow = 'medium',
  radius = 'medium',
  hover = true
}) {
  const paddings = {
    small: 'p-3 sm:p-4',
    medium: 'p-4 sm:p-5 md:p-6',
    large: 'p-5 sm:p-6 md:p-7 lg:p-8',
    none: 'p-0'
  };
  
  const shadows = {
    none: '',
    small: 'shadow-sm',
    medium: 'shadow-md',
    large: 'shadow-lg',
    xl: 'shadow-xl'
  };
  
  const radiuses = {
    none: 'rounded-none',
    small: 'rounded',
    medium: 'rounded-lg',
    large: 'rounded-xl',
    full: 'rounded-full'
  };
  
  const baseClasses = `bg-white ${paddings[padding]} ${shadows[shadow]} ${radiuses[radius]} transition-all duration-300`;
  
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
    hover: hover ? {
      y: -5,
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    } : {}
  };
  
  if (animated) {
    return (
      <motion.div
        className={`${baseClasses} ${className}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '0px 0px -100px 0px' }}
        whileHover={hover ? "hover" : undefined}
        variants={cardVariants}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <div className={`${baseClasses} ${className} ${hover ? 'hover:-translate-y-1 hover:shadow-lg' : ''}`}>
      {children}
    </div>
  );
} 