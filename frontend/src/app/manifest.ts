import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Baagupadu (బాగుపడు) — Autonomous AI Companion',
    short_name: 'Baagupadu',
    description: 'Autonomous AI companion for empathetic self-discovery and actionable career roadmaps.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0F172A',
    theme_color: '#6366F1',
    icons: [
      {
        src: '/baagupadu-logo-companion.jpg',
        sizes: '192x192',
        type: 'image/jpeg',
      },
      {
        src: '/baagupadu-comfort-logo.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
      },
    ],
    categories: ['education', 'lifestyle', 'productivity'],
  };
}

