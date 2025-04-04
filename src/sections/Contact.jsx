'use client';

import React, { useState } from 'react';

// Composant pour les icônes de contact
const ContactIcon = ({ children, title, content, isLink = false, href = '', socialIcons = null }) => (
  <div className="flex items-center">
    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mr-4">
      {children}
    </div>
    <div>
      <h4 className="text-sm font-medium text-gray-dark mb-0.5">{title}</h4>
      {isLink ? (
        <a href={href} className="text-foreground hover:text-accent transition-colors">
          {content}
        </a>
      ) : socialIcons ? (
        <div className="flex gap-3">
          {socialIcons}
        </div>
      ) : (
        <p className="text-foreground">{content}</p>
      )}
    </div>
  </div>
);

// Composant pour les champs du formulaire
const FormField = ({ id, label, type = 'text', value, onChange, placeholder, rows = null }) => (
  <div className="mb-5 child-effect">
    <label htmlFor={id} className="block text-sm font-medium text-foreground mb-1.5">
      {label}
    </label>
    {rows ? (
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full px-4 py-3 rounded-lg border-2 border-accent-light/50 bg-white focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
        placeholder={placeholder}
        required
      ></textarea>
    ) : (
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-lg border-2 border-accent-light/50 bg-white focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
        placeholder={placeholder}
        required
      />
    )}
  </div>
);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'envoi de formulaire (à remplacer par votre logique réelle)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset du statut après 3 secondes
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    }, 1000);
  };

  // Icônes sociales
  const socialIcons = (
    <>
      <a href="https://github.com/fabiencharbonnelle" target="_blank" rel="noopener noreferrer" className="text-gray-dark hover:text-accent transition-colors">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.477 2 2 6.484 2 12.017C2 16.442 4.865 20.197 8.839 21.521C9.339 21.613 9.521 21.304 9.521 21.038C9.521 20.801 9.513 19.951 9.508 19.105C6.726 19.712 6.139 17.74 6.139 17.74C5.684 16.583 5.068 16.274 5.068 16.274C4.16 15.657 5.133 15.67 5.133 15.67C6.137 15.738 6.667 16.694 6.667 16.694C7.559 18.23 9.007 17.787 9.538 17.528C9.629 16.882 9.886 16.439 10.169 16.176C7.975 15.911 5.664 15.005 5.664 11.174C5.664 10.081 6.064 9.186 6.686 8.484C6.584 8.232 6.235 7.216 6.784 5.916C6.784 5.916 7.624 5.646 9.498 6.865C10.3099 6.6411 11.1523 6.52749 12 6.528C12.85 6.528 13.7 6.645 14.502 6.865C16.374 5.646 17.213 5.916 17.213 5.916C17.763 7.216 17.414 8.232 17.312 8.484C17.936 9.186 18.334 10.081 18.334 11.174C18.334 15.015 16.018 15.909 13.817 16.169C14.172 16.493 14.491 17.136 14.491 18.114C14.491 19.502 14.478 20.712 14.478 21.037C14.478 21.305 14.658 21.617 15.166 21.519C19.137 20.194 22 16.442 22 12.017C22 6.484 17.522 2 12 2Z" fill="currentColor"/>
        </svg>
      </a>
      <a href="https://linkedin.com/in/fabien-charbonnelle" target="_blank" rel="noopener noreferrer" className="text-gray-dark hover:text-accent transition-colors">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.75 7.75C6.16421 7.75 7.25 6.66421 7.25 5.25C7.25 3.83579 6.16421 2.75 4.75 2.75C3.33579 2.75 2.25 3.83579 2.25 5.25C2.25 6.66421 3.33579 7.75 4.75 7.75Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9.75 21.25V8.75H13.25V11.75C14.0181 10.1128 15.7457 8.91891 17.8021 8.75383C20.2361 8.56353 22.3311 10.5416 22.2469 13.0441L21.75 21.25H18.25L18.65 13.75C18.5936 12.5169 17.5743 11.5747 16.3417 11.7187C15.0234 11.8747 13.7142 12.8808 13.25 14.25V21.25H9.75Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2.75 21.25V8.75H6.25V21.25H2.75Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </>
  );

  // État du bouton de soumission
  const submitButtonContent = () => {
    if (isSubmitting) {
      return (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      );
    } else if (submitSuccess) {
      return (
        <>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Message envoyé !
        </>
      );
    } else {
      return "Envoyer le message";
    }
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container-narrow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <div className="fade-in-up stagger-1">
            <span className="badge mb-3 inline-block">Contact</span>
            <h2 className="mb-5">En recherche active d'opportunités</h2>
            <p className="mb-8">
              En pleine reconversion professionnelle, je suis activement à la recherche d'un stage, d'une alternance 
              ou d'un premier emploi en tant que développeur web junior. Motivé par l'apprentissage et le développement 
              de mes compétences, je souhaite intégrer une équipe bienveillante où je pourrai progresser et contribuer 
              efficacement. N'hésitez pas à me contacter pour échanger sur les possibilités de collaboration.
            </p>

            <div className="space-y-4 mb-8">
              <ContactIcon 
                title="Email" 
                content="fcharbonnelle@gmail.com" 
                isLink={true} 
                href="mailto:fcharbonnelle@gmail.com"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent">
                  <path d="M22 12C22 10.6868 21.7413 9.38647 21.2388 8.1731C20.7362 6.95996 19.9997 5.85742 19.0711 4.92896C18.1425 4.00024 17.0401 3.26367 15.8268 2.76123C14.6136 2.25854 13.3132 2 12 2C10.6868 2 9.38647 2.25854 8.1731 2.76123C6.95996 3.26367 5.85742 4.00024 4.92896 4.92896C3.26267 6.59552 2.25 8.81312 2.03 11.1495C1.88 12.5355 2 13.9815 2.36 15.348M2.86001 18.4485L5.92001 17.2875C6.98616 16.7999 8.19661 16.7016 9.32001 17.0125C9.69396 17.1194 10.0925 17.0005 10.34 16.7035C10.639 16.3425 10.4287 15.6695 10.18 15.4305C9.51001 14.7895 8.34001 14.3325 7.73001 14.5785C7.32962 14.7547 6.8893 14.8224 6.45445 14.7758C6.01959 14.7292 5.60419 14.5695 5.25001 14.3145L4.47001 13.7485C4.14522 13.5256 3.88603 13.222 3.71981 12.8685C3.55358 12.515 3.48563 12.1243 3.52384 11.7364C3.56205 11.3486 3.70483 10.9783 3.93776 10.6625C4.17069 10.3467 4.48572 10.0967 4.85001 9.93449L14.59 5.42449C15.6475 4.93512 16.8607 4.8598 18 5.21449C19.138 5.56838 20.1238 6.32361 20.757 7.33982C21.3903 8.35603 21.6323 9.56127 21.4438 10.7358C21.2553 11.9104 20.6487 12.9719 19.73 13.7235L13.52 19.2435C12.7769 19.8826 11.8556 20.2916 10.876 20.4197C9.89633 20.5478 8.89979 20.3882 8 19.9625C7.10021 19.5368 6.33646 18.8666 5.80323 18.028C5.26999 17.1893 4.99203 16.2167 5.00001 15.2255" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </ContactIcon>

              <ContactIcon 
                title="Localisation" 
                content="Grenoble, France"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent">
                  <path d="M20 10C20 14.4183 16.4183 18 12 18C7.58172 18 4 14.4183 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 22H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </ContactIcon>

              <ContactIcon 
                title="Social" 
                socialIcons={socialIcons}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent">
                  <path d="M21 5.5C21.5 5.80844 22 6.32956 22 7V17C22 17.9319 21.622 18.3978 21 18.7319M3 5.5C2.5 5.80844 2 6.32956 2 7V17C2 17.9319 2.378 18.3978 3 18.7319M21 5.5H3M21 5.5L12 12L3 5.5M21 18.7319H3M21 18.7319L16 14.5M3 18.7319L8 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </ContactIcon>
            </div>
          </div>

          <div className="fade-in-up stagger-2">
            <form onSubmit={handleSubmit} className="card group bg-white bg-gradient-to-br from-white to-accent/5 rounded-xl p-6 shadow-lg border border-accent-light/30 transition-all mouse-effect">
              <div className="mouse-effect-children">
                <h3 className="text-xl font-medium mb-6 text-foreground group-hover:text-accent transition-colors child-effect">Envoyez-moi un message</h3>
                
                <FormField 
                  id="name"
                  label="Nom complet"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                />
                
                <FormField 
                  id="email"
                  type="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                />
                
                <FormField 
                  id="message"
                  label="Message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre projet..."
                  rows="5"
                />
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full flex justify-center items-center child-effect"
                >
                  {submitButtonContent()}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
} 