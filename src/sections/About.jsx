import React from 'react';
import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container-narrow">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
          {/* Image column */}
          <div className="md:col-span-5 order-2 md:order-1">
            <div className="relative mouse-effect">
              {/* Image with decorative frame */}
              <div className="relative border border-accent-light/40 rounded-lg overflow-hidden shadow-soft">
                {/* Option 1: Utilisation du style avec backgroundImage */}
                {/* <div 
                  className="w-full aspect-[4/5]"
                  style={{
                    backgroundImage: 'url("/assets/img-profil.jpg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></div> */}
                
                {/* Option 2: Utilisation du composant Image de Next.js */}
                <div className="w-full aspect-[4/5] relative">
                  <Image 
                    src="/assets/about-image.jpg" 
                    alt="Photo de profil avec ordinateur" 
                    fill 
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-accent rounded-lg -z-10 child-effect" />
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent/10 rounded-lg -z-10 child-effect" />
            </div>
          </div>

          {/* Content column */}
          <div className="md:col-span-7 order-1 md:order-2 mouse-effect-children">
            <div className="mb-2 child-effect">
              <span className="badge text-sm">À propos de moi</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 child-effect">Développeur Web</h2>
            
            <div className="space-y-4 text-gray-dark child-effect">
              <p>
              Fort d’une expérience de près de 20 ans en tant que conseiller de vente dans le domaine des équipements,
               j’ai développé un excellent sens du contact, une écoute active et une forte capacité à comprendre les besoins des clients.
                Ce parcours m’a permis d’acquérir des compétences relationnelles solides, 
                essentielles dans tout environnement professionnel, 
                ainsi qu’un vrai goût pour la satisfaction client et le travail bien fait.
              </p>
              <p>
              Animé par une passion de longue date pour les nouvelles technologies,
               le numérique et l’intelligence artificielle, j’ai entrepris une reconversion dans le développement web et web mobile.
                Ce choix a été motivé par ma curiosité naturelle, mon envie d’apprendre en continu 
                et ma volonté de participer à la création de solutions innovantes et accessibles.
                 Aujourd’hui, je maîtrise les bases solides du développement front-end et back-end,
                  avec une attention particulière portée à l’expérience utilisateur.
              </p>
              <p>
              Ce changement de cap représente bien plus qu’une évolution professionnelle : c’est un vrai projet de vie qui me permet de m’épanouir dans un domaine en constante évolution. Je suis désormais prêt à mettre mes compétences techniques, mon sens du relationnel et ma passion pour le digital au service d’équipes dynamiques et de projets porteurs de sens.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8 child-effect">
              <div className="border border-accent-light/30 rounded-lg p-4 bg-accent/5 shadow-soft mouse-effect">
                <div className="text-accent font-medium text-2xl">1+</div>
                <div className="text-sm text-gray-dark">An en formation</div>
              </div>
              <div className="border border-accent-light/30 rounded-lg p-4 bg-accent/5 shadow-soft mouse-effect">
                <div className="text-accent font-medium text-2xl">5+</div>
                <div className="text-sm text-gray-dark">Projets personnels</div>
              </div>
              <div className="border border-accent-light/30 rounded-lg p-4 bg-accent/5 shadow-soft mouse-effect">
                <div className="text-accent font-medium text-2xl">100%</div>
                <div className="text-sm text-gray-dark">Motivation à apprendre</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 