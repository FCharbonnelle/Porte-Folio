'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';
import { parcoursData, ParcoursItem } from '@/data/parcoursData';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function Parcours() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ParcoursItem & { section: string } | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
  const titleVariants = {
    hidden: { opacity: 0, y: -50, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 0.8, 
        ease: [0.6, 0.05, -0.01, 0.9] 
      }
    }
  };

  const underlineVariants = {
    hidden: { width: 0, x: "-50%" },
    visible: { 
      width: "120%", 
      x: "-10%",
      transition: { 
        delay: 0.5, 
        duration: 1.2, 
        ease: "easeOut" 
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    })
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -40,
      borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      borderRadius: "12px",
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        type: "spring",
        stiffness: 200
      }
    }),
    hover: { 
      scale: 1.03, 
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      borderRadius: "10px 14px 12px 16px / 14px 12px 16px 10px",
      y: -5,
      transition: { duration: 0.3 }
    }
  };

  const iconContainerVariants = {
    initial: { borderRadius: "50%" },
    hover: { 
      scale: 1.2, 
      rotate: [0, 10, -10, 0],
      boxShadow: "0 0 15px rgba(126, 58, 253, 0.5)",
      transition: { 
        duration: 0.6,
        repeat: Infinity,
        repeatType: "mirror" as const
      }
    }
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: [1, 1.2, 1], 
      rotate: [0, 15, -15, 0],
      transition: { 
        duration: 1.5,
        repeat: Infinity,
        repeatType: "mirror" as const
      } 
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.8, 
        duration: 0.6, 
        type: "spring" 
      }
    },
    hover: { 
      scale: 1.05, 
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 }
    },
    tap: { 
      scale: 0.95,
      boxShadow: "0 5px 15px -5px rgba(0, 0, 0, 0.1)"
    }
  };

  const badgeVariants = {
    initial: { 
      backgroundColor: "rgba(126, 58, 253, 0.1)",
      color: "#7e3afd"
    },
    hover: { 
      scale: 1.1,
      y: -3,
      backgroundColor: "rgba(126, 58, 253, 0.2)",
      boxShadow: "0 5px 15px -5px rgba(126, 58, 253, 0.3)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="relative">
      <Header />
      
      {/* Barre de progression du défilement */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-50 origin-left"
        style={{ scaleX }}
      />
      
      <main className="pt-24 pb-16 px-4">
        <div className="container-narrow mx-auto">
          <motion.div 
            className="max-w-2xl mx-auto mb-16 text-center"
            initial="hidden"
            animate="visible"
            variants={titleVariants}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
              Mon Parcours
              <motion.span 
                className="absolute -bottom-2 left-0 h-1 bg-accent-light"
                initial="hidden"
                animate="visible"
                variants={underlineVariants}
              ></motion.span>
            </h1>
            <motion.p 
              className="text-gray-dark"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Découvrez mon parcours professionnel, mes formations et mes compétences.
              Cliquez sur chaque élément pour voir plus de détails.
            </motion.p>
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <motion.a 
                href="/assets/documents/cv.pdf" 
                target="_blank"
                className="btn btn-outline"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 5, transition: { repeat: Infinity, repeatType: "mirror", duration: 0.5 } }}
                >
                  Télécharger mon CV complet
                </motion.span>
              </motion.a>
            </motion.div>
          </motion.div>
          
          {parcoursData.map((section, sectionIndex) => (
            <motion.div 
              key={section.section} 
              className="mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={sectionIndex}
              variants={sectionVariants}
            >
              <div className="flex items-center mb-6">
                <motion.div 
                  className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mr-4 shadow-soft overflow-hidden"
                  whileHover="hover"
                  initial="initial"
                  variants={iconContainerVariants}
                >
                  <motion.span 
                    className="text-accent text-xl"
                    variants={iconVariants}
                  >
                    {section.icon}
                  </motion.span>
                </motion.div>
                <motion.h2 
                  className="text-2xl font-medium bg-clip-text bg-gradient-to-r from-accent to-accent-light"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.03, 
                    textShadow: "0 0 8px rgba(126, 58, 253, 0.3)",
                  }}
                >
                  {section.section}
                </motion.h2>
              </div>
              
              <div className="pl-16 space-y-5">
                {section.items.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="card border border-gray-light hover:border-accent/30 hover:bg-accent/5 transition-all shadow-soft mouse-effect"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    custom={index}
                    variants={itemVariants}
                    whileHover="hover"
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex justify-between items-start flex-wrap md:flex-nowrap">
                      <div className="flex-grow">
                        <motion.h3 
                          className="text-lg font-medium mb-1 text-accent hover:underline cursor-pointer"
                          onClick={() => openModal(item, section.section)}
                          whileHover={{ 
                            x: 5, 
                            textShadow: "0 0 8px rgba(126, 58, 253, 0.3)",
                            scale: 1.02
                          }}
                        >
                          {item.title}
                        </motion.h3>
                        {item.lieu && (
                          <motion.p 
                            className="text-gray-dark"
                            initial={{ opacity: 0.8 }}
                            whileHover={{ opacity: 1 }}
                          >
                            {item.lieu}
                          </motion.p>
                        )}
                        {item.contact && (
                          <motion.p 
                            className="text-gray-dark mt-2"
                            initial={{ opacity: 0.8 }}
                            whileHover={{ opacity: 1 }}
                          >
                            Contact: {item.contact.includes('@') ? (
                              <a href={`mailto:${item.contact}`} className="text-accent hover:underline">
                                {item.contact}
                              </a>
                            ) : (
                              <a href={item.contact} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                                Profil LinkedIn
                              </a>
                            )}
                          </motion.p>
                        )}
                      </div>
                      {item.date && (
                        <motion.span 
                          className="badge"
                          variants={badgeVariants}
                          whileHover="hover"
                          initial="initial"
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
            className="mt-20 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link href="/" className="btn btn-primary">
              <motion.span
                initial={{ x: 0 }}
                whileHover={{ x: -10, transition: { repeat: Infinity, repeatType: "mirror", duration: 0.7 } }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-2 feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              </motion.span>
              Retour à l'accueil
            </Link>
          </motion.div>
        </div>
      </main>
      
      {/* Bouton de retour en haut */}
      <motion.button 
        onClick={scrollToTop}
        className={`fixed right-6 bottom-6 w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center shadow-button transition-all duration-300 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Retour en haut"
        whileHover={{ 
          scale: 1.1,
          rotate: [0, 10, -10, 0],
          boxShadow: "0 0 20px rgba(126, 58, 253, 0.5)"
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={{ 
            y: [0, -3, 0],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h4 className="text-sm font-medium text-gray-dark mb-1">Période</h4>
                <motion.p 
                  className="bg-accent/5 p-2 rounded-md border border-accent-light"
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: "0 5px 15px -5px rgba(126, 58, 253, 0.2)",
                    backgroundColor: "rgba(126, 58, 253, 0.08)"
                  }}
                >{selectedItem.date}</motion.p>
              </motion.div>
            )}
            
            {selectedItem.lieu && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <h4 className="text-sm font-medium text-gray-dark mb-1">Lieu</h4>
                <motion.p 
                  className="bg-accent/5 p-2 rounded-md border border-accent-light"
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: "0 5px 15px -5px rgba(126, 58, 253, 0.2)",
                    backgroundColor: "rgba(126, 58, 253, 0.08)"
                  }}
                >{selectedItem.lieu}</motion.p>
              </motion.div>
            )}
            
            {selectedItem.contact && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <h4 className="text-sm font-medium text-gray-dark mb-1">Contact</h4>
                <motion.p 
                  className="bg-accent/5 p-2 rounded-md border border-accent-light"
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: "0 5px 15px -5px rgba(126, 58, 253, 0.2)",
                    backgroundColor: "rgba(126, 58, 253, 0.08)"
                  }}
                >
                  {selectedItem.contact.includes('@') ? (
                    <a href={`mailto:${selectedItem.contact}`} className="text-accent hover:underline">
                      {selectedItem.contact}
                    </a>
                  ) : (
                    <a href={selectedItem.contact} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                      Voir le profil LinkedIn
                    </a>
                  )}
                </motion.p>
              </motion.div>
            )}
            
            <motion.div 
              className="pt-4 border-t border-gray-light mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <p className="text-gray-dark italic">
                Cliquez en dehors de cette fenêtre ou appuyez sur ESC pour la fermer.
              </p>
            </motion.div>
          </div>
        </Modal>
      )}
      
      <Footer />
    </div>
  );
} 