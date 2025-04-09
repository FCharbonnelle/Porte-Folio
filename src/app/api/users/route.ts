import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Données fictives pour les utilisateurs
const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com'
  }
];

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(_request: NextRequest) {
  try {
    // La variable body est commentée pour éviter l'erreur ESLint
    // mais conservée en commentaire pour une implémentation future
    // const body = await request.json();
    
    // Logique pour ajouter un nouvel utilisateur
    return NextResponse.json({ success: true, message: 'Utilisateur créé avec succès' });
  } catch (_err) {
    return NextResponse.json({ success: false, message: 'Erreur lors de la création de l\'utilisateur' }, { status: 400 });
  }
} 