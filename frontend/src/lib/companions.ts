import type { TargetAndTransition } from 'framer-motion';

export const COMPANIONS = [
  {
    id: 'mentor',
    name: 'The Mentor',
    image: '/avatars/mentor.png',
    color: '#2A41E8',
    description: 'Professional, calm, and deeply inspiring. He pushes you to see the bigger picture and build a solid foundation.',
    labels: [
      { text: 'Clear Strategy', top: '35%', left: '0%' },
      { text: 'Actionable Guidance', top: '55%', right: '-15%' }
    ],
    animation: { y: [0, -4, 0], transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' } } satisfies TargetAndTransition
  },
  {
    id: 'confidant',
    name: 'The Confidant',
    image: '/avatars/confidant.png',
    color: '#FF6B8A',
    description: 'Warm, casual, and highly empathetic. She listens without judgment and helps you untangle your thoughts.',
    labels: [
      { text: 'Deep Empathy', top: '40%', left: '-10%' },
      { text: 'Judgment-Free', top: '65%', right: '-5%' }
    ],
    animation: { rotate: [-1, 1, -1], y: [0, -3, 0], transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' } } satisfies TargetAndTransition
  },
  {
    id: 'challenger',
    name: 'The Challenger',
    image: '/avatars/challenger.png',
    color: '#00B894',
    description: 'Sharp, energetic, and intense. She doesn’t sugarcoat things—she pushes you to break your limits.',
    labels: [
      { text: 'Push Limits', top: '30%', right: '-10%' },
      { text: 'Radical Honesty', top: '60%', left: '-20%' }
    ],
    animation: { y: [0, -8, 0], scale: [1, 1.01, 1], transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } } satisfies TargetAndTransition
  }
];
