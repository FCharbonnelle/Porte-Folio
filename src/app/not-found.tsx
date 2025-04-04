import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-6xl md:text-8xl font-space font-bold mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-space mb-6">Page non trouvée</h2>
        <p className="text-gray-medium max-w-md mx-auto mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        
        <Link 
          href="/"
          className="bg-black text-white px-6 py-3 rounded-md font-medium inline-flex items-center transition-transform hover:translate-y-[-2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent"
        >
          <svg 
            className="w-4 h-4 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Retour à l'accueil
        </Link>
      </motion.div>
      
      <motion.div
        className="absolute w-full h-full -z-10 flex items-center justify-center opacity-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="text-[30rem] font-space font-bold text-accent">
          ?
        </div>
      </motion.div>
    </div>
  );
} 