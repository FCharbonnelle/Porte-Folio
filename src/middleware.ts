import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(_request: NextRequest) {
  // Le paramètre request est préfixé avec _ pour indiquer qu'il n'est pas utilisé
  // Vous pouvez ajouter ici votre logique de middleware
  // Par exemple, vérification d'authentification, redirection, etc.
  return NextResponse.next()
}

// Configuration des chemins sur lesquels le middleware s'applique
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 