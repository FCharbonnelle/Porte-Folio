// /**
//  * Utilitaire pour l'effet de souris personnalisé
//  */

export function initMouseEffect() {}

// export function initMouseEffect() {
//   if (typeof document === 'undefined') return;
  
//   // Création des éléments pour l'effet de souris
//   const cursor = document.createElement('div');
//   const cursorFollower = document.createElement('div');
  
//   // Configuration du curseur principal
//   cursor.classList.add('cursor');
//   cursor.style.position = 'fixed';
//   cursor.style.width = '10px';
//   cursor.style.height = '10px';
//   cursor.style.borderRadius = '50%';
//   cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
//   cursor.style.pointerEvents = 'none';
//   cursor.style.zIndex = '9999';
//   cursor.style.transform = 'translate(-50%, -50%)';
  
//   // Configuration du suiveur de curseur
//   cursorFollower.classList.add('cursor-follower');
//   cursorFollower.style.position = 'fixed';
//   cursorFollower.style.width = '30px';
//   cursorFollower.style.height = '30px';
//   cursorFollower.style.borderRadius = '50%';
//   cursorFollower.style.border = '1px solid rgba(255, 255, 255, 0.5)';
//   cursorFollower.style.pointerEvents = 'none';
//   cursorFollower.style.zIndex = '9998';
//   cursorFollower.style.transform = 'translate(-50%, -50%)';
//   cursorFollower.style.transition = 'transform 0.1s ease';
  
//   // Ajout au DOM
//   document.body.appendChild(cursor);
//   document.body.appendChild(cursorFollower);
  
//   // Gestionnaire de mouvement de souris
//   function onMouseMove(e) {
//     cursor.style.left = `${e.clientX}px`;
//     cursor.style.top = `${e.clientY}px`;
    
//     // Animation douce pour le suiveur
//     setTimeout(() => {
//       cursorFollower.style.left = `${e.clientX}px`;
//       cursorFollower.style.top = `${e.clientY}px`;
//     }, 50);
//   }
  
//   // Gestionnaire pour les hover sur les liens et boutons
//   function addHoverEffects() {
//     const interactiveElements = document.querySelectorAll('a, button');
    
//     interactiveElements.forEach(el => {
//       el.addEventListener('mouseenter', () => {
//         cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
//         cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
//       });
      
//       el.addEventListener('mouseleave', () => {
//         cursor.style.transform = 'translate(-50%, -50%) scale(1)';
//         cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
//       });
//     });
//   }
  
//   // Ajout des écouteurs d'événements
//   document.addEventListener('mousemove', onMouseMove);
//   addHoverEffects();
  
//   // Cacher le curseur par défaut
//   document.body.style.cursor = 'none';
  
//   // Fonction de nettoyage pour React
//   return () => {
//     document.removeEventListener('mousemove', onMouseMove);
//     document.body.removeChild(cursor);
//     document.body.removeChild(cursorFollower);
//     document.body.style.cursor = 'auto';
//   };
// } 