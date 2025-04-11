'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { techIcons } from '@/data/techIcons';
import HoverSpotlightWrapper from '@/components/ui/HoverSpotlightWrapper';

const SkillIconBadge = ({ skillName }) => {
  const IconComponent = techIcons[skillName];
  
  if (!IconComponent) {
    return (
      <div className="skill-badge group bg-accent/5 hover:bg-accent/10 border border-accent/20 hover:border-accent/40 hover:scale-105 transition-all flex items-center p-3 rounded-lg shadow-md backdrop-blur-sm float-small flex-shrink-0">
        <span className="text-accent group-hover:text-foreground font-medium text-sm md:text-base">{skillName}</span>
      </div>
    );
  }

  return (
    <motion.div 
      className="skill-badge group bg-accent/5 hover:bg-accent/15 border border-accent/20 hover:border-accent/40 hover:scale-105 transition-all flex flex-col items-center justify-center p-4 rounded-lg shadow-md backdrop-blur-sm float-small flex-shrink-0 w-24 h-24 md:w-28 md:h-28"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-10 h-10 md:w-12 md:h-12 mb-2 group-hover:text-foreground transition-colors">
        {IconComponent}
      </div>
      <span className="text-accent group-hover:text-foreground font-medium text-xs md:text-sm text-center mt-1">{skillName}</span>
    </motion.div>
  );
};

const SkillCategory = ({ title, skills }) => (
  <HoverSpotlightWrapper>
    <div className="bg-background/5 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
      <h3 className="text-lg md:text-xl font-bold mb-6 text-foreground">{title}</h3>
      <div className="overflow-x-auto pb-2 no-scrollbar">
        <motion.div 
          className="flex gap-4 md:gap-5 w-max"
        >
          {skills.map((skillName, index) => (
            <SkillIconBadge key={index} skillName={skillName} />
          ))}
        </motion.div>
      </div>
    </div>
  </HoverSpotlightWrapper>
);

export default function Skills() {
  const skillsByCategory = [
    {
      category: "Frontend",
      items: [
        "HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "TailwindCSS"
      ]
    },
    {
      category: "Backend",
      items: [
        "Node.js", "Firebase"
      ]
    },
    {
      category: "Outils & DevOps",
      items: [
        "Git", "GitHub", "Docker", "Vercel"
      ]
    },
  ];

  return (
    <section id="skills" className="py-16 md:py-20">
      <div className="container-wide">
        <div className="w-full text-center">
          <span className="badge mb-3 inline-block float-small">Compétences</span>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Expertise technique
          </motion.h2>
          <motion.p 
            className="text-base md:text-lg text-foreground/80 mb-10 md:mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Voici les technologies et outils que j'utilise pour créer des expériences numériques élégantes et performantes.
          </motion.p>
        </div>

        <div className="space-y-8 md:space-y-10">
          {skillsByCategory.map((categoryData, index) => (
            <SkillCategory 
              key={index}
              title={categoryData.category}
              skills={categoryData.items}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 