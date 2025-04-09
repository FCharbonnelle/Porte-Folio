'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

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
    // Afficher 3 projets consécutifs à partir de l'index actuel
    const startIndex = Math.floor(currentIndex / 3) * 3; // S'assurer que nous commençons toujours par un multiple de 3
    const indices = [];
    
    for (let i = 0; i < 3 && i + startIndex < projects.length; i++) {
      indices.push(startIndex + i);
    }
    
    // Si nous n'avons pas assez de projets pour remplir la rangée, ajouter des projets du début
    while (indices.length < 3) {
      indices.push(indices.length % projects.length);
    }
    
    return indices;
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

  // Navigation manuelle avec les boutons
  const goToPrevious = () => {
    if (isTransitioning) return;
    
    setDirection(-1);
    setIsTransitioning(true);
    
    // Navigation par groupe de 3
    const newIndex = Math.max(0, Math.floor(currentIndex / 3) * 3 - 3);
    setCurrentIndex(newIndex);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    
    setDirection(1);
    setIsTransitioning(true);
    
    // Navigation par groupe de 3
    const newIndex = Math.min(projects.length - 1, Math.floor(currentIndex / 3) * 3 + 3);
    setCurrentIndex(newIndex);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  };

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
        goToNext();
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
          className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-6 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {visibleProjects.map((index, i) => (
            <motion.div
              key={`${projects[index].id}-${index}`}
              className="relative min-h-[300px] sm:min-h-[350px] md:min-h-[450px] rounded-xl md:rounded-2xl overflow-hidden shadow-xl border border-white/10 bg-background/5 backdrop-blur-sm flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  delay: i * 0.1,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1]
                }
              }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              style={{
                transform: `perspective(1000px) rotateY(${parallaxOffset.x * (i - 1)}deg) rotateX(${-parallaxOffset.y}deg)`,
                transition: isDragging ? 'none' : 'transform 0.2s ease-out'
              }}
            >
              {/* Image du projet */}
              <div className="relative h-36 sm:h-40 md:h-60 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/60 z-10" />
                <motion.div
                  className="h-full w-full parallax-image"
                  style={{
                    transform: `scale(1.05) translateX(${-parallaxOffset.x * 5 * (i - 1)}px) translateY(${-parallaxOffset.y * 5}px)`,
                    transition: isDragging ? 'none' : 'transform 0.2s ease-out'
                  }}
                >
                  <img
                    src={projects[index].image}
                    alt={projects[index].title}
                    className="object-cover w-full h-full"
                  />
                </motion.div>
              </div>
              
              {/* Contenu du projet */}
              <div className="p-3 sm:p-4 md:p-6 fade-overflow flex-grow flex flex-col">
                <motion.h3 
                  className="text-base sm:text-lg md:text-2xl font-bold text-foreground mb-1 md:mb-3 float-small truncate"
                  whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                >
                  {projects[index].title}
                </motion.h3>
                
                <p className="text-xs md:text-sm text-gray-dark float mb-2 md:mb-4 line-clamp-2 md:line-clamp-3 flex-grow">
                  {projects[index].description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-2 md:mb-4">
                  {projects[index].tags?.slice(0, 2).map((tag, tagIndex) => (
                    <motion.span 
                      key={tagIndex} 
                      className="text-[10px] sm:text-xs py-0.5 px-1.5 sm:py-1 sm:px-2 rounded-full bg-accent/10 text-accent border border-accent/20 hover-offset float-small float-delay-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { delay: 0.3 + (tagIndex * 0.1) } 
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                  {projects[index].tags?.length > 2 && (
                    <motion.span className="text-[10px] sm:text-xs py-0.5 px-1.5 sm:py-1 sm:px-2 rounded-full bg-gray-dark/10 text-gray-dark border border-gray-dark/20">
                      +{projects[index].tags.length - 2}
                    </motion.span>
                  )}
                </div>
                
                <div className="pt-1 md:pt-2 mt-auto flex gap-3">
                  <motion.a 
                    href={projects[index].link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] sm:text-xs md:text-sm inline-flex items-center text-accent font-medium float-small"
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Voir le projet
                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.a>
                  
                  {projects[index].github && (
                    <motion.a 
                      href={projects[index].github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[10px] sm:text-xs md:text-sm inline-flex items-center text-white/70 font-medium float-small"
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      GitHub
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 ml-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 20.5C4.5 22 4.5 17.5 3 17m14 7v-4.5c0-1 0-2-1.5-2.5 4 0 6.5-2 6.5-5.5 0-1.5-.5-2.5-1.5-3.5 0-.5.5-2-.5-3.5 0 0-1.5-.5-3.5 1.5-2-.5-4-.5-6 0-2-2-3.5-1.5-3.5-1.5-1 1.5-.5 3-.5 3.5-1 1-1.5 2-1.5 3.5 0 3.5 2.5 5.5 6.5 5.5-1 .5-1.5 1.5-1.5 2.5v4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.a>
                  )}
                </div>
              </div>
              
              {/* Badge d'index */}
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full bg-accent flex items-center justify-center font-mono text-white text-[10px] sm:text-xs md:text-sm shadow-lg">
                {index + 1}
              </div>
            </motion.div>
          ))}
          
          {/* Afficher plus de projets - Uniquement visible s'il y a plus de 3 projets au total */}
          {projects.length > 3 && (
            <motion.div
              className="flex items-center justify-center min-h-[300px] sm:min-h-[350px] md:min-h-[450px] rounded-xl md:rounded-2xl border border-dashed border-white/20 bg-transparent"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-center p-3 sm:p-4 md:p-6">
                <motion.button
                  onClick={goToNext}
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
      <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center gap-8 z-20">
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={goToPrevious}
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
        
        {/* Pagination */}
        <div className="flex gap-2">
          {Array.from({ length: Math.ceil(projects.length / 3) }).map((_, index) => {
            const isActive = Math.floor(currentIndex / 3) === index;
            return (
              <motion.button
                key={index}
                className={`h-3 rounded-full transition-all duration-300 pagination-indicator ${
                  isActive ? 'active' : 'bg-white/30 w-3'
                }`}
                onClick={() => {
                  if (isTransitioning) return;
                  const targetIndex = index * 3;
                  setDirection(targetIndex > currentIndex ? 1 : -1);
                  setIsTransitioning(true);
                  setCurrentIndex(targetIndex);
                  setTimeout(() => setIsTransitioning(false), 700);
                }}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.5 }}
                aria-label={`Aller au groupe de projets ${index + 1}`}
              />
            );
          })}
        </div>
        
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={goToNext}
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
        <span className="text-accent text-2xl">{String(Math.floor(currentIndex / 3) + 1).padStart(2, '0')}</span>
        <span className="mx-2 text-white/50">/</span>
        <span className="text-white/50">{String(Math.ceil(projects.length / 3)).padStart(2, '0')}</span>
      </div>
    </div>
  );
};

export default InfiniteHorizontalScroll; 