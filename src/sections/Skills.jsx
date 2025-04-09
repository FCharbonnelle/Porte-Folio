'use client';

import React from 'react';
import { techIcons } from '@/data/techIcons';

const SkillBadge = ({ skill }) => (
  <div 
    className="skill-badge group bg-accent/5 hover:bg-accent/10 border border-accent/20 hover:border-accent/40 hover:scale-105 transition-all flex items-center p-3 rounded-lg shadow-md backdrop-blur-sm float-small"
  >
    <span className="text-accent group-hover:text-foreground font-medium text-base md:text-lg">{skill}</span>
  </div>
);

const SkillCategory = ({ title, skills }) => (
  <div className="mb-8 md:mb-10">
    <h3 className="text-lg md:text-xl font-bold mb-4 text-foreground bg-accent/5 inline-block px-4 py-1 rounded-md border border-accent/10 float">{title}</h3>
    <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
      {skills.map((skill, index) => (
        <SkillBadge key={index} skill={skill} />
      ))}
    </div>
  </div>
);

export default function Skills() {
  const skillsData = [
    {
      category: "Développement Frontend",
      items: [
        "HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "TailwindCSS"
      ]
    },
    {
      category: "Développement Backend",
      items: [
        "Node.js", "Firebase"
      ]
    },
    {
      category: "DevOps & Cloud",
      items: [
        "Git", "GitHub", "Docker", "Vercel"
      ]
    },
  ];

  return (
    <section id="skills" className="py-16 md:py-20">
      <div className="container-wide">
        <div className="w-full">
          <span className="badge mb-3 inline-block float-small">Compétences</span>
          <h2 className="mb-3 md:mb-5 float">Expertise technique</h2>
          <p className="mb-8 md:mb-10 max-w-2xl mx-auto">Voici les technologies et outils que j'utilise pour créer des expériences numériques élégantes et performantes.</p>
        </div>

        <div className="fade-in-up grid grid-cols-1 gap-10">
          <div 
            className="md:col-span-2 rounded-xl md:rounded-2xl p-6 md:p-8 border border-white/10 bg-background/5 backdrop-blur-sm shadow-xl text-center"
          >
            {skillsData.map((category, index) => (
              <SkillCategory 
                key={index}
                title={category.category}
                skills={category.items}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 