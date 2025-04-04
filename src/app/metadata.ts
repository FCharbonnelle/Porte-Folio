import { Metadata } from 'next';
import { APP_CONFIG } from '@/config/constants';

export const defaultMetadata: Metadata = {
  title: {
    default: APP_CONFIG.name,
    template: `%s | ${APP_CONFIG.name}`,
  },
  description: APP_CONFIG.description,
  icons: {
    icon: '/favicon.ico',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: APP_CONFIG.name,
    description: APP_CONFIG.description,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: APP_CONFIG.name,
    description: APP_CONFIG.description,
  },
} 