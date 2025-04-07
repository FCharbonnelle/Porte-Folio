'use client';

import React from 'react';
import { techIcons } from '@/data/techIcons';

const SkillBadge = ({ skill }) => (
  <div 
    className="skill-badge group bg-white/5 hover:bg-white/10 border-2 border-indigo-600 hover:border-indigo-600 hover:scale-105 transition-all flex items-center p-4 rounded-lg shadow-sm"
  >
    <span className="text-indigo-600 group-hover:text-indigo-600 font-medium text-lg">{skill}</span>
  </div>
);

const SkillCategory = ({ title, skills }) => (
  <div className="mb-10">
    <h3 className="text-xl font-medium mb-4">{title}</h3>
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
          <p>Voici les technologies et outils que j'utilise pour créer des expériences numériques élégantes et performantes.</p>
        </div>

        <div className="fade-in-up grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="md:col-span-2 bg-background/60 rounded-2xl p-8 border border-accent-light/20 shadow-soft text-center">
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