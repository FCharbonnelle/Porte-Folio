import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
  const NavButton = ({ section, isMobile = false, index = 0 }) => (
    <button
      className={isMobile 
        ? "py-4 text-white text-lg font-semibold border-b border-gray-light/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent text-left transition-all duration-200 hover:pl-2 hover:text-accent"
        : "nav-link font-semibold text-white hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md px-4 py-2 text-lg transition-all duration-200 uppercase tracking-wide shadow-sm hover:shadow-md"
      }
      onClick={() => handleNavigation(section)}
      onKeyDown={(e) => handleKeyDown(e, section)}
      tabIndex={isMobile && !isMenuOpen ? -1 : 0}
      style={isMobile ? { transitionDelay: `${index * 50}ms` } : {}}
    >
      {section.label}
    </button>
  );

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isSticky ? 'glass shadow-soft h-16' : 'bg-transparent h-20'
      }`}
    >
      <div className="container-wide flex items-center justify-between h-full">
        {/* Logo */}
        <Link href="/" className="relative z-10 group">
          <div className="font-space font-bold text-xl tracking-tight flex items-center">
            <div className="h-8 w-8 mr-2 rounded-full overflow-hidden border border-accent-light/40 relative">
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
            </div>
            <span className="text-accent">D</span>
            <span className="ml-1 group-hover:text-accent transition-colors duration-300 text-xl text-white font-bold">éveloppeur Web</span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></div>
          </div>
        </Link>

        {/* Bouton menu mobile */}
        <button
          className="md:hidden relative z-10 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={isMenuOpen}
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span
              className={`block h-0.5 bg-foreground rounded-full origin-center transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`block h-0.5 bg-foreground rounded-full transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block h-0.5 bg-foreground rounded-full origin-center transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </div>
        </button>

        {/* Navigation desktop */}
        <nav className="hidden md:flex items-center justify-center gap-10 mx-auto">
          {NAV_SECTIONS.map((section) => (
            <NavButton key={section.id} section={section} />
          ))}
        </nav>

        {/* Navigation mobile */}
        <div
          className={`md:hidden fixed inset-0 glass pt-24 px-6 transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
          }`}
        >
          <div className="flex flex-col gap-4">
            {NAV_SECTIONS.map((section, index) => (
              <NavButton key={section.id} section={section} isMobile={true} index={index} />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
} 