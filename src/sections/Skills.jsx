'use client';

import React from 'react';

const SkillCategory = ({ title, skills }) => (
  <div className="mb-10">
    <h3 className="text-xl font-medium mb-4">{title}</h3>
    <div className="flex flex-wrap gap-3">
      {skills.map((skill, index) => (
        <div 
          key={index} 
          className="badge group hover:bg-accent/10 hover:border-accent/20 border border-gray-light/80 hover:scale-105 transition-all"
        >
          <span className="group-hover:text-accent">{skill}</span>
        </div>
      ))}
    </div>
  </div>
);

export default function Skills() {
  const skillsData = [
    {
      category: "Développement Frontend",
      items: [
        "HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "TailwindCSS", "Responsive Design", "SASS"
      ]
    },
    {
      category: "Développement Backend",
      items: [
        "Node.js", "Express", "API REST", "MongoDB", "Firebase", "MySQL", "PostgreSQL", "Prisma"
      ]
    },
    {
      category: "DevOps & Cloud",
      items: [
        "Git", "GitHub", "CI/CD", "Docker", "AWS", "Vercel", "Netlify", "Heroku"
      ]
    },
    {
      category: "Outils & Méthodes",
      items: [
        "VS Code", "Figma", "Adobe XD", "Jira", "Agile/Scrum", "Tests unitaires", "Jest", "Cypress"
      ]
    }
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container-narrow">
        <div className="mb-12 max-w-xl">
          <span className="badge mb-3 inline-block">Compétences</span>
          <h2 className="mb-5">Expertise technique</h2>
          <p>Voici les technologies et outils que j'utilise pour créer des expériences numériques élégantes et performantes.</p>
        </div>

        <div className="fade-in-up grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="md:col-span-2 bg-background/60 rounded-2xl p-8 border border-accent-light/20 shadow-soft">
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