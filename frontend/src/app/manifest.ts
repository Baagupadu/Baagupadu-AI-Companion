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
        src: '/brand/baagupadu-logo-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/brand/baagupadu-logo-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['education', 'lifestyle', 'productivity'],
  };
}

