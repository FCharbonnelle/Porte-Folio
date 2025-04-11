'use client';

import React, { useRef, useState, useEffect } from 'react';

export default function HoverSpotlightWrapper({ children, className = '' }) {
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const handleMouseMove = (e) => {
      const rect = node.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      node.style.setProperty('--card-mouse-x', `${x}px`);
      node.style.setProperty('--card-mouse-y', `${y}px`);
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      // Optionnel: reset des variables CSS quand la souris quitte
      // node.style.removeProperty('--card-mouse-x');
      // node.style.removeProperty('--card-mouse-y');
    };

    node.addEventListener('mousemove', handleMouseMove);
    node.addEventListener('mouseenter', handleMouseEnter);
    node.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      node.removeEventListener('mousemove', handleMouseMove);
      node.removeEventListener('mouseenter', handleMouseEnter);
      node.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Cloner l'élément enfant pour lui ajouter la ref et la classe
  const childElement = React.Children.only(children);
  const enhancedChild = React.cloneElement(childElement, {
    ref: containerRef,
    className: `${childElement.props.className || ''} ${className} hover-spotlight-card ${isHovering ? 'is-hovering' : ''}`,
  });

  return enhancedChild;
} 