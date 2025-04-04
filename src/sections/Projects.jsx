'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Composant pour afficher un projet
const ProjectCard = ({ project }) => (
  <div className="card group mouse-effect">
    {/* Image du projet */}
    <div className="aspect-video w-full mb-5 rounded-lg overflow-hidden relative child-effect">
      <div className="absolute inset-0 bg-gray-light flex items-center justify-center">
        {project.image ? (
          <Image 
            src={project.image} 
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="text-3xl text-gray-medium">Projet</div>
        )}
      </div>

      {/* Badge de catégorie */}
      <div className="absolute top-3 left-3">
        <span className="badge bg-background/80 backdrop-blur-sm">{project.category}</span>
      </div>
    </div>

    {/* Titre et description */}
    <div className="mouse-effect-children">
      <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors child-effect">{project.title}</h3>
      <p className="text-gray-dark mb-4 text-sm child-effect">{project.description}</p>

      {/* Technologies utilisées */}
      <div className="flex flex-wrap gap-2 mb-5 child-effect">
        {project.technologies.map((tech, index) => (
          <span key={index} className="text-xs py-1 px-2 bg-gray-light rounded-md text-gray-dark">
            {tech}
          </span>
        ))}
      </div>

      {/* Lien vers le projet */}
      <div className="flex justify-between items-center child-effect">
        {project.link && (
          <Link 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-accent font-medium text-sm hover:underline flex items-center"
          >
            Voir le projet
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        )}
        
        {project.github && (
          <Link 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-medium hover:text-foreground transition-colors"
            aria-label="GitHub repository"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.477 2 2 6.484 2 12.017C2 16.442 4.865 20.197 8.839 21.521C9.339 21.613 9.521 21.304 9.521 21.038C9.521 20.801 9.513 19.951 9.508 19.105C6.726 19.712 6.139 17.74 6.139 17.74C5.684 16.583 5.068 16.274 5.068 16.274C4.16 15.657 5.133 15.67 5.133 15.67C6.137 15.738 6.667 16.694 6.667 16.694C7.559 18.23 9.007 17.787 9.538 17.528C9.629 16.882 9.886 16.439 10.169 16.176C7.975 15.911 5.664 15.005 5.664 11.174C5.664 10.081 6.064 9.186 6.686 8.484C6.584 8.232 6.235 7.216 6.784 5.916C6.784 5.916 7.624 5.646 9.498 6.865C10.3099 6.6411 11.1523 6.52749 12 6.528C12.85 6.528 13.7 6.645 14.502 6.865C16.374 5.646 17.213 5.916 17.213 5.916C17.763 7.216 17.414 8.232 17.312 8.484C17.936 9.186 18.334 10.081 18.334 11.174C18.334 15.015 16.018 15.909 13.817 16.169C14.172 16.493 14.491 17.136 14.491 18.114C14.491 19.502 14.478 20.712 14.478 21.037C14.478 21.305 14.658 21.617 15.166 21.519C19.137 20.194 22 16.442 22 12.017C22 6.484 17.522 2 12 2Z" fill="currentColor"/>
            </svg>
          </Link>
        )}
      </div>
    </div>
  </div>
);

export default function Projects() {
  const projects = [
    {
      title: "Pizza Di Mama",
      description: "Site web d'une pizzeria permettant la consultation du menu, la commande en ligne et le suivi des commandes.",
      image: "", // Ajouter le chemin de l'image
      category: "Site Web",
      technologies: ["React.js", "Node.js", "Next.js", "Local Storage"],
      link: "https://pizza-di-mama.example.com",
      github: "https://github.com/username/pizza-di-mama"
    },
    {
      title: "Dashboard Analytique",
      description: "Interface d'administration sophistiquée présentant des visualisations de données et des tableaux de bord personnalisables.",
      image: "", // Ajouter le chemin de l'image
      category: "Visualisation de données",
      technologies: ["Next.js", "TypeScript", "D3.js", "Prisma", "PostgreSQL"],
      link: "https://analytics-dashboard.example.com",
      github: "https://github.com/username/analytics-dashboard"
    },
    {
      title: "Application de Gestion de Projet",
      description: "Outil collaboratif permettant aux équipes de gérer des projets, assignation de tâches et suivi de temps.",
      image: "", // Ajouter le chemin de l'image
      category: "SaaS",
      technologies: ["React", "Firebase", "Styled Components", "Redux"],
      link: "https://project-management.example.com",
      github: "https://github.com/username/project-management"
    },
    {
      title: "API REST Multiservices",
      description: "Backend robuste fournissant des endpoints sécurisés pour diverses applications frontend avec authentification JWT.",
      image: "", // Ajouter le chemin de l'image
      category: "Backend",
      technologies: ["Node.js", "Express", "MongoDB", "JWT", "Docker"],
      link: "",
      github: "https://github.com/username/multi-service-api"
    },
    {
      title: "Portfolio Responsive",
      description: "Site web portfolio personnel présentant mes projets et compétences avec une interface élégante et responsive.",
      image: "", // Ajouter le chemin de l'image
      category: "Site Web",
      technologies: ["Next.js", "TailwindCSS", "Framer Motion"],
      link: "#",
      github: "https://github.com/username/portfolio"
    }
  ];

  return (
    <section id="projects" className="py-20">
      <div className="container-wide">
        <div className="mb-12 max-w-xl">
          <span className="badge mb-3 inline-block">Portfolio</span>
          <h2 className="mb-5">Projets sélectionnés</h2>
          <p>Une collection de projets récents qui illustrent mon expertise en développement web et en conception d'interfaces.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div key={index} className="fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <a 
            href="https://github.com/username" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-secondary inline-flex items-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <path d="M12 2C6.477 2 2 6.484 2 12.017C2 16.442 4.865 20.197 8.839 21.521C9.339 21.613 9.521 21.304 9.521 21.038C9.521 20.801 9.513 19.951 9.508 19.105C6.726 19.712 6.139 17.74 6.139 17.74C5.684 16.583 5.068 16.274 5.068 16.274C4.16 15.657 5.133 15.67 5.133 15.67C6.137 15.738 6.667 16.694 6.667 16.694C7.559 18.23 9.007 17.787 9.538 17.528C9.629 16.882 9.886 16.439 10.169 16.176C7.975 15.911 5.664 15.005 5.664 11.174C5.664 10.081 6.064 9.186 6.686 8.484C6.584 8.232 6.235 7.216 6.784 5.916C6.784 5.916 7.624 5.646 9.498 6.865C10.3099 6.6411 11.1523 6.52749 12 6.528C12.85 6.528 13.7 6.645 14.502 6.865C16.374 5.646 17.213 5.916 17.213 5.916C17.763 7.216 17.414 8.232 17.312 8.484C17.936 9.186 18.334 10.081 18.334 11.174C18.334 15.015 16.018 15.909 13.817 16.169C14.172 16.493 14.491 17.136 14.491 18.114C14.491 19.502 14.478 20.712 14.478 21.037C14.478 21.305 14.658 21.617 15.166 21.519C19.137 20.194 22 16.442 22 12.017C22 6.484 17.522 2 12 2Z" fill="currentColor"/>
            </svg>
            Voir plus de projets sur GitHub
          </a>
        </div>
      </div>
    </section>
  );
} 