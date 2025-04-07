'use client';

import React from 'react';
import { techIcons } from '@/data/techIcons';

const SkillBadge = ({ skill }) => (
  <div 
    className="skill-badge group bg-black/40 hover:bg-indigo-900/50 border-2 border-indigo-600 hover:border-indigo-400 hover:scale-105 transition-all flex items-center p-4 rounded-lg shadow-md backdrop-blur-sm"
  >
    <span className="text-indigo-300 group-hover:text-white font-medium text-lg">{skill}</span>
  </div>
);

const SkillCategory = ({ title, skills }) => (
  <div className="mb-10">
    <h3 className="text-xl font-bold mb-4 text-indigo-300 bg-black/50 inline-block px-4 py-1 rounded-md">{title}</h3>
    <div className="flex flex-wrap gap-4 justify-center">
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
    <section id="skills" className="py-20">
      <div className="container-wide">
        <div className="w-full">
          <span className="badge mb-3 inline-block">Compétences</span>
          <h2 className="mb-5">Expertise technique</h2>
          <p className="mb-10 max-w-2xl mx-auto">Voici les technologies et outils que j'utilise pour créer des expériences numériques élégantes et performantes.</p>
        </div>

        <div className="fade-in-up grid grid-cols-1 gap-10">
          <div 
            className="md:col-span-2 bg-background/60 rounded-2xl p-8 border border-accent-light/20 shadow-soft text-center"
            style={{ 
              backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url('/images/code-bg.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundBlendMode: "normal"
            }}
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