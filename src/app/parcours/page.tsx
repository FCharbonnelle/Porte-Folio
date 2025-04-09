'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';
import { parcoursData, ParcoursItem } from '@/data/parcoursData';
import { motion, useAnimation, useMotionValue, AnimatePresence } from 'framer-motion';

export default function Parcours() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ParcoursItem & { section: string, index: number } | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [dragStartX, setDragStartX] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);
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
    setExpanded(null);
  };
  
  const handleNext = () => {
    setCurrentSection(prev => (prev < parcoursData.length - 1 ? prev + 1 : 0));
    setExpanded(null);
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

  const toggleExpand = (index: number) => {
    if (expanded === index) {
      // Quand on clique sur une carte déjà élargie, ouvrir la modale
      const item = parcoursData[currentSection].items[index];
      openModal(item, parcoursData[currentSection].section, index);
    } else {
      setExpanded(index);
    }
  };

  // Image mapping for items
  const getImageSrc = (title: string) => {
    const imageMap: Record<string, string> = {
      "Développeur Web/Web mobile": "/assets/parcours/dwwm.jpg",
      "BTS Technico-Commercial": "/assets/parcours/bts-tc.jpg",
      "Baccalauréat STI génie productique mécanique": "/assets/parcours/bac-sti.jpg",
      "BEP Electronique": "/assets/parcours/bep-elec.jpg",
      "Conseiller de vente Equipements de la Maison": "/assets/parcours/conseiller.jpg",
      "Conseiller de vente en téléphonie": "/assets/parcours/telecom.jpg",
      "Vendeur logithèque": "/assets/parcours/vendeur-fnac.jpg"
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
      <Header />
      
      {/* Titre principal */}
      <div className="pt-16 pb-1 text-center">
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
      
      {/* Navigation des sections */}
      <div className="flex justify-center mb-1 px-4">
        <div className="flex gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
          {parcoursData.map((section, index) => (
            <motion.button
              key={section.section}
              onClick={() => {
                setCurrentSection(index);
                setExpanded(null);
              }}
              className={`px-2 py-1 rounded-full whitespace-nowrap text-xs md:text-sm ${
                currentSection === index 
                  ? 'bg-accent text-white' 
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-1">{section.icon}</span>
              {section.section}
            </motion.button>
          ))}
        </div>
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
                  const isExpanded = expanded === index;
                  
                  return (
                    <motion.div
                      key={index}
                      className="relative h-[75vh] overflow-hidden rounded-xl cursor-pointer border-2 border-white/30 shadow-lg backdrop-blur-sm bg-white/5 flex-shrink-0"
                      variants={cardVariants}
                      initial="initial"
                      animate={isExpanded ? "expanded" : "initial"}
                      whileHover={!isExpanded ? "hover" : "expanded"}
                      onClick={() => toggleExpand(index)}
                      style={{
                        boxShadow: isExpanded ? "0 25px 50px -12px rgba(0, 0, 0, 0.7)" : "0 10px 15px -3px rgba(0, 0, 0, 0.3)"
                      }}
                    >
                      {/* Image portrait en background */}
                      <div className="absolute inset-0 w-full h-full transition-all duration-500">
                        <Image 
                          src={imageSrc} 
                          alt={item.title}
                          fill
                          style={{ 
                            objectFit: isExpanded ? 'contain' : 'cover', 
                            objectPosition: 'center',
                            transition: 'all 0.5s ease'
                          }}
                          priority
                        />
                        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-500 ${isExpanded ? 'opacity-0' : 'opacity-100'}`} />
                      </div>
                      
                      {/* Titre vertical quand carte non expandée */}
                      {!isExpanded && (
                        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                          <div className="hidden sm:flex md:hidden rotate-90 whitespace-nowrap text-3xl font-bold text-white drop-shadow-lg truncate max-w-[650px]">
                            {getTruncatedTitle(item.title, 'sm')}
                          </div>
                          <div className="hidden md:flex lg:hidden rotate-90 whitespace-nowrap text-4xl font-bold text-white drop-shadow-lg truncate max-w-[700px]">
                            {getTruncatedTitle(item.title, 'md')}
                          </div>
                          <div className="hidden lg:flex rotate-90 whitespace-nowrap text-5xl font-bold text-white drop-shadow-lg truncate max-w-[750px]">
                            {getTruncatedTitle(item.title, 'lg')}
                          </div>
                          <div className="flex sm:hidden rotate-90 whitespace-nowrap text-2xl font-bold text-white drop-shadow-lg truncate max-w-[600px]">
                            {getTruncatedTitle(item.title, 'sm')}
                          </div>
                        </div>
                      )}
                      
                      {/* Contenu quand carte expandée */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div 
                            className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent"
                            variants={labelVariants}
                            initial="initial"
                            animate="expanded"
                          >
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white drop-shadow-lg">{item.title}</h3>
                            {item.date && <p className="text-lg md:text-xl text-white/90 mb-2">{item.date}</p>}
                            {item.lieu && <p className="text-lg md:text-xl text-white/90 mb-4">{item.lieu}</p>}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
        
        {/* Boutons navigation */}
        <motion.button
          className="absolute left-1 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center z-10 border border-white/30"
          onClick={handlePrevious}
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
          whileTap={{ scale: 0.9 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
        
        <motion.button
          className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center z-10 border border-white/30"
          onClick={handleNext}
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
          whileTap={{ scale: 0.9 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </div>
      
      {/* Indicateur de section actuelle et bouton retour */}
      <div className="py-2 flex items-center justify-center">
        <div className="flex gap-2 mr-6">
          {parcoursData.map((_, index) => (
            <motion.button
              key={index}
              className={`w-1.5 h-1.5 rounded-full ${currentSection === index ? 'bg-accent' : 'bg-white/30'}`}
              onClick={() => {
                setCurrentSection(index);
                setExpanded(null);
              }}
              whileHover={{ scale: 1.5 }}
            />
          ))}
        </div>
        
        <Link 
          href="/"
          className="inline-block px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg transition-all duration-300"
        >
          Retour à l'accueil
        </Link>
      </div>
      
      <Footer />
      
      {/* Modal pour afficher les détails */}
      {selectedItem && (
        <Modal 
          open={modalOpen} 
          onClose={() => setModalOpen(false)} 
          title={selectedItem.title}
          imageSrc={getImageSrc(selectedItem.title)}
        >
          <div className="space-y-4">
            {selectedItem.date && (
              <div>
                <h4 className="text-sm font-medium text-gray-dark mb-1">Période</h4>
                <p className="bg-accent/5 p-2 rounded-md border border-accent-light">{selectedItem.date}</p>
              </div>
            )}
            
            {selectedItem.lieu && (
              <div>
                <h4 className="text-sm font-medium text-gray-dark mb-1">Lieu</h4>
                <p className="bg-accent/5 p-2 rounded-md border border-accent-light">{selectedItem.lieu}</p>
              </div>
            )}
            
            <div>
              <h4 className="text-sm font-medium text-gray-dark mb-1">Catégorie</h4>
              <p className="bg-accent/5 p-2 rounded-md border border-accent-light flex items-center">
                <span className="mr-2">{parcoursData.find(s => s.section === selectedItem.section)?.icon}</span>
                {selectedItem.section}
              </p>
            </div>
            
            {selectedItem.contact && (
              <div>
                <h4 className="text-sm font-medium text-gray-dark mb-1">Contact</h4>
                <p className="bg-accent/5 p-2 rounded-md border border-accent-light">
                  {selectedItem.contact.includes('@') ? (
                    <a href={`mailto:${selectedItem.contact}`} className="text-accent hover:underline">
                      {selectedItem.contact}
                    </a>
                  ) : (
                    <a href={selectedItem.contact} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
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