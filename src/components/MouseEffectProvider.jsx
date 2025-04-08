'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MouseEffectContext = createContext();

export const useMouseEffect = () => useContext(MouseEffectContext);

export default function MouseEffectProvider({ children }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorEnlarged, setCursorEnlarged] = useState(false);
  const [cursorColor, setCursorColor] = useState("#7e3afd");
  const [particles, setParticles] = useState([]);

  // Suivre la position de la souris
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Ajouter une particule de manière aléatoire
      if (Math.random() > 0.92) {
        const newParticle = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 8 + 2,
          color: getRandomColor(),
          lifespan: Math.random() * 1000 + 500 // Durée de vie entre 500ms et 1500ms
        };
        
        setParticles(prev => [...prev, newParticle]);
        
        // Nettoyer les particules après leur durée de vie
        setTimeout(() => {
          setParticles(prev => prev.filter(p => p.id !== newParticle.id));
        }, newParticle.lifespan);
      }
    };

    const handleMouseEnter = () => {
      setCursorVisible(true);
    };

    const handleMouseLeave = () => {
      setCursorVisible(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Gérer les interactions avec les éléments
  useEffect(() => {
    const handleMouseDown = () => {
      setCursorEnlarged(true);
    };

    const handleMouseUp = () => {
      setCursorEnlarged(false);
    };

    const handleMouseOver = (e) => {
      if (e.target.classList.contains('mouse-effect')) {
        setCursorEnlarged(true);
        // Couleur personnalisée si spécifiée
        if (e.target.dataset.cursorColor) {
          setCursorColor(e.target.dataset.cursorColor);
        }
      }
    };

    const handleMouseOut = () => {
      setCursorEnlarged(false);
      setCursorColor("#7e3afd"); // Réinitialiser à la couleur par défaut
    };

    // Add event listeners
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    // Appliquer l'effet aux éléments avec la classe mouse-effect
    const elements = document.querySelectorAll('.mouse-effect');
    elements.forEach(el => {
      el.addEventListener('mouseover', handleMouseOver);
      el.addEventListener('mouseout', handleMouseOut);
    });

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      elements.forEach(el => {
        el.removeEventListener('mouseover', handleMouseOver);
        el.removeEventListener('mouseout', handleMouseOut);
      });
    };
  }, []);

  // Fonction pour générer des couleurs aléatoires
  const getRandomColor = () => {
    const colors = [
      "rgba(126, 58, 253, 0.5)",   // Violet (accent)
      "rgba(100, 180, 255, 0.5)",  // Bleu clair
      "rgba(255, 100, 180, 0.5)",  // Rose
      "rgba(120, 230, 180, 0.5)"   // Vert menthe
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <MouseEffectContext.Provider value={{ cursorEnlarged, cursorColor }}>
      {children}
      
      {/* Cursor custom animé */}
      <motion.div
        className="fixed w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          backgroundColor: cursorColor,
          opacity: cursorVisible ? 1 : 0,
          transform: cursorEnlarged ? 'scale(2.5)' : 'scale(1)',
        }}
        animate={{
          scale: cursorEnlarged ? 2.5 : 1,
          opacity: cursorVisible ? 1 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
      />

      {/* Particules */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="fixed rounded-full pointer-events-none z-40"
          style={{
            left: particle.x - (particle.size / 2),
            top: particle.y - (particle.size / 2),
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color
          }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ 
            scale: [0, 1, 0], 
            opacity: [0.8, 0.6, 0],
            x: [0, (Math.random() * 100 - 50)],
            y: [0, (Math.random() * 100 - 50)]
          }}
          transition={{ 
            duration: particle.lifespan / 1000, 
            ease: "easeOut" 
          }}
        />
      ))}
    </MouseEffectContext.Provider>
  );
} 