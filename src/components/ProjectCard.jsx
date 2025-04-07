import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Animation variants
const ANIMATIONS = {
  card: {
    hidden: { opacity: 0, y: 30 },
    visible: (delay) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay
      }
    }),
    hover: {
      y: -10,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  },
  image: {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  }
};

// Composant pour les tags de technologies
const TechTag = ({ name }) => (
  <span className="inline-block bg-gray-light px-3 py-1 rounded-full text-sm">
    {name}
  </span>
);


// Composant pour le lien "Voir le projet"
const ProjectLink = ({ href }) => (
  <Link href={href} passHref>
    <motion.span
      className="inline-flex items-center text-black font-medium"
      whileHover={{ x: 5 }}
      transition={{ duration: 0.2 }}
    >
      Voir le projet
      <svg
        className="ml-2 w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
    </motion.span>
  </Link>
);

export default function ProjectCard({
  title,
  description,
  image,
  technologies,
  link,
  delay = 0
}) {
  return (
    <motion.div
      className="h-full flex flex-col bg-white rounded-xl overflow-hidden shadow-md mouse-effect"
      variants={ANIMATIONS.card}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -100px 0px' }}
      whileHover="hover"
    >
      <Link href={link} passHref className="block overflow-hidden">
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <motion.div className="h-full w-full" variants={ANIMATIONS.image}>
            <Image
              src={image}
              alt={title}
              className="object-cover"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </motion.div>
        </div>
      </Link>

      <div className="flex flex-col flex-grow p-6 mouse-effect-children">
        <h3 className="text-xl font-space font-medium mb-2 child-effect">{title}</h3>
        <p className="text-gray-medium mb-4 flex-grow child-effect">{description}</p>
        
        <div className="mt-auto child-effect">
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, index) => (
              <TechTag key={index} name={tech} />
            ))}
          </div>
          
          <ProjectLink href={link} />
        </div>
      </div>
    </motion.div>
  );
} 