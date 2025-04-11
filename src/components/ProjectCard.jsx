import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Animation variants
const ANIMATIONS = {
  card: {
    hidden: { opacity: 0, y: 30 },
    visible: (delay) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay
      }
    }),
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  },
  image: {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }
};

// Composant pour les tags de technologies
const TechTag = ({ name }) => (
  <span className="inline-block bg-gray-light px-3 py-1 rounded-full text-sm">
    {name}
  </span>
);


// Composant pour le lien "Voir le projet"
const ProjectLink = ({ href }) => (
  <Link href={href} passHref>
    <motion.span
      className="inline-flex items-center text-black font-medium"
      whileHover={{ x: 5 }}
      transition={{ duration: 0.2 }}
    >
      Voir le projet
      <svg
        className="ml-2 w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
    </motion.span>
  </Link>
);

const ProjectCard = ({ project, delay = 0 }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Compatibilité avec différentes structures de données
  const technologies = project.technologies || project.tags || [];
  const demoLink = project.demoLink || project.link || '';
  const sourceLink = project.sourceLink || project.github || '';
  const category = project.category || (technologies.length > 0 ? technologies[0] : '');

  return (
    <motion.div
      className="project-card w-full h-auto bg-transparent rounded-none md:rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: delay * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.01,
        boxShadow: "0 8px 32px rgba(31, 38, 135, 0.2)",
      }}
    >
      <div className="flex flex-col md:flex-row">
        {/* Container de l'image - sans contraintes fixes de hauteur */}
        <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto">
          {/* Overlay de chargement */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-accent"></div>
            </div>
          )}
          
          {/* Image */}
          <motion.img
            style={{ 
              y,
              transition: "transform 0.4s ease"
            }}
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-contain transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={handleImageLoad}
          />
          
          {/* Gradient overlay sur l'image mobile uniquement */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 md:hidden" />
        </div>
        
        {/* Contenu avec fond semi-transparent */}
        <div className="relative flex flex-col p-4 md:p-6 md:w-1/2 bg-black/70 backdrop-blur-md z-10 h-auto md:min-h-full">
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <h3 className="text-xl md:text-2xl font-bold text-white">
                {project.title}
              </h3>
              <span className="px-2 py-1 text-xs rounded-full bg-accent/20 text-accent">
                {category}
              </span>
            </div>
            
            <p className="text-sm md:text-base text-white/90 line-clamp-3 md:line-clamp-none">
              {project.description}
            </p>
            
            <div className="tech-stack flex flex-wrap gap-2 pt-2">
              {technologies.slice(0, 6).map((tech, index) => (
                <span
                  key={index}
                  className="inline-block px-2 py-1 text-xs rounded-md bg-white/10 text-white/80"
                >
                  {tech}
                </span>
              ))}
              {technologies.length > 6 && (
                <span className="inline-block px-2 py-1 text-xs rounded-md bg-white/5 text-white/60">
                  +{technologies.length - 6}
                </span>
              )}
            </div>
          </div>
          
          <div className="project-actions flex space-x-3 mt-4">
            {demoLink && (
              <motion.a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg transition-all hover:bg-accent/80 flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 10L20 5M20 5V10M20 5H15M19 14V17C19 18.1046 18.1046 19 17 19H7C5.89543 19 5 18.1046 5 17V7C5 5.89543 5.89543 5 7 5H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Voir le projet
              </motion.a>
            )}
            
            {sourceLink && (
              <motion.a
                href={sourceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-white/10 text-white text-sm font-medium rounded-lg transition-all hover:bg-white/20 flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5229 6.47715 22 12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 9H9.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 9H15.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Code source
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard; 