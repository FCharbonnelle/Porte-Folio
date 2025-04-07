'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';
import { parcoursData, ParcoursItem } from '@/data/parcoursData';

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

  return (
    <div className="relative">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="container-narrow mx-auto">
          <div className="max-w-2xl mx-auto mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 relative inline-block">
              Mon Parcours
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-accent-light"></span>
            </h1>
            <p className="text-gray-dark">
              Découvrez mon parcours professionnel, mes formations et mes compétences.
              Cliquez sur chaque élément pour voir plus de détails.
            </p>
            <div className="mt-6">
              <Link 
                href="/assets/documents/cv.pdf" 
                target="_blank"
                className="btn btn-outline"
              >
                Télécharger mon CV complet
              </Link>
            </div>
          </div>
          
          {parcoursData.map((section, sectionIndex) => (
            <div key={section.section} className="mb-12 fade-in" style={{ animationDelay: `${sectionIndex * 100}ms` }}>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mr-4 shadow-soft">
                  <span className="text-accent animate-float">{section.icon}</span>
                </div>
                <h2 className="text-2xl font-medium">{section.section}</h2>
              </div>
              
              <div className="pl-14 space-y-4">
                {section.items.map((item, index) => (
                  <div 
                    key={index}
                    className="card border border-gray-light hover:border-accent/30 hover:bg-accent/5 transition-all shadow-soft"
                    style={{ animationDelay: `${(sectionIndex * 100) + (index * 50)}ms` }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 
                          className="text-lg font-medium mb-1 text-accent hover:underline cursor-pointer"
                          onClick={() => openModal(item, section.section)}
                        >
                          {item.title}
                        </h3>
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
                        <span className="badge">{item.date}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="mt-16 text-center">
            <Link href="/" className="btn btn-primary">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </main>
      
      {/* Bouton de retour en haut */}
      <button 
        onClick={scrollToTop}
        className={`fixed right-6 bottom-6 w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center shadow-button animate-glow transition-all duration-300 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Retour en haut"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      {selectedItem && (
        <Modal 
          open={modalOpen} 
          onClose={() => setModalOpen(false)} 
          title={selectedItem.title}
          imageSrc={selectedItem.title === "Conseiller de vente Equipements de la Maison" 
            ? "/assets/parcours/conseiller.jpg"
            : selectedItem.title === "Conseiller de vente en téléphonie"
            ? "/assets/parcours/conseiller_orange.jpg"
            : selectedItem.title === "Développeur Web/Web mobile"
            ? "/assets/parcours/dwwm.jpg"
            : selectedItem.title === "BEP Electronique"
            ? "/assets/parcours/bep-elec.jpg"
            : selectedItem.title === "BTS Technico-Commercial"
            ? "/assets/parcours/bts-tc.jpg"
            : selectedItem.title === "Baccalauréat STI génie productique mécanique"
            ? "/assets/parcours/bac-sti.jpg"
            : selectedItem.title === "Vendeur logithèque"
            ? "/assets/parcours/vendeur-fnac.jpg"
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