'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  const carouselRef = useRef(null);

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
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fonction pour naviguer vers un projet spécifique
  const navigateToProject = (index) => {
    setActiveIndex(index);
    
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0]?.offsetWidth || 0;
      const gap = 16; // Taille de l'espace entre les cartes
      
      const scrollPosition = index * (cardWidth + gap);
      
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  // Fonction pour aller au projet suivant
  const nextProject = () => {
    const newIndex = Math.min(activeIndex + 1, projects.length - 1);
    navigateToProject(newIndex);
  };

  // Fonction pour aller au projet précédent
  const prevProject = () => {
    const newIndex = Math.max(activeIndex - 1, 0);
    navigateToProject(newIndex);
  };

  // Animation pour les boutons de navigation
  const buttonVariants = {
    initial: { scale: 1, opacity: 0.9 },
    hover: { scale: 1.1, opacity: 1 },
    tap: { scale: 0.95 }
  };

  return (
    <div className="relative w-full py-10 overflow-hidden">
      {/* Conteneur principal du carrousel */}
      <motion.div 
        className="overflow-hidden relative mx-auto px-4 sm:px-6"
      >
        <motion.div
          ref={carouselRef}
          className="flex gap-4 cursor-grab"
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          whileTap={{ cursor: "grabbing" }}
        >
          {projects.map((project, index) => {
            const floatingAnim = generateFloatingAnimation(index);
            
            return (
              <motion.div
                key={index}
                className="min-w-[280px] sm:min-w-[320px] lg:min-w-[400px]"
                initial={{ opacity: 0, y: 50 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }
                }}
              >
                <motion.div
                  animate={{
                    ...floatingAnim.y.animate,
                    ...floatingAnim.x.animate,
                    ...floatingAnim.rotate.animate
                  }}
                >
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    technologies={project.technologies}
                    link={project.link}
                    delay={0.1 * index}
                  />
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

      {/* Boutons de navigation */}
      <div className="flex justify-center mt-8 gap-4">
        <motion.button
          className="w-12 h-12 rounded-full bg-background-dark border border-accent/30 flex items-center justify-center shadow-md text-accent transition-all"
          onClick={prevProject}
          disabled={activeIndex === 0}
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
          disabled={activeIndex === projects.length - 1}
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
    </div>
  );
} 