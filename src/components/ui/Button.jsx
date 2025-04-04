import React from 'react';
import { motion } from 'framer-motion';
import { buttonHover } from '@/utils/animations';

export default function Button({
  children,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ariaLabel,
  ...props
}) {
  const baseClasses = 'inline-block py-3 px-6 rounded-md font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-black text-white hover:bg-gray-900',
    ghost: 'bg-transparent text-black border border-black hover:bg-gray-light',
    accent: 'bg-accent text-black hover:bg-opacity-90',
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel || children}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={buttonHover}
      {...props}
    >
      {children}
    </motion.button>
  );
} 