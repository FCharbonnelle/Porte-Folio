import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { generateFloatingAnimation, interactiveHoverAnimation } from '../utils/animationUtils';

// Définition des sections de navigation
const NAV_SECTIONS = [
  { id: 'hero', label: 'Accueil', isRoute: false },
  { id: 'parcours', label: 'Mon Parcours / CV', isRoute: true, route: '/parcours' },
  { id: 'contact', label: 'Me Contacter', isRoute: false }
];

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (section) => {
    setIsMenuOpen(false);
    if (section.isRoute) {
      router.push(section.route);
    } else {
      document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKeyDown = (e, section) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNavigation(section);
    }
  };

  // Composant pour le bouton de navigation
  const NavButton = ({ section, isMobile = false, index = 0 }) => {
    // Options d'animation différentes selon le type de bouton
    const animationProps = section.id === 'contact' 
      ? { 
          ...interactiveHoverAnimation,
          animate: generateFloatingAnimation(index, { intensity: 0.6, enableRotate: false })
        } 
      : {
          whileHover: { scale: 1.05, y: -3, transition: { duration: 0.2 } },
          animate: generateFloatingAnimation(index, { intensity: 0.2, enableRotate: false })
        };
    
    return (
      <motion.button
        className={isMobile 
          ? "py-4 text-white text-xl font-semibold border-b border-gray-light/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent text-left transition-all duration-200 hover:pl-2 hover:text-accent"
          : section.id === 'contact'
            ? "btn btn-primary flex items-center justify-center px-6 py-2 text-white font-medium rounded-md shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all duration-300"
            : "nav-link font-semibold text-white hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md px-5 py-3 text-xl transition-all duration-200 tracking-wide shadow-sm hover:shadow-md"
        }
        onClick={() => handleNavigation(section)}
        onKeyDown={(e) => handleKeyDown(e, section)}
        tabIndex={isMobile && !isMenuOpen ? -1 : 0}
        style={isMobile ? { transitionDelay: `${index * 50}ms` } : {}}
        {...animationProps}
      >
        {section.label}
      </motion.button>
    );
  };

  return (
    <header
      className={`fixed top-0 z-50 transition-all duration-300 ${
        isSticky 
          ? 'glass shadow-soft h-16 rounded-full left-1/2 transform -translate-x-1/2 w-auto max-w-[95%] md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] mt-2' 
          : 'bg-transparent h-24 w-full left-0'
      }`}
    >
      <div className={`h-full px-6 flex items-center justify-between ${
        isSticky ? 'container mx-auto' : 'container-wide'
      }`}>
        {/* Logo */}
        <Link href="/" className="relative z-10 group">
          <motion.div 
            className="font-space font-bold text-2xl tracking-tight flex items-center"
            animate={generateFloatingAnimation(0, { intensity: 0.2, enableRotate: false })}
          >
            <motion.div 
              className="h-10 w-10 mr-3 rounded-full overflow-hidden border border-accent-light/40 relative"
              whileHover={{ scale: 1.1, rotate: 5, transition: { duration: 0.3 } }}
            >
              <div 
                className="w-full h-full bg-accent/20 flex items-center justify-center"
                style={{
                  backgroundImage: 'url("/assets/img-profil.jpg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <span className="text-xs font-bold text-white">FC</span>
              </div>
            </motion.div>
            <span className="text-accent">D</span>
            <span className="ml-1 group-hover:text-accent transition-colors duration-300 text-2xl text-white font-bold">éveloppeur Web</span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></div>
          </motion.div>
        </Link>

        {/* Bouton menu mobile */}
        <motion.button
          className="md:hidden relative z-10 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={isMenuOpen}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
        >
          <div className="w-6 flex flex-col gap-1.5">
            <motion.span
              className={`block h-0.5 bg-foreground rounded-full origin-center transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <motion.span
              className={`block h-0.5 bg-foreground rounded-full transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <motion.span
              className={`block h-0.5 bg-foreground rounded-full origin-center transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </div>
        </motion.button>

        {/* Navigation desktop */}
        <nav className="hidden md:flex items-center justify-center gap-12 mx-auto">
          {NAV_SECTIONS.map((section, index) => (
            <NavButton key={section.id} section={section} index={index} />
          ))}
        </nav>

        {/* Navigation mobile */}
        <motion.div
          className={`md:hidden fixed inset-0 glass pt-24 px-6 transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
          }`}
          initial={{ opacity: 0, x: '100%' }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0, 
            x: isMenuOpen ? 0 : '100%',
            transition: { duration: 0.3 }
          }}
        >
          <div className="flex flex-col gap-4">
            {NAV_SECTIONS.map((section, index) => (
              <NavButton key={section.id} section={section} isMobile={true} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </header>
  );
} 