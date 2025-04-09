'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <div>
        <h1 className="text-6xl md:text-8xl font-bold mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Page non trouvée</h2>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        
        <Link 
          href="/"
          className="bg-black text-white px-6 py-3 rounded-md font-medium inline-flex items-center"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
} 