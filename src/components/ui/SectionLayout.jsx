import React from 'react';

export default function SectionLayout({
  children,
  id,
  className = '',
  containerWidth = 'wide',
  spaceTop = true,
  spaceBottom = true,
  background = 'white'
}) {
  const containerClass = containerWidth === 'wide' ? 'container-wide' : 'container-narrow';
  
  const spaceClasses = `
    ${spaceTop ? 'pt-16 md:pt-24' : ''} 
    ${spaceBottom ? 'pb-16 md:pb-24' : ''}
  `;
  
  const bgClasses = {
    'white': 'bg-white',
    'gray-light': 'bg-gray-light',
    'black': 'bg-black text-white',
    'accent': 'bg-accent'
  };

  return (
    <section 
      id={id} 
      className={`${spaceClasses} ${bgClasses[background]} ${className}`}
    >
      <div className={containerClass}>
        {children}
      </div>
    </section>
  );
} 