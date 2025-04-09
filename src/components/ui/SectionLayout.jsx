import React from 'react';

export default function SectionLayout({
  children,
  id,
  className = '',
  containerWidth = 'wide',
  spaceTop = true,
  spaceBottom = true,
  background = 'white',
  fullHeight = false,
  withOverflow = false
}) {
  const containerClass = containerWidth === 'wide' ? 'container-wide px-4 md:px-8' : 'container-narrow px-4 md:px-6';
  
  const spaceClasses = `
    ${spaceTop ? 'pt-12 sm:pt-16 md:pt-20 lg:pt-24' : ''} 
    ${spaceBottom ? 'pb-12 sm:pb-16 md:pb-20 lg:pb-24' : ''}
  `;
  
  const heightClasses = fullHeight ? 'min-h-screen flex flex-col justify-center' : '';
  
  const overflowClasses = withOverflow ? '' : 'overflow-hidden';
  
  const bgClasses = {
    'white': 'bg-white',
    'gray-light': 'bg-gray-light',
    'black': 'bg-black text-white',
    'accent': 'bg-accent',
    'gradient': 'bg-gradient-to-b from-background to-background-secondary',
    'transparent': 'bg-transparent'
  };

  return (
    <section 
      id={id} 
      className={`${spaceClasses} ${bgClasses[background] || 'bg-white'} ${heightClasses} ${overflowClasses} ${className} relative`}
    >
      <div className={containerClass}>
        {children}
      </div>
    </section>
  );
} 