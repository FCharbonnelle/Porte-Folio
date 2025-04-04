import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Données fictives pour les parcours
const parcours = [
  {
    id: '1',
    title: 'Parcours 1',
    description: 'Description du parcours 1',
    steps: [
      {
        id: '1-1',
        title: 'Étape 1',
        content: 'Contenu de l\'étape 1',
        order: 1
      },
      {
        id: '1-2',
        title: 'Étape 2',
        content: 'Contenu de l\'étape 2',
        order: 2
      }
    ]
  }
];

export async function GET(request: NextRequest) {
  return NextResponse.json(parcours);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Logique pour ajouter un nouveau parcours
    return NextResponse.json({ success: true, message: 'Parcours créé avec succès' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Erreur lors de la création du parcours' }, { status: 400 });
  }
} 