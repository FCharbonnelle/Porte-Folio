'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import ProjectCard from './ProjectCard';

// Fonction pour créer un effet de flottement avec des paramètres aléatoires
const generateFloatingAnimation = (index) => {
  // Valeurs légèrement différentes pour chaque projet, basées sur leur index
  const baseDelay = 0.1 + (index * 0.2) % 1;
  const baseDuration = 4 + (index % 3);
  
  // Valeurs d'offset aléatoires mais légères
  const yOffset = 4 + (index % 3);
  const xOffset = 2 + (index % 2);
  const rotateOffset = 0.5 + (index % 2) * 0.3;
  
  return {
    y: {
      animate: {
        y: [`${-yOffset/2}px`, `${yOffset/2}px`, `${-yOffset/2}px`],
        transition: {
          repeat: Infinity,
          repeatType: "loop",
          duration: baseDuration,
          ease: "easeInOut",
          delay: baseDelay,
          times: [0, 0.5, 1]
        }
      }
    },
    x: {
      animate: {
        x: [`${-xOffset/2}px`, `${xOffset/2}px`, `${-xOffset/2}px`],
        transition: {
          repeat: Infinity,
          repeatType: "loop",
          duration: baseDuration + 0.5,
          ease: "easeInOut",
          delay: baseDelay + 0.2,
          times: [0, 0.5, 1]
        }
      }
    },
    rotate: {
      animate: {
        rotate: [`${-rotateOffset/2}deg`, `${rotateOffset/2}deg`, `${-rotateOffset/2}deg`],
        transition: {
          repeat: Infinity,
          repeatType: "loop",
          duration: baseDuration + 1,
          ease: "easeInOut",
          delay: baseDelay + 0.3,
          times: [0, 0.5, 1]
        }
      }
    }
  };
};

export default function ProjectCarousel({ projects }) {
  const [width, setWidth] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const carouselRef = useRef(null);
  const carouselControls = useAnimation();
  
  // Calculer la largeur du carrousel
  useEffect(() => {
    if (carouselRef.current) {
      const scrollWidth = carouselRef.current.scrollWidth;
      const offsetWidth = carouselRef.current.offsetWidth;
      setWidth(scrollWidth - offsetWidth);
    }
  }, [projects]);

  // Gestion du redimensionnement de la fenêtre
  useEffect(() => {
    const handleResize = () => {
      if (carouselRef.current) {
        const scrollWidth = carouselRef.current.scrollWidth;
        const offsetWidth = carouselRef.current.offsetWidth;
        setWidth(scrollWidth - offsetWidth);
        
        // Recalibrer l'animation sur redimensionnement
        navigateToProject(activeIndex, false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeIndex]);

  // Autoplay du carrousel
  useEffect(() => {
    let interval;

    const startAutoplay = () => {
      interval = setInterval(() => {
        if (!autoplayPaused && !isDragging) {
          const nextIndex = (activeIndex + 1) % projects.length;
          navigateToProject(nextIndex, true);
        }
      }, 5000); // Changement toutes les 5 secondes
    };

    startAutoplay();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeIndex, autoplayPaused, isDragging, projects.length]);

  // Fonction pour naviguer vers un projet spécifique
  const navigateToProject = (index, animate = true) => {
    setActiveIndex(index);
    
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0]?.offsetWidth || 0;
      const gap = 24; // Taille de l'espace entre les cartes
      
      const scrollPosition = index * (cardWidth + gap);
      
      if (animate) {
        carouselControls.start({
          x: -scrollPosition,
          transition: { 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.8 
          }
        });
      } else {
        carouselControls.set({ x: -scrollPosition });
      }
    }
  };

  // Fonction pour aller au projet suivant
  const nextProject = () => {
    const newIndex = (activeIndex + 1) % projects.length;
    navigateToProject(newIndex);
  };

  // Fonction pour aller au projet précédent
  const prevProject = () => {
    const newIndex = activeIndex === 0 ? projects.length - 1 : activeIndex - 1;
    navigateToProject(newIndex);
  };

  // Animation pour les boutons de navigation
  const buttonVariants = {
    initial: { scale: 1, opacity: 0.9 },
    hover: { scale: 1.1, opacity: 1 },
    tap: { scale: 0.95 }
  };

  // Gestion de la pause de l'autoplay au survol
  const handleMouseEnter = () => setAutoplayPaused(true);
  const handleMouseLeave = () => setAutoplayPaused(false);

  return (
    <div 
      className="relative w-full py-10 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Conteneur principal du carrousel */}
      <motion.div 
        className="overflow-hidden relative mx-auto px-4 sm:px-6"
      >
        <motion.div
          ref={carouselRef}
          className="flex gap-6"
          animate={carouselControls}
          initial={{ x: 0 }}
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          onDragStart={() => {
            setIsDragging(true);
            setAutoplayPaused(true);
          }}
          onDragEnd={(e, info) => {
            setIsDragging(false);
            setAutoplayPaused(false);
            
            // Déterminer si l'utilisateur a glissé suffisamment pour changer de slide
            if (Math.abs(info.offset.x) > 100) {
              if (info.offset.x > 0) {
                prevProject();
              } else {
                nextProject();
              }
            } else {
              // Retourner à la position actuelle
              navigateToProject(activeIndex);
            }
          }}
          dragElastic={0.2}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          whileTap={{ cursor: "grabbing" }}
        >
          {projects.map((project, index) => {
            const floatingAnim = generateFloatingAnimation(index);
            
            return (
              <motion.div
                key={index}
                className="min-w-[90vw] md:min-w-[80vw] lg:min-w-[60vw] aspect-[16/9] px-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: { 
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }
                }}
              >
                <motion.div
                  className="h-full relative overflow-hidden rounded-xl border border-accent-light/20 bg-background-dark shadow-lg"
                  animate={{
                    ...floatingAnim.y.animate,
                    ...floatingAnim.x.animate,
                    ...floatingAnim.rotate.animate
                  }}
                >
                  <div className="grid md:grid-cols-[1.2fr_1fr] h-full">
                    <div className="relative h-full overflow-hidden bg-white">
                      <motion.div
                        className="h-full w-full flex items-center justify-center p-1"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="relative h-full w-full flex items-center justify-center">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="max-w-full max-h-full w-auto h-auto"
                            style={{ 
                              objectFit: 'contain', 
                              margin: '0 auto',
                              width: '100%',
                              height: '100%'
                            }}
                          />
                        </div>
                      </motion.div>
                    </div>
                    
                    <div className="p-6 flex flex-col justify-center">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <motion.h3 
                          className="text-2xl md:text-3xl font-bold mb-4 text-accent"
                          whileHover={{ x: 5 }}
                        >
                          {project.title}
                        </motion.h3>
                        
                        <motion.p className="text-gray-light mb-6">
                          {project.description}
                        </motion.p>
                        
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.technologies.map((tech, techIndex) => (
                            <motion.span
                              key={techIndex}
                              className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent"
                              whileHover={{ scale: 1.1, y: -2 }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                        
                        <div className="flex gap-4">
                          {project.link && (
                            <motion.a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-primary btn-sm"
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Voir le projet
                            </motion.a>
                          )}
                          
                          {project.github && (
                            <motion.a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-ghost btn-sm"
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              Code source
                            </motion.a>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Animation décorative */}
      <div className="absolute top-1/4 left-0 w-full h-1/2 pointer-events-none">
        <motion.div 
          className="absolute left-0 top-0 w-full h-full bg-accent-light/5 rounded-full blur-3xl"
          animate={{
            x: ["-10%", "110%"],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 10,
            ease: "easeInOut"
          }}
          style={{ width: "30%", height: "30%" }}
        />
      </div>

      {/* Indicateur de progression */}
      <motion.div 
        className="w-full max-w-4xl mx-auto mt-8 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="h-1 bg-accent/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-accent"
            initial={{ width: `${(1 / projects.length) * 100}%`, x: `${activeIndex * 100}%` }}
            animate={{ 
              width: `${(1 / projects.length) * 100}%`, 
              x: `${activeIndex * (100 / projects.length) * (projects.length / (projects.length - 1 || 1))}%` 
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>

      {/* Boutons de navigation */}
      <div className="flex justify-center mt-8 gap-4">
        <motion.button
          className="w-12 h-12 rounded-full bg-background-dark border border-accent/30 flex items-center justify-center shadow-md text-accent transition-all"
          onClick={prevProject}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          aria-label="Projet précédent"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
        
        <div className="flex gap-2 items-center">
          {projects.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full ${activeIndex === index ? 'bg-accent' : 'bg-accent/30'}`}
              onClick={() => navigateToProject(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Aller au projet ${index + 1}`}
            />
          ))}
        </div>
        
        <motion.button
          className="w-12 h-12 rounded-full bg-background-dark border border-accent/30 flex items-center justify-center shadow-md text-accent transition-all"
          onClick={nextProject}
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          aria-label="Projet suivant"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </div>
      
      {/* Indicateur de pause/lecture */}
      <motion.div 
        className="absolute bottom-2 right-2 text-xs text-accent/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: autoplayPaused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {autoplayPaused ? "Pause" : "Lecture auto"}
      </motion.div>
    </div>
  );
} 