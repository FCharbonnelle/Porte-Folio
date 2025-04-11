'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Modal from '@/components/Modal';
import { parcoursData, ParcoursItem } from '@/data/parcoursData';
import { motion, useAnimation, useMotionValue, AnimatePresence } from 'framer-motion';
import { generateFloatingAnimation } from '@/utils/animationUtils';

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

  const getSummaryForItem = (item: ParcoursItem & { section?: string }): string => {
    // Créer un résumé adapté à chaque élément avec un contenu plus étoffé
    if (!item.section) return "";
    
    // Descriptions spécifiques pour chaque élément basées sur le titre
    const specificDescriptions: Record<string, string> = {
      // Diplômes et Formations
      "Développeur Web/Web mobile": "Formation intensive certifiante de développeur web et mobile incluant front-end (HTML, CSS, JavaScript, React), back-end (Node.js, API REST), et méthodologies agiles. Des projets concrets sont réalisés tout au long du parcours.",
      "BTS Technico-Commercial": "Formation commerciale et technique de niveau bac+2 offrant des compétences en négociation, marketing, gestion et une forte dimension technique spécialisée.",
      "Baccalauréat STI génie productique mécanique": "Formation de niveau bac orientée vers les sciences et technologies industrielles avec spécialisation en productique mécanique, alliant théorie et pratique en atelier.",
      "BEP Electronique": "Formation aux fondamentaux de l'électronique incluant la lecture de schémas, le montage et dépannage de circuits électroniques, et l'utilisation d'appareils de mesure.",
      
      // Expériences professionnelles
      "Conseiller de vente Equipements de la Maison": "Responsable du conseil, de la vente et du service après-vente pour le rayon équipement de la maison. Gestion des stocks, animations commerciales et fidélisation de la clientèle.",
      "Conseiller de vente en téléphonie": "Expert en solutions de téléphonie mobile, conseils personnalisés sur les forfaits et appareils, configuration des terminaux et service après-vente.",
      "Vendeur logithèque": "Conseil client sur les logiciels, jeux vidéo et produits high-tech. Animation des rayons et veille concurrentielle pour adapter l'offre aux tendances.",
      "Vendeur matériel Informatique et Musique": "Spécialiste de la vente de matériel informatique d'occasion et d'instruments de musique. Diagnostic, réparation et remise en état des équipements.",
      
      // Compétences
      "Créer, élaborer et identifier des concepts innovants": "Capacité à générer des idées originales et à les transformer en solutions concrètes, avec une approche méthodique de l'innovation.",
      "Actualiser régulièrement ses connaissances": "Veille technologique et formation continue pour maintenir un niveau d'expertise élevé dans un environnement en constante évolution.",
      "Recueillir et analyser les besoins client": "Écoute active et analyse fine des attentes exprimées ou implicites pour proposer des solutions adaptées et pertinentes.",
      "Présenter et valoriser un produit ou un service": "Communication persuasive et techniques de présentation efficaces pour mettre en avant les bénéfices d'une offre.",
      "Accompagner l'appropriation d'un outil par ses utilisateurs": "Pédagogie et patience pour former les utilisateurs et assurer une adoption réussie des nouveaux outils.",
      
      // Langues
      "Français": "Langue maternelle maîtrisée à l'écrit comme à l'oral, avec des compétences rédactionnelles et une bonne élocution.",
      "Anglais": "Niveau B1/B2 permettant une communication professionnelle efficace, une compréhension des documents techniques et la participation à des réunions internationales.",
      
      // Atouts
      "Travailler en équipe": "Collaboration efficace dans des environnements variés, avec une capacité à partager des connaissances et à contribuer positivement à la dynamique collective.",
      "S'adapter aux changements": "Flexibilité et résilience face aux évolutions, avec une capacité à rester performant dans des contextes mouvants.",
      "Faire preuve de curiosité": "Intérêt constant pour l'apprentissage et la découverte, recherche proactive de nouvelles connaissances et méthodes.",
      "Faire preuve de créativité, d'inventivité": "Approche novatrice des problèmes, génération d'idées originales et capacité à penser 'hors des sentiers battus'.",
      "Faire preuve de persévérance": "Détermination face aux obstacles, capacité à maintenir l'effort dans la durée pour atteindre les objectifs fixés.",
      "Faire preuve de rigueur et de précision": "Méthodologie et attention aux détails, garantissant fiabilité et qualité dans la réalisation des tâches.",
      "Gérer son stress": "Maîtrise des émotions et capacité à rester efficace sous pression, avec des techniques personnelles de gestion du stress.",
      
      // Centres d'intérêt
      "Sorties entre amis": "Moments de convivialité et d'échange qui nourrissent ma créativité et maintiennent un équilibre entre vie professionnelle et personnelle.",
      "Bowling, Billard, Basketball": "Pratique régulière de ces activités développant coordination, précision et esprit d'équipe, compétences transférables au contexte professionnel.",
      "Jeux vidéos multi-joueurs en ligne": "Participation à des communautés de joueurs permettant de développer stratégie, réactivité et collaboration à distance."
    };
    
    // Retourner la description spécifique si elle existe, sinon générer une description générique
    if (specificDescriptions[item.title]) {
      return specificDescriptions[item.title];
    }
    
    // Descriptions génériques par section si aucune description spécifique n'est disponible
    switch (item.section) {
      case "Diplômes et Formations":
        return `Formation suivie ${item.date || ""} ${item.lieu ? `au ${item.lieu}` : ""}, offrant des compétences théoriques et pratiques dans le domaine concerné.`;
      
      case "Expériences professionnelles":
        return `Poste occupé ${item.date || ""} ${item.lieu ? `chez ${item.lieu}` : ""}, développant expertise technique et compétences relationnelles.`;
      
      case "Compétences":
        return "Compétence acquise au fil de mes expériences professionnelles et perfectionnée par une pratique régulière.";
      
      case "Langues":
        return "Compétence linguistique permettant d'échanger et de communiquer dans des contextes variés.";
      
      case "Atouts":
        return "Qualité personnelle cultivée au fil du temps et mise en pratique quotidiennement dans mes activités professionnelles.";
      
      case "Centres d'intérêt":
        return "Activité pratiquée régulièrement pendant mon temps libre, source d'équilibre et de développement personnel.";
      
      default:
        return "";
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background to-background-secondary text-white flex flex-col">
      
      {/* Titre principal */}
      <div className="pt-12 pb-6 text-center">
        <motion.h1 
          className="text-3xl md:text-5xl lg:text-6xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Mon Parcours
        </motion.h1>
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
                      animate={{ ...floatingAnim }}
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
          className="absolute left-1 top-1/2 -translate-y-1/2 flex items-center justify-center gap-1 pl-1 pr-3 h-16 rounded-full glass shadow-soft backdrop-blur-md text-white z-10 border border-white/20"
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
          <span className="hidden sm:inline text-base md:text-lg font-medium">
            {parcoursData[(currentSection > 0 ? currentSection - 1 : parcoursData.length - 1)].section}
          </span>
        </motion.button>
        
        <motion.button
          className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center gap-1 pl-3 pr-1 h-16 rounded-full glass shadow-soft backdrop-blur-md text-white z-10 border border-white/20"
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
          <span className="hidden sm:inline text-base md:text-lg font-medium">
            {parcoursData[(currentSection < parcoursData.length - 1 ? currentSection + 1 : 0)].section}
          </span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </div>
      
      {/* Indicateur de section actuelle et bouton retour */}
      <div className="py-2 flex items-center justify-center mb-3">
        <motion.div 
          className="glass shadow-soft rounded-full px-8 flex items-center justify-center gap-8 backdrop-blur-md bg-white/10 border border-white/20 h-16 w-auto max-w-[95%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <AnimatePresence mode="wait">
            <motion.button
              key={currentSection}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-white text-base md:text-lg font-medium flex items-center justify-center hover:text-accent transition-colors"
              onClick={() => {
                const item = parcoursData[currentSection].items[0];
                openModal(item, parcoursData[currentSection].section, 0);
              }}
            >
              <span className="mr-2 flex items-center justify-center">{parcoursData[currentSection].icon}</span>
              <span>{parcoursData[currentSection].section}</span>
            </motion.button>
          </AnimatePresence>
          
          <div className="h-8 w-px bg-white/30" />
        
          <Link 
            href="/"
            className="text-white text-base md:text-lg hover:text-accent transition-colors flex items-center justify-center"
          >
            Accueil
          </Link>
        </motion.div>
      </div>
      
      {/* Modal pour afficher les détails */}
      {selectedItem && (
        <Modal 
          open={modalOpen} 
          onClose={() => setModalOpen(false)} 
          title={selectedItem.title}
          summary={getSummaryForItem(selectedItem)}
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