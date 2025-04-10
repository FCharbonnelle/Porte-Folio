'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Modal from '@/components/Modal';
import { parcoursData, ParcoursItem } from '@/data/parcoursData';
import { motion, useAnimation, useMotionValue, AnimatePresence } from 'framer-motion';

// Fonction pour créer un effet de flottement avec des paramètres aléatoires
const generateFloatingAnimation = (index: number) => {
  // Valeurs légèrement différentes pour chaque carte, basées sur leur index
  const baseDelay = 0.1 + (index * 0.2) % 1;
  const baseDuration = 4 + (index % 3);
  
  // Valeurs d'offset aléatoires mais légères
  const yOffset = 4 + (index % 3);
  const xOffset = 2 + (index % 2);
  const rotateOffset = 0.5 + (index % 2) * 0.3;
  
  return {
    y: [`${-yOffset/2}px`, `${yOffset/2}px`, `${-yOffset/2}px`],
    x: [`${-xOffset/2}px`, `${xOffset/2}px`, `${-xOffset/2}px`],
    rotate: [`${-rotateOffset/2}deg`, `${rotateOffset/2}deg`, `${-rotateOffset/2}deg`],
    transition: {
      y: {
        repeat: Infinity,
        repeatType: "loop" as const,
        duration: baseDuration,
        ease: "easeInOut",
        delay: baseDelay,
        times: [0, 0.5, 1]
      },
      x: {
        repeat: Infinity,
        repeatType: "loop" as const,
        duration: baseDuration + 0.5,
        ease: "easeInOut",
        delay: baseDelay + 0.2,
        times: [0, 0.5, 1]
      },
      rotate: {
        repeat: Infinity,
        repeatType: "loop" as const,
        duration: baseDuration + 1,
        ease: "easeInOut",
        delay: baseDelay + 0.3,
        times: [0, 0.5, 1]
      }
    }
  };
};

export default function Parcours() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ParcoursItem & { section: string, index: number } | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [dragStartX, setDragStartX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Get all items from parcoursData as a flat array with section info
  const allItems = parcoursData.flatMap((section, sectionIndex) => 
    section.items.map((item, itemIndex) => ({
      ...item,
      section: section.section,
      sectionIcon: section.icon,
      sectionIndex,
      itemIndex
    }))
  );

  const openModal = (item: ParcoursItem, section: string, index: number) => {
    setSelectedItem({ ...item, section, index });
    setModalOpen(true);
  };
  
  const handlePrevious = () => {
    setCurrentSection(prev => (prev > 0 ? prev - 1 : parcoursData.length - 1));
  };
  
  const handleNext = () => {
    setCurrentSection(prev => (prev < parcoursData.length - 1 ? prev + 1 : 0));
  };
  
  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragStartX(e.clientX);
  };
  
  const handleDragEnd = (e: React.MouseEvent<HTMLDivElement>) => {
    const dragEndX = e.clientX;
    const diff = dragEndX - dragStartX;
    
    if (diff > 50) {
      handlePrevious();
    } else if (diff < -50) {
      handleNext();
    }
  };

  // Ouvre directement la modale au clic sur un élément
  const handleItemClick = (index: number) => {
    const item = parcoursData[currentSection].items[index];
    openModal(item, parcoursData[currentSection].section, index);
  };

  // Image mapping for items
  const getImageSrc = (title: string) => {
    const imageMap: Record<string, string> = {
      "Développeur Web/Web mobile": "/assets/parcours/dwwm.jpg",
      "BTS Technico-Commercial": "/assets/parcours/bts-tc.jpg",
      "Baccalauréat STI génie productique mécanique": "/assets/parcours/bac-sti.jpg",
      "BEP Electronique": "/assets/parcours/bep-elec.jpg",
      "Conseiller de vente Equipements de la Maison": "/assets/parcours/conseiller.jpg",
      "Conseiller de vente en téléphonie": "/assets/parcours/conseiller_orange.jpg",
      "Vendeur logithèque": "/assets/parcours/vendeur-fnac.jpg",
      "Vendeur matériel Informatique et Musique": "/assets/parcours/cash_converters.jpg",
      "Créer, élaborer et identifier des concepts innovants": "/assets/parcours/competence1.jpg",
      "Actualiser régulièrement ses connaissances": "/assets/parcours/competence2.jpg",
      "Recueillir et analyser les besoins client": "/assets/parcours/competence3.jpg",
      "Présenter et valoriser un produit ou un service": "/assets/parcours/competence4.jpg",
      "Accompagner l'appropriation d'un outil par ses utilisateurs": "/assets/parcours/competence5.jpg",
      "Français": "/assets/parcours/competence6.jpg",
      "Anglais": "/assets/parcours/competence7.jpg",
      "Travailler en équipe": "/assets/parcours/competence8.jpg",
      "S'adapter aux changements": "/assets/parcours/competence9.jpg",
      "Faire preuve de curiosité": "/assets/parcours/competence10.jpg",
      "Faire preuve de créativité, d'inventivité": "/assets/parcours/competence11.jpg",
      "Faire preuve de persévérance": "/assets/parcours/competence12.jpg",
      "Faire preuve de rigueur et de précision": "/assets/parcours/competence13.jpg",
      "Gérer son stress": "/assets/parcours/competence14.jpg",
      "Sorties entre amis": "/assets/parcours/competence15.jpg",
      "Bowling, Billard, Basketball": "/assets/parcours/competence16.jpg",
      "Jeux vidéos multi-joueurs en ligne": "/assets/parcours/competence17.jpg"
    };
    
    return imageMap[title] || "/assets/placeholder.jpg";
  };
  
  // Fonction pour tronquer le titre en fonction de la longueur
  const getTruncatedTitle = (title: string, screenSize: string) => {
    const maxLength = {
      sm: 15,
      md: 20,
      lg: 25
    };
    
    if (screenSize === 'sm' && title.length > maxLength.sm) {
      return title.substring(0, maxLength.sm - 2) + '...';
    } else if (screenSize === 'md' && title.length > maxLength.md) {
      return title.substring(0, maxLength.md - 2) + '...';
    } else if (title.length > maxLength.lg) {
      return title.substring(0, maxLength.lg - 2) + '...';
    }
    
    return title;
  };

  const cardVariants = {
    initial: { 
      width: "15rem",
      opacity: 0.9,
      scale: 0.97
    },
    hover: { 
      width: "20rem",
      opacity: 1,
      scale: 0.98,
      transition: { duration: 0.3 }
    },
    expanded: {
      width: "calc(95vw - 5rem)",
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, type: "spring", stiffness: 100 }
    }
  };
  
  const labelVariants = {
    initial: {
      opacity: 0,
      x: -20
    },
    expanded: {
      opacity: 1,
      x: 0,
      transition: { delay: 0.3, duration: 0.5 }
    }
  };

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-b from-background to-background-secondary text-white flex flex-col">
      
      {/* Titre principal */}
      <div className="pt-8 pb-1 text-center">
        <motion.h1 
          className="text-xl md:text-3xl font-bold mb-1"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Mon Parcours
        </motion.h1>
        <motion.div 
          className="w-16 h-1 bg-accent mx-auto"
          initial={{ width: 0 }}
          animate={{ width: "4rem" }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />
      </div>
      
      {/* Carrousel principal */}
      <div className="flex-grow relative">
        <motion.div
          ref={containerRef}
          className="flex items-center justify-center h-full w-full"
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              className="flex items-center justify-center h-full w-full px-4"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-center items-center gap-2 sm:gap-3 w-full max-w-[98vw] overflow-x-auto no-scrollbar">
                {parcoursData[currentSection].items.map((item, index) => {
                  const imageSrc = getImageSrc(item.title);
                  const floatingAnim = generateFloatingAnimation(index);
                  
                  return (
                    <motion.div
                      key={index}
                      className="relative h-[70vh] overflow-hidden rounded-xl cursor-pointer border-2 border-white/30 shadow-lg backdrop-blur-sm bg-white/5 flex-shrink-0"
                      variants={cardVariants}
                      initial="initial"
                      animate={floatingAnim}
                      whileHover="hover"
                      onClick={() => handleItemClick(index)}
                      style={{
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)"
                      }}
                    >
                      {/* Image portrait en background */}
                      <div className="absolute inset-0 w-full h-full transition-all duration-500">
                        <Image 
                          src={imageSrc} 
                          alt={item.title}
                          fill
                          style={{ 
                            objectFit: 'cover', 
                            objectPosition: 'center',
                            transition: 'all 0.5s ease'
                          }}
                          priority
                        />
                      </div>
                      
                      {/* Titre vertical */}
                      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                        <div className="hidden sm:flex md:hidden rotate-90 whitespace-nowrap text-3xl font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)] truncate max-w-[650px]">
                          {getTruncatedTitle(item.title, 'sm')}
                        </div>
                        <div className="hidden md:flex lg:hidden rotate-90 whitespace-nowrap text-4xl font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)] truncate max-w-[700px]">
                          {getTruncatedTitle(item.title, 'md')}
                        </div>
                        <div className="hidden lg:flex rotate-90 whitespace-nowrap text-5xl font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)] truncate max-w-[750px]">
                          {getTruncatedTitle(item.title, 'lg')}
                        </div>
                        <div className="flex sm:hidden rotate-90 whitespace-nowrap text-2xl font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)] truncate max-w-[600px]">
                          {getTruncatedTitle(item.title, 'sm')}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
        
        {/* Boutons navigation */}
        <motion.button
          className="absolute left-1 top-1/2 -translate-y-1/2 flex items-center justify-center gap-1 pl-1 pr-3 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white z-10 border border-white/30"
          onClick={handlePrevious}
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
          whileTap={{ scale: 0.95 }}
          animate={{
            x: ["-2px", "0px", "-2px"],
            transition: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 2,
              ease: "easeInOut"
            }
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="hidden sm:inline text-sm font-medium">
            {parcoursData[(currentSection > 0 ? currentSection - 1 : parcoursData.length - 1)].section}
          </span>
        </motion.button>
        
        <motion.button
          className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center gap-1 pl-3 pr-1 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white z-10 border border-white/30"
          onClick={handleNext}
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
          whileTap={{ scale: 0.95 }}
          animate={{
            x: ["2px", "0px", "2px"],
            transition: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 2,
              ease: "easeInOut"
            }
          }}
        >
          <span className="hidden sm:inline text-sm font-medium">
            {parcoursData[(currentSection < parcoursData.length - 1 ? currentSection + 1 : 0)].section}
          </span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </div>
      
      {/* Indicateur de section actuelle et bouton retour */}
      <div className="py-3 flex items-center justify-center mb-2">
        <div className="flex items-center mr-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: 1,
                y: ["0px", "-3px", "0px"],
                transition: {
                  opacity: { duration: 0.3 },
                  y: {
                    repeat: Infinity,
                    repeatType: "loop" as const,
                    duration: 3,
                    ease: "easeInOut",
                    times: [0, 0.5, 1]
                  }
                }
              }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-accent/80 px-3 py-1 rounded-full text-white text-sm font-medium flex items-center"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--color-accent-rgb), 0.9)" }}
            >
              <span className="mr-1">{parcoursData[currentSection].icon}</span>
              {parcoursData[currentSection].section}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            y: ["0px", "-2px", "0px"],
            transition: {
              repeat: Infinity,
              repeatType: "loop" as const,
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.5, 1]
            }
          }}
        >
          <Link 
            href="/"
            className="inline-block px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg transition-all duration-300"
          >
            Retour à l'accueil
          </Link>
        </motion.div>
      </div>
      
      {/* Modal pour afficher les détails */}
      {selectedItem && (
        <Modal 
          open={modalOpen} 
          onClose={() => setModalOpen(false)} 
          title={selectedItem.title}
          imageSrc={getImageSrc(selectedItem.title)}
        >
          <div className="space-y-4 flex flex-col items-center text-center">
            {selectedItem.date && (
              <div>
                <h4 className="text-base font-medium mb-1">Période</h4>
                <p className="font-semibold">{selectedItem.date}</p>
              </div>
            )}
            
            {selectedItem.lieu && (
              <div>
                <h4 className="text-base font-medium mb-1">Lieu</h4>
                <p className="font-semibold">{selectedItem.lieu}</p>
              </div>
            )}
            
            <div>
              <h4 className="text-base font-medium mb-1">Catégorie</h4>
              <p className="flex items-center justify-center">
                <span className="mr-2">{parcoursData.find(s => s.section === selectedItem.section)?.icon}</span>
                {selectedItem.section}
              </p>
            </div>
            
            {selectedItem.contact && (
              <div>
                <h4 className="text-base font-medium mb-1">Contact</h4>
                <p>
                  {selectedItem.contact.includes('@') ? (
                    <a href={`mailto:${selectedItem.contact}`} className="font-semibold underline hover:no-underline">
                      {selectedItem.contact}
                    </a>
                  ) : (
                    <a href={selectedItem.contact} target="_blank" rel="noopener noreferrer" className="font-semibold underline hover:no-underline">
                      Profil LinkedIn
                    </a>
                  )}
                </p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
} 