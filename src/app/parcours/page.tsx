'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';
import { parcoursData, ParcoursItem } from '@/data/parcoursData';
import { motion } from 'framer-motion';

export default function Parcours() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ParcoursItem & { section: string } | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const openModal = (item: ParcoursItem, section: string) => {
    setSelectedItem({ ...item, section });
    setModalOpen(true);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Variants pour les animations Framer Motion
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  const iconVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.2, rotate: 5, transition: { duration: 0.3 } }
  };

  return (
    <div className="relative">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="container-narrow mx-auto">
          <motion.div 
            className="max-w-2xl mx-auto mb-12 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
              Mon Parcours
              <motion.span 
                className="absolute -bottom-2 left-0 w-full h-1 bg-accent-light"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              ></motion.span>
            </h1>
            <motion.p 
              className="text-gray-dark"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Découvrez mon parcours professionnel, mes formations et mes compétences.
              Cliquez sur chaque élément pour voir plus de détails.
            </motion.p>
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link 
                href="/assets/documents/cv.pdf" 
                target="_blank"
                className="btn btn-outline"
              >
                Télécharger mon CV complet
              </Link>
            </motion.div>
          </motion.div>
          
          {parcoursData.map((section, sectionIndex) => (
            <motion.div 
              key={section.section} 
              className="mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={sectionIndex}
              variants={sectionVariants}
            >
              <div className="flex items-center mb-4">
                <motion.div 
                  className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mr-4 shadow-soft"
                  whileHover="hover"
                  initial="initial"
                  variants={iconVariants}
                >
                  <span className="text-accent">{section.icon}</span>
                </motion.div>
                <h2 className="text-2xl font-medium">{section.section}</h2>
              </div>
              
              <div className="pl-14 space-y-4">
                {section.items.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="card border border-gray-light hover:border-accent/30 hover:bg-accent/5 transition-all shadow-soft"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    custom={index}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.02, 
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" 
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <motion.h3 
                          className="text-lg font-medium mb-1 text-accent hover:underline cursor-pointer"
                          onClick={() => openModal(item, section.section)}
                          whileHover={{ x: 5 }}
                        >
                          {item.title}
                        </motion.h3>
                        {item.lieu && <p className="text-gray-dark">{item.lieu}</p>}
                        {item.contact && (
                          <p className="text-gray-dark">
                            Contact: {item.contact.includes('@') ? (
                              <a href={`mailto:${item.contact}`} className="text-accent hover:underline">
                                {item.contact}
                              </a>
                            ) : (
                              <a href={item.contact} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                                Profil LinkedIn
                              </a>
                            )}
                          </p>
                        )}
                      </div>
                      {item.date && (
                        <motion.span 
                          className="badge"
                          whileHover={{ scale: 1.1, y: -2 }}
                        >
                          {item.date}
                        </motion.span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
          
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="btn btn-primary">
              Retour à l'accueil
            </Link>
          </motion.div>
        </div>
      </main>
      
      {/* Bouton de retour en haut */}
      <motion.button 
        onClick={scrollToTop}
        className={`fixed right-6 bottom-6 w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center shadow-button transition-all duration-300 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Retour en haut"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.button>
      
      {selectedItem && (
        <Modal 
          open={modalOpen} 
          onClose={() => setModalOpen(false)} 
          title={selectedItem.title}
          imageSrc={selectedItem.title === "Conseiller de vente Equipements de la Maison" 
            ? "/assets/parcours/conseiller.jpg" 
            : selectedItem.title === "Conseiller de vente en téléphonie"
            ? "/assets/parcours/telecom.jpg"
            : selectedItem.title === "Développeur Web/Web mobile"
            ? "/assets/parcours/dwwm.jpg"
            : selectedItem.title === "BEP Electronique"
            ? "/assets/parcours/bep-elec.jpg"
            : selectedItem.title === "BTS Technico-Commercial"
            ? "/assets/parcours/bts-tc.jpg"
            : selectedItem.title === "Baccalauréat STI génie productique mécanique"
            ? "/assets/parcours/bac-sti.jpg"
            : undefined}
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
                      Voir le profil LinkedIn
                    </a>
                  )}
                </p>
              </div>
            )}
            
            <div className="pt-4 border-t border-gray-light mt-4">
              <p className="text-gray-dark italic">
                Cliquez en dehors de cette fenêtre ou appuyez sur ESC pour la fermer.
              </p>
            </div>
          </div>
        </Modal>
      )}
      
      <Footer />
    </div>
  );
} 