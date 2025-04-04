// Types de base pour l'application
export interface User {
  id: string
  name: string
  email: string
}

export interface Parcours {
  id: string
  title: string
  description: string
  steps: Step[]
}

export interface Step {
  id: string
  title: string
  content: string
  order: number
} 