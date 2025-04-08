'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const MouseEffectContext = createContext();

export const useMouseEffect = () => useContext(MouseEffectContext);

export default function MouseEffectProvider({ children }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorEnlarged, setCursorEnlarged] = useState(false);
  const [cursorColor, setCursorColor] = useState("#7e3afd");
  const [particles, setParticles] = useState([]);
  const [waveEffects, setWaveEffects] = useState([]);
  const cursorAnimControls = useAnimation();

  // Effet de déformation lorsque le curseur est cliqué
  const handleClick = (e) => {
    // Ajouter un effet d'onde au clic
    const newWave = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };
    
    setWaveEffects(prev => [...prev, newWave]);
    
    // Supprimer l'onde après son animation
    setTimeout(() => {
      setWaveEffects(prev => prev.filter(wave => wave.id !== newWave.id));
    }, 1000);
    
    // Animation de distorsion du curseur
    cursorAnimControls.start({
      scale: [3, 1],
      borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "50% 50% 50% 50%"],
      rotate: [0, 360],
      transition: { duration: 0.8, ease: "easeInOut" }
    });
  };

  // Suivre la position de la souris
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Ajouter une particule de manière aléatoire
      if (Math.random() > 0.90) {
        const newParticle = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 12 + 2,
          color: getRandomColor(),
          lifespan: Math.random() * 1500 + 500, // Durée de vie entre 500ms et 2000ms
          rotation: Math.random() * 360,
          shape: Math.random() > 0.7 ? 'circle' : Math.random() > 0.5 ? 'square' : 'triangle'
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
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('click', handleClick);
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
        
        // Animation de l'élément survolé
        if (e.target.animate) {
          e.target.animate([
            { transform: 'scale(1)', filter: 'blur(0px)' },
            { transform: 'scale(1.02)', filter: 'blur(0.5px)' },
            { transform: 'scale(1)', filter: 'blur(0px)' }
          ], {
            duration: 800,
            easing: 'cubic-bezier(0.42, 0, 0.58, 1)'
          });
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
      "rgba(126, 58, 253, 0.6)",   // Violet (accent)
      "rgba(100, 180, 255, 0.6)",  // Bleu clair
      "rgba(255, 100, 180, 0.6)",  // Rose
      "rgba(120, 230, 180, 0.6)",  // Vert menthe
      "rgba(255, 215, 0, 0.6)",    // Or
      "rgba(255, 105, 97, 0.6)"    // Corail
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Rendu de particule selon la forme
  const renderParticleShape = (shape, color, size) => {
    switch(shape) {
      case 'square':
        return (
          <div style={{ 
            width: size, 
            height: size, 
            backgroundColor: color,
            transform: `rotate(${Math.random() * 45}deg)` 
          }} />
        );
      case 'triangle':
        return (
          <div style={{ 
            width: 0,
            height: 0,
            borderLeft: `${size/2}px solid transparent`,
            borderRight: `${size/2}px solid transparent`,
            borderBottom: `${size}px solid ${color}`,
          }} />
        );
      default: // circle
        return (
          <div style={{ 
            width: size, 
            height: size, 
            backgroundColor: color,
            borderRadius: '50%' 
          }} />
        );
    }
  };

  return (
    <MouseEffectContext.Provider value={{ cursorEnlarged, cursorColor }}>
      {children}
      
      {/* Cursor custom animé */}
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          backgroundColor: cursorColor,
          opacity: cursorVisible ? 1 : 0,
        }}
        animate={cursorAnimControls}
        initial={{
          width: 24,
          height: 24,
          x: -12,
          y: -12,
          borderRadius: "50%",
          scale: 1
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
      />
      
      {/* Halo autour du curseur */}
      <motion.div
        className="fixed pointer-events-none z-40"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          border: `1px solid ${cursorColor}`,
          opacity: cursorVisible ? 0.5 : 0,
        }}
        animate={{
          scale: cursorEnlarged ? 3 : 1.5,
          x: -30, 
          y: -30,
          width: 60,
          height: 60,
          borderRadius: cursorEnlarged ? 
            ["30% 70% 70% 30% / 30% 30% 70% 70%", "50% 50% 50% 50%", "70% 30% 30% 70% / 70% 70% 30% 30%", "50% 50% 50% 50%"] 
            : "50%",
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Particules */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="fixed pointer-events-none z-40"
          style={{
            left: particle.x,
            top: particle.y,
            x: -(particle.size / 2),
            y: -(particle.size / 2),
            rotate: particle.rotation
          }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ 
            scale: [0, 1, 0], 
            opacity: [0.8, 0.6, 0],
            x: [-(particle.size / 2), -(particle.size / 2) + (Math.random() * 100 - 50)],
            y: [-(particle.size / 2), -(particle.size / 2) + (Math.random() * 100 - 50)],
            rotate: [particle.rotation, particle.rotation + (Math.random() > 0.5 ? 180 : -180)]
          }}
          transition={{ 
            duration: particle.lifespan / 1000, 
            ease: "easeOut" 
          }}
        >
          {renderParticleShape(particle.shape, particle.color, particle.size)}
        </motion.div>
      ))}
      
      {/* Effets d'onde au clic */}
      {waveEffects.map(wave => (
        <motion.div
          key={wave.id}
          className="fixed pointer-events-none z-30"
          style={{
            left: wave.x,
            top: wave.y,
            x: -50,
            y: -50,
            width: 100,
            height: 100,
            borderRadius: "50%",
            border: `2px solid ${cursorColor}`
          }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{
            scale: [0, 3],
            opacity: [0.8, 0],
            borderRadius: ["50%", "40% 60% 60% 40% / 40% 40% 60% 60%", "50%"]
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}
    </MouseEffectContext.Provider>
  );
} 