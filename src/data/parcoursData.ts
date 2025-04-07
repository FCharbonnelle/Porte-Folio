// Interface pour les items du parcours
export interface ParcoursItem {
  title: string;
  date?: string;
  lieu?: string;
  contact?: string;
}

// Interface pour les sections du parcours
export interface ParcoursSection {
  section: string;
  icon: string;
  items: ParcoursItem[];
}

export const parcoursData: ParcoursSection[] = [
  {
    section: "Diplômes et Formations",
    icon: "🎓",
    items: [
      { title: "Développeur Web/Web mobile", date: "Sep 2024 - Mai 2025", lieu: "AFPA Pompey (54)" },
      { title: "BTS Technico-Commercial", date: "2000 - 2002", lieu: "Lycée Loritz Nancy (54)" },
      { title: "Baccalauréat STI génie productique mécanique", date: "1997 - 2000", lieu: "Lycée Charles de Gaulle Chaumont (52)" },
      { title: "BEP Electronique", date: "1995 - 1996", lieu: "Lycée Jean Baptiste Villaume Mirecourt (88)" },
    ],
  },
  {
    section: "Expériences professionnelles",
    icon: "💼",
    items: [
      { title: "Conseiller de vente Equipements de la Maison", date: "Oct 2006 - Déc 2023", lieu: "AUCHAN Tomblaine et Nancy" },
      { title: "Conseiller de vente en téléphonie", date: "2005", lieu: "Orange Cora Houdemont" },
      { title: "Vendeur logithèque", date: "2004", lieu: "FNAC Nancy" },
      { title: "Vendeur matériel Informatique et Musique", date: "2003", lieu: "CASH CONVERTERS Essey-les-Nancy" },
    ],
  },
  {
    section: "Compétences",
    icon: "🔧",
    items: [
      { title: "Créer, élaborer et identifier des concepts innovants" },
      { title: "Actualiser régulièrement ses connaissances" },
      { title: "Recueillir et analyser les besoins client" },
      { title: "Présenter et valoriser un produit ou un service" },
      { title: "Accompagner l'appropriation d'un outil par ses utilisateurs" },
    ],
  },
  {
    section: "Langues",
    icon: "🌐",
    items: [
      { title: "Français" }, 
      { title: "Anglais" }
    ],
  },
  {
    section: "Atouts",
    icon: "💪",
    items: [
      { title: "Travailler en équipe" },
      { title: "S'adapter aux changements" },
      { title: "Faire preuve de curiosité" },
      { title: "Faire preuve de créativité, d'inventivité" },
      { title: "Faire preuve de persévérance" },
      { title: "Faire preuve de rigueur et de précision" },
      { title: "Gérer son stress" },
    ],
  },
  {
    section: "Centres d'intérêt",
    icon: "🎮",
    items: [
      { title: "Sorties entre amis" },
      { title: "Bowling, Billard, Basketball" },
      { title: "Jeux vidéos multi-joueurs en ligne" },
    ],
  },
]; 