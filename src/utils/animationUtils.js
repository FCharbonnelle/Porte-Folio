/**
 * Utilitaires d'animation pour le portfolio
 * Ces fonctions génèrent des animations cohérentes pour tous les composants
 */

/**
 * Génère une animation de flottement avec des paramètres personnalisés
 * @param {number} index - Index de l'élément pour varier l'animation
 * @param {object} options - Options de personnalisation
 * @returns {object} Configuration d'animation pour Framer Motion
 */
export const generateFloatingAnimation = (index = 0, options = {}) => {
  // Options par défaut
  const {
    intensity = 1,         // Intensité du mouvement (1 = normal, <1 = subtil, >1 = prononcé)
    speed = 1,             // Vitesse de l'animation (1 = normal, <1 = lent, >1 = rapide)
    enableX = true,        // Activer le mouvement horizontal
    enableY = true,        // Activer le mouvement vertical
    enableRotate = true,   // Activer la rotation
  } = options;

  // Valeurs légèrement différentes pour chaque élément, basées sur leur index
  const baseDelay = 0.1 + (index * 0.15) % 1;
  const baseDuration = (4 + (index % 3)) / speed;
  
  // Valeurs d'offset ajustées par l'intensité
  const yOffset = (4 + (index % 3)) * intensity;
  const xOffset = (2 + (index % 2)) * intensity;
  const rotateOffset = (0.5 + (index % 2) * 0.3) * intensity;
  
  const animation = {};
  
  if (enableY) {
    animation.y = [`${-yOffset/2}px`, `${yOffset/2}px`, `${-yOffset/2}px`];
  }
  
  if (enableX) {
    animation.x = [`${-xOffset/2}px`, `${xOffset/2}px`, `${-xOffset/2}px`];
  }
  
  if (enableRotate) {
    animation.rotate = [`${-rotateOffset/2}deg`, `${rotateOffset/2}deg`, `${-rotateOffset/2}deg`];
  }
  
  // Configuration des transitions
  const transition = {};
  
  if (enableY) {
    transition.y = {
      repeat: Infinity,
      repeatType: "loop",
      duration: baseDuration,
      ease: "easeInOut",
      delay: baseDelay,
      times: [0, 0.5, 1]
    };
  }
  
  if (enableX) {
    transition.x = {
      repeat: Infinity,
      repeatType: "loop",
      duration: baseDuration + 0.5,
      ease: "easeInOut",
      delay: baseDelay + 0.2,
      times: [0, 0.5, 1]
    };
  }
  
  if (enableRotate) {
    transition.rotate = {
      repeat: Infinity,
      repeatType: "loop",
      duration: baseDuration + 1,
      ease: "easeInOut",
      delay: baseDelay + 0.3,
      times: [0, 0.5, 1]
    };
  }
  
  animation.transition = transition;
  
  return animation;
};

/**
 * Génère une animation de pulsation simple
 * @param {number} index - Index de l'élément pour varier l'animation
 * @returns {object} Configuration d'animation pour Framer Motion
 */
export const generatePulseAnimation = (index = 0) => {
  const baseDelay = 0.1 + (index * 0.2) % 1;
  
  return {
    scale: [1, 1.03, 1],
    transition: {
      scale: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 3 + (index % 2),
        ease: "easeInOut",
        delay: baseDelay,
        times: [0, 0.5, 1]
      }
    }
  };
};

/**
 * Génère une animation de survol interactive
 * @returns {object} Configuration d'animation pour Framer Motion
 */
export const interactiveHoverAnimation = {
  whileHover: { 
    scale: 1.05,
    y: -5,
    transition: { duration: 0.2 }
  },
  whileTap: { 
    scale: 0.98,
    transition: { duration: 0.1 }
  }
}; 