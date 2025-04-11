'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useAnimation, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import ProjectCard from './ProjectCard';

const InfiniteHorizontalScroll = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 pour la gauche, 1 pour la droite
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [width, setWidth] = useState(0);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const wheelTimeout = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Fonction pour obtenir les indices des projets visibles
  const getVisibleProjects = useCallback(() => {
    // N'afficher qu'un seul projet à la fois pour s'adapter au nouveau design horizontal
    const visibleProjects = [];
    const startIndex = currentIndex;
    
    // Ajouter le projet actuel
    if (startIndex < projects.length) {
      visibleProjects.push(startIndex);
    }
    
    return visibleProjects;
  }, [currentIndex, projects.length]);

  // Calculer la largeur du carrousel
  useEffect(() => {
    const handleResize = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const containerWidth = trackRef.current.clientWidth;
        setWidth(trackWidth - containerWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [projects.length]);

  // Gestion du défilement horizontal avec la molette
  const handleWheel = useCallback((e) => {
    e.preventDefault(); // Empêcher le défilement de page par défaut
    
    // Annuler le timeout précédent
    if (wheelTimeout.current) {
      clearTimeout(wheelTimeout.current);
    }

    // Ignorer si déjà en transition
    if (isTransitioning) return;

    const threshold = 50; // Seuil pour le déclenchement du défilement
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

    if (Math.abs(delta) > threshold) {
      const newDirection = delta > 0 ? 1 : -1;
      
      setDirection(newDirection);
      setIsTransitioning(true);
      
      // Navigation projet par projet
      if (newDirection > 0) {
        const newIndex = (currentIndex + 1) % projects.length;
        setCurrentIndex(newIndex);
      } else {
        const newIndex = (currentIndex - 1 + projects.length) % projects.length;
        setCurrentIndex(newIndex);
      }
      
      // Ajouter un timeout pour éviter les défilements trop rapides
      wheelTimeout.current = setTimeout(() => {
        setIsTransitioning(false);
      }, 700); // Délai entre transitions
    }
  }, [currentIndex, isTransitioning, projects.length]);

  // Gestion du swipe tactile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (isTransitioning) return;

    const threshold = 75; // Seuil de déplacement pour considérer un swipe
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > threshold) {
      const newDirection = diff > 0 ? 1 : -1; // vers la droite ou la gauche
      
      setDirection(newDirection);
      setIsTransitioning(true);
      
      const nextIndex = (currentIndex + newDirection + projects.length) % projects.length;
      setCurrentIndex(nextIndex);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 700);
    }
  };

  // Suivi de la position de la souris pour les effets de parallaxe
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
    
    // Mettre à jour les variables CSS pour l'effet de surbrillance
    if (containerRef.current) {
      containerRef.current.style.setProperty('--x', `${x}%`);
      containerRef.current.style.setProperty('--y', `${y}%`);
    }
  }, []);

  // Fonction pour naviguer vers la page précédente
  const handlePrevious = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setDirection(-1);
    
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + projects.length) % projects.length;
      return newIndex;
    });
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  }, [projects.length, isTransitioning]);

  // Fonction pour naviguer vers la page suivante
  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setDirection(1);
    
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % projects.length;
      return newIndex;
    });
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  }, [projects.length, isTransitioning]);

  // Ajouter les écouteurs d'événements
  useEffect(() => {
    const currentContainer = containerRef.current;
    
    if (currentContainer) {
      currentContainer.addEventListener('wheel', handleWheel, { passive: false });
      currentContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
      currentContainer.addEventListener('touchmove', handleTouchMove, { passive: true });
      currentContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
      currentContainer.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    
    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('wheel', handleWheel);
        currentContainer.removeEventListener('touchstart', handleTouchStart);
        currentContainer.removeEventListener('touchmove', handleTouchMove);
        currentContainer.removeEventListener('touchend', handleTouchEnd);
        currentContainer.removeEventListener('mousemove', handleMouseMove);
      }
      
      if (wheelTimeout.current) {
        clearTimeout(wheelTimeout.current);
      }
    };
  }, [handleWheel, handleMouseMove]);

  // Défilement automatique (optionnel)
  useEffect(() => {
    let autoScrollInterval;
    
    // Démarrer le défilement automatique si on n'est pas en train de faire glisser
    if (!isDragging && !isTransitioning) {
      autoScrollInterval = setInterval(() => {
        handleNext();
      }, 8000); // Changement toutes les 8 secondes
    }
    
    return () => {
      if (autoScrollInterval) clearInterval(autoScrollInterval);
    };
  }, [isDragging, isTransitioning, handleNext]);

  // Calculer le décalage de parallaxe basé sur la position de la souris
  const calculateParallaxOffset = (depth = 1) => {
    // Centrer la position (de 0-100 à -50-50)
    const centeredX = mousePosition.x - 50;
    const centeredY = mousePosition.y - 50;
    
    // Appliquer le facteur de profondeur
    return {
      x: centeredX * depth * 0.01, // Ajuster la sensibilité ici
      y: centeredY * depth * 0.005  // Moins prononcé sur l'axe vertical
    };
  };

  const parallaxOffset = calculateParallaxOffset(1.5);

  // Variantes pour les boutons
  const buttonVariants = {
    initial: { scale: 1, opacity: 0.8 },
    hover: { scale: 1.1, opacity: 1 },
    tap: { scale: 0.95 }
  };

  // Variantes pour l'animation des slides
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    })
  };

  // Indices des projets visibles
  const visibleProjects = getVisibleProjects();

  return (
    <div 
      ref={containerRef}
      className="infinite-scroll-container relative min-h-screen w-screen overflow-hidden bg-background hover-glow py-16 md:py-20"
      style={{ touchAction: 'pan-y' }}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
    >
      {/* Overlay pour la profondeur */}
      <div className="absolute inset-0 z-0 pointer-events-none slide-depth">
        <div className="h-full w-full bg-gradient-to-b from-transparent to-background/40" />
      </div>
      
      {/* Indicateur de swipe pour mobile */}
      <div className="swipe-hint md:hidden mt-4 flex justify-center">
        <div className="flex items-center gap-2 text-white/60 text-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 16L3 12M3 12L7 8M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Glisser</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 8L21 12M21 12L17 16M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      {/* Titre de la section */}
      <div className="container-wide mb-6 md:mb-10">
        <h2 className="text-3xl md:text-5xl font-bold float-small mb-2 md:mb-4">Projets réalisés</h2>
        <p className="text-sm md:text-lg max-w-2xl float">Découvrez mes projets récents, réalisés avec passion et expertise technique.</p>
      </div>
      
      {/* Conteneur des projets */}
      <div 
        ref={trackRef}
        className="container-wide relative mb-10 mx-auto max-w-[1200px]"
      >
        <AnimatePresence mode="wait" custom={direction}>
          {visibleProjects.map((index) => (
            <motion.div 
              key={projects[index].title}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              <ProjectCard project={projects[index]} delay={0} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Boutons de navigation */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center gap-4 z-20">
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={handlePrevious}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 shadow-lg cursor-grab float-small float-delay-1"
          aria-label="Projet précédent"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </motion.button>
        
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={handleNext}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white border border-white/20 shadow-lg cursor-grab float-small float-delay-3"
          aria-label="Projet suivant"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </motion.button>
      </div>
      
      {/* Numéro du projet actuel et nombre total */}
      <div className="absolute top-10 right-8 text-lg font-mono opacity-70">
        <span className="text-accent text-2xl">{String(currentIndex + 1).padStart(2, '0')}</span>
        <span className="mx-2 text-white/50">/</span>
        <span className="text-white/50">{String(projects.length).padStart(2, '0')}</span>
      </div>
    </div>
  );
};

export default InfiniteHorizontalScroll; 