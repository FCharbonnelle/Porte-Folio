'use client';

import React, { useEffect } from 'react';
import { initMouseEffect } from '@/utils/mouseEffect';

export default function MouseEffectProvider({ children }) {
  useEffect(() => {
    // Initialiser l'effet de déformation au survol de la souris
    initMouseEffect();
    
    // Ajouter l'effet de suivi du pointeur pour les overlays
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return <>{children}</>;
} 