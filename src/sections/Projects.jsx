'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProjectCarousel from '@/components/ProjectCarousel';

export default function Projects() {
  const projects = [
    {
      title: "Pizza Di Mama",
      description: "Site web d'une pizzeria permettant la consultation du menu, l'ajout de produits au panier et la validation de la commande avec un paiement en ligne ou a la livraison. stockage des commandes dans le local storage. acces a un backoffice pour la gestion des commandes et des produits.",
      image: "/assets/Pizza_Di_Mama.jpg",
      technologies: ["React.js", "Next.js", "TailwindCSS", "Local Storage"],
      link: "https://pizza-di-mama-3nhqbdldq-fabiens-projects-5e6ab801.vercel.app",
      github: "https://github.com/FCharbonnelle/Pizza-Di-Mama.git"
    },
    {
      title: "quiz-enfant-bolt",
      description: "Cette application, développée avec **Bolt.new**, est un petit quiz en ligne interactif pour enfants. Elle propose des questions illustrées classées par **catégories** (animaux, formes, etc.), accessibles via un **carrousel horizontal d’images**. Ludique et intuitive, elle facilite l’apprentissage tout en s’adaptant à l’âge de l’enfant.",
      image: "/assets/quiz_enfant.jpg",
      category: "Visualisation de données",
      technologies: ["Next.js", "TailwindCSS", "Bolt.new"],
      link: "https://quiz-enfant-bolt.vercel.app/",
      github: "https://github.com/FCharbonnelle/Quiz-Enfant-Bolt.git"
    },
    {
      title: "Application de Planification des Repas Hebdomadaires Et Listing Courses D'un Foyer",
      description: "Outil de planification des repas hebdomadaires permetant de choisir les repas de la semaine, de générer une liste de courses et de les imprimer.",
      image: "/assets/Plan_repas.jpg",
      category: "SaaS",
      technologies: ["React.js", "Next.js", "TailwindCSS", "Local Storage"],
      link: "https://plan-repas-692m.vercel.app/",
      github: "https://github.com/FCharbonnelle/Plan-Repas.git"
    },
    {
      title: "To Do List",
      description: "Application de To Do List permettant de gérer des tâches, de les marquer comme terminées et de les supprimer.",
      image: "/assets/ToDo.jpg",
      category: "Backend",
      technologies: ["React.js", "Next.js", "TailwindCSS", "Local Storage"],
      link: "https://to-do-list-roan-five-80.vercel.app/",
      github: "https://github.com/FCharbonnelle/To-Do-List.git"
    },
    {
      title: "Portfolio Responsive",
      description: "Site web portfolio personnel présentant mes projets et compétences avec une interface élégante et responsive.",
      image: "/assets/project-2.jpg",
      category: "Site Web",
      technologies: ["Next.js", "TailwindCSS", "Framer Motion"],
      link: "https://portfolio-next.vercel.app",
      github: "https://github.com/username/portfolio"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-background-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container-wide relative z-10">
        <motion.div
          className="mb-12 max-w-xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="badge mb-3 inline-block"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Portfolio
          </motion.span>
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-5 text-accent"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Projets sélectionnés
          </motion.h2>
          <motion.p
            className="text-base md:text-lg max-w-2xl mx-auto text-center mb-8 text-gray-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Une collection de projets récents qui illustrent mon expertise en développement web et en conception d'interfaces.
            <span className="block mt-2 text-accent-light italic">Faites glisser pour explorer →</span>
          </motion.p>
        </motion.div>

        {/* Carrousel de projets */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <ProjectCarousel projects={projects} />
        </motion.div>

        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <motion.a
            href="https://github.com/FCharbonnelle"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary inline-flex items-center"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <path d="M12 2C6.477 2 2 6.484 2 12.017C2 16.442 4.865 20.197 8.839 21.521C9.339 21.613 9.521 21.304 9.521 21.038C9.521 20.801 9.513 19.951 9.508 19.105C6.726 19.712 6.139 17.74 6.139 17.74C5.684 16.583 5.068 16.274 5.068 16.274C4.16 15.657 5.133 15.67 5.133 15.67C6.137 15.738 6.667 16.694 6.667 16.694C7.559 18.23 9.007 17.787 9.538 17.528C9.629 16.882 9.886 16.439 10.169 16.176C7.975 15.911 5.664 15.005 5.664 11.174C5.664 10.081 6.064 9.186 6.686 8.484C6.584 8.232 6.235 7.216 6.784 5.916C6.784 5.916 7.624 5.646 9.498 6.865C10.3099 6.6411 11.1523 6.52749 12 6.528C12.85 6.528 13.7 6.645 14.502 6.865C16.374 5.646 17.213 5.916 17.213 5.916C17.763 7.216 17.414 8.232 17.312 8.484C17.936 9.186 18.334 10.081 18.334 11.174C18.334 15.015 16.018 15.909 13.817 16.169C14.172 16.493 14.491 17.136 14.491 18.114C14.491 19.502 14.478 20.712 14.478 21.037C14.478 21.305 14.658 21.617 15.166 21.519C19.137 20.194 22 16.442 22 12.017C22 6.484 17.522 2 12 2Z" fill="currentColor" />
            </svg>
            Voir plus de projets sur GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
} 