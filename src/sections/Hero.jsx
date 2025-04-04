import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Composant pour les boutons de navigation
const NavigationButton = ({ id, children, variant = 'primary', isLink = false, href = '' }) => {
  const handleScrollTo = (targetId) => {
    const element = document.getElementById(targetId.replace('#', ''));
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLink) {
    return (
      <Link href={href} className={`btn btn-${variant} mouse-effect`}>
        {children}
      </Link>
    );
  }

  return (
    <button 
      onClick={() => handleScrollTo(id)}
      className={`btn btn-${variant} mouse-effect`}
    >
      {children}
    </button>
  );
};

// Composant pour les points décoratifs
const DecorativeGrid = ({ count = 9 }) => (
  <div className="absolute bottom-10 left-10 grid grid-cols-3 gap-2 child-effect">
    {[...Array(count)].map((_, i) => (
      <div key={i} className="w-1.5 h-1.5 bg-accent/30 rounded-full"></div>
    ))}
  </div>
);

// Composant pour le portrait
const Portrait = () => (
  <div className="fade-in-up stagger-2 relative">
    <div className="relative max-w-md mx-auto md:mx-0 overflow-hidden flex items-center justify-center mouse-effect">
      {/* Arrière-plan avec cadre décoratif */}
      <div className="absolute inset-6 md:inset-10 bg-accent/5 rounded-2xl -z-10 border border-accent-light/20"></div>
      
      {/* Image principale */}
      <div className="relative w-full p-4 md:p-8 mouse-effect-children">
        <div className="relative rounded-xl overflow-hidden border border-accent-light/30 shadow-soft child-effect">
          <div className="bg-accent-light/10 flex items-center justify-center">
            <Image 
              src="/assets/img-profil.jpg" 
              alt="Photo de profil"
              width={400}
              height={500}
              priority
              className="w-auto h-auto"
            />
          </div>
        </div>
      </div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-0 left-1/4 w-16 h-16 bg-accent/20 rounded-full blur-xl child-effect"></div>
      <div className="absolute bottom-12 -right-6 w-24 h-24 bg-accent/20 rounded-full blur-xl child-effect"></div>
      
      {/* Points décoratifs */}
      <DecorativeGrid />
    </div>
  </div>
);

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-16 pb-16 md:pt-24 md:pb-24">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 order-2 md:order-1">
            <div className="fade-in-up stagger-1 mouse-effect-children relative">
              <span className="badge mb-4 inline-block child-effect">Développeur Web</span>
              
              <h1 className="mb-2 leading-tight child-effect">
                <span className="text-accent">Fabien Charbonnelle</span>
              </h1>
              <p>
              Toujours en quête de nouvelles opportunités,
              je souhaite mettre mon énergie et ma créativité au service de projets concrets,
              au sein d'une entreprise innovante et dynamique.
              </p>
              <p className="text-gray-dark text-lg mb-8 max-w-2xl child-effect">
              Développeur web polyvalent avec une vraie appétence pour l'IA, 
              j'aime transformer les idées en produits concrets. 
              Curieux, autonome et à l'aise sur des stacks modernes, 
              je cherche à rejoindre une équipe tech ambitieuse où 
              je peux apporter de la valeur tout en continuant à monter en compétences.
              </p>
            </div>
          </div>
          
          <div className="md:col-span-5 order-1 md:order-2">
            <Portrait />
          </div>
        </div>
      </div>
    </section>
  );
} 