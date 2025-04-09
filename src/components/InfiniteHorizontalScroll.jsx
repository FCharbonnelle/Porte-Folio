'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useAnimation, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

const ProjectCard = ({ project, delay }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Valeurs pour le suivi de la souris
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Valeurs avec spring pour une animation plus fluide
  const springX = useSpring(x, { damping: 50, stiffness: 400 });
  const springY = useSpring(y, { damping: 50, stiffness: 400 });
  
  // Transformation des valeurs pour l'effet visuel
  const rotateX = useTransform(springY, [-100, 100], [10, -10]);
  const rotateY = useTransform(springX, [-100, 100], [-10, 10]);
  const brightness = useTransform(springY, [-100, 100], [1.1, 0.9]);
  
  // Gérer le mouvement de la souris
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculer la distance par rapport au centre
    const moveX = (e.clientX - centerX) / 5;
    const moveY = (e.clientY - centerY) / 5;
    
    x.set(moveX);
    y.set(moveY);
  };
  
  return (
    <motion.div
      className="relative min-h-[300px] sm:min-h-[350px] md:min-h-[400px] rounded-xl md:rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-background/5 backdrop-blur-sm flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          delay: delay * 0.1,
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
      onMouseMove={handleMouseMove}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformPerspective: 1000,
        filter: isHovered ? `brightness(${brightness})` : 'brightness(1)'
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      {/* Image du projet */}
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-white">
        <motion.div
          className="h-full w-full flex items-center justify-center"
          style={{
            scale: isHovered ? 1.05 : 1,
            transition: "scale 0.2s ease"
          }}
        >
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover" 
          />
        </motion.div>
      </div>

      {/* Contenu du projet */}
      <div className="flex flex-col flex-grow p-4 sm:p-5 md:p-6">
        <motion.h3 
          className="text-lg sm:text-xl md:text-2xl font-bold mb-1 text-white"
          style={{
            translateY: isHovered ? -5 : 0
          }}
        >
          {project.title}
        </motion.h3>
        <motion.p 
          className="text-sm text-white/70 mb-3 line-clamp-3"
          style={{
            translateY: isHovered ? -3 : 0
          }}
        >
          {project.description}
        </motion.p>
        <div className="mt-auto">
          <motion.div 
            className="flex gap-2 flex-wrap"
            style={{
              translateY: isHovered ? -2 : 0
            }}
          >
            {project.tags.map((tag, tagIndex) => (
              <span 
                key={tagIndex} 
                className="text-xs px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/80"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

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
    // Afficher 2 projets à la fois
    const visibleProjects = [];
    const startIndex = Math.floor(currentIndex / 2) * 2;
    
    // Ajouter jusqu'à 2 projets
    for (let i = 0; i < 2; i++) {
      if (startIndex + i < projects.length) {
        visibleProjects.push(startIndex + i);
      }
    }
    
    // Si nous n'avons pas 2 projets, compléter le reste avec des projets du début
    while (visibleProjects.length < 2) {
      visibleProjects.push(visibleProjects.length);
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
      
      // Navigation par groupe de 3
      if (newDirection > 0) {
        const newIndex = Math.min(projects.length - 1, Math.floor(currentIndex / 3) * 3 + 3);
        setCurrentIndex(newIndex);
      } else {
        const newIndex = Math.max(0, Math.floor(currentIndex / 3) * 3 - 3);
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
    setCurrentIndex((prevIndex) => {
      // Déplacer par groupe de 2 projets
      const newIndex = prevIndex - 2;
      return newIndex < 0 ? projects.length - (projects.length % 2 || 2) : newIndex;
    });
  }, [projects.length]);

  // Fonction pour naviguer vers la page suivante
  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      // Déplacer par groupe de 2 projets
      const newIndex = prevIndex + 2;
      return newIndex >= projects.length ? 0 : newIndex;
    });
  }, [projects.length]);

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
  }, [isDragging, isTransitioning]);

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

  // Indices des projets visibles
  const visibleProjects = getVisibleProjects();

  return (
    <div 
      ref={containerRef}
      className="infinite-scroll-container relative min-h-screen w-screen overflow-hidden bg-background hover-glow py-8 md:py-16"
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
      <div className="swipe-hint hidden md:hidden">
        <svg width="80" height="20" viewBox="0 0 80 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 10H75M75 10L65 2M75 10L65 18" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      
      {/* Titre de la section */}
      <div className="container-wide mb-6 md:mb-10">
        <h2 className="text-3xl md:text-5xl font-bold float-small mb-2 md:mb-4">Projets réalisés</h2>
        <p className="text-sm md:text-lg max-w-2xl float">Découvrez mes projets récents, réalisés avec passion et expertise technique.</p>
      </div>
      
      {/* Grille de projets */}
      <div 
        ref={trackRef}
        className="container-wide relative mb-10"
      >
        <motion.div 
          className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-8 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {visibleProjects.map((index, i) => (
            <ProjectCard key={`card-${index}`} project={projects[index]} delay={i} />
          ))}
          
          {/* Afficher plus de projets - Uniquement visible s'il y a plus de 2 projets au total */}
          {projects.length > 2 && (
            <motion.div
              className="flex items-center justify-center min-h-[300px] sm:min-h-[350px] md:min-h-[400px] rounded-xl md:rounded-2xl border border-dashed border-white/20 bg-transparent"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-center p-3 sm:p-4 md:p-6">
                <motion.button
                  onClick={handleNext}
                  className="flex flex-col items-center justify-center text-accent"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 mb-1 sm:mb-2 md:mb-4 opacity-70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5V19M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="text-xs sm:text-sm md:text-lg font-medium">Voir plus</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
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
          aria-label="Projets précédents"
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
          aria-label="Projets suivants"
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
      
      {/* Numéro du groupe actuel et nombre total */}
      <div className="absolute top-10 right-8 text-lg font-mono opacity-70">
        <span className="text-accent text-2xl">{String(Math.floor(currentIndex / 2) + 1).padStart(2, '0')}</span>
        <span className="mx-2 text-white/50">/</span>
        <span className="text-white/50">{String(Math.ceil(projects.length / 2)).padStart(2, '0')}</span>
      </div>
    </div>
  );
};

export default InfiniteHorizontalScroll; 