import type { Project, Skill } from '@/types';

export const projects: Project[] = [
  {
    id: 'ragify',
    title: 'Ragify – RAG Chatbot Platform',
    description: 'Production-grade RAG platform with semantic chunking, multi-tenant support, and real-time streaming responses.',
    longDescription: 'A full-stack AI document intelligence platform built with Next.js, Prisma, and the AI SDK. Features semantic chunking, cosine-similarity-based breakpoint detection, and a real-time streaming chat interface.',
    tags: ['Next.js', 'TypeScript', 'AI SDK', 'Prisma', 'SQLite', 'RAG'],
    category: 'ai',
    image: '/images/rag-chatbot.avif',
    githubUrl: 'https://github.com/bhoomik-codes/rag_chatbot',
    featured: true,
    year: '2025',
  },
  {
    id: 'campus-echo',
    title: 'Campus Echo – Real-Time Chat',
    description: 'Real-time web chat application with private rooms, Socket.io, live user presence, and an admin dashboard.',
    longDescription: 'A Socket.io powered real-time messaging platform featuring public rooms, private unlisted channels accessible via connection strings, typing indicators, and a full admin dashboard for room management.',
    tags: ['Node.js', 'Socket.io', 'Express', 'JavaScript'],
    category: 'web',
    image: '/images/chat-with-me.avif',
    githubUrl: 'https://github.com/bhoomik-codes/chat-app',
    featured: true,
    year: '2025',
  },
  {
    id: 'trustflow',
    title: 'TrustFlow Finance',
    description: 'AI-powered loan eligibility chatbot with natural language processing, underwriting logic, and React frontend.',
    longDescription: 'A smart loan eligibility assistant that extracts financial parameters from natural language messages and runs underwriting algorithms in real-time. Built with Node.js backend and a Vite + React frontend.',
    tags: ['React', 'Vite', 'Node.js', 'NLP', 'Chatbot'],
    category: 'fullstack',
    image: '/images/office-erp-system.png',
    featured: true,
    year: '2026',
  },
  {
    id: 'ai-image-gen',
    title: 'AI Image Generator',
    description: 'Text-to-image AI application powered by OpenAI DALL·E API for generating high-quality images from prompts.',
    longDescription: 'An AI-powered image generation web app that uses the OpenAI DALL·E API to turn natural language prompts into stunning images. Features a gallery view, download functionality, and prompt history.',
    tags: ['Node.js', 'OpenAI', 'DALL·E', 'Express', 'JavaScript'],
    category: 'ai',
    image: '/images/ai-image-generator.avif',
    githubUrl: 'https://github.com/bhoomik-codes/ai-image-generator',
    featured: false,
    year: '2024',
  },
];

export const skills: Skill[] = [
  { name: 'TypeScript',    level: 85, category: 'frontend',  color: '#5E5CE6' },
  { name: 'React / Next.js', level: 90, category: 'frontend', color: '#A358DF' },
  { name: 'Node.js',       level: 88, category: 'backend',   color: '#39FF14' },
  { name: 'Python',        level: 82, category: 'ai',        color: '#00E5CC' },
  { name: 'AI / NLP',      level: 80, category: 'ai',        color: '#FF8C00' },
  { name: 'LLM / RAG',     level: 78, category: 'ai',        color: '#5E5CE6' },
  { name: 'PostgreSQL',    level: 75, category: 'backend',   color: '#A358DF' },
  { name: 'Docker',        level: 65, category: 'tools',     color: '#00E5CC' },
  { name: 'Socket.io',     level: 85, category: 'backend',   color: '#39FF14' },
  { name: 'Three.js / R3F',level: 72, category: 'frontend',  color: '#FF8C00' },
];

export const navLinks = [
  { label: 'Home',     href: '#hero' },
  { label: 'About',    href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Contact',  href: '#contact' },
];

export const socialLinks = [
  { name: 'GitHub',    url: 'https://github.com/bhoomik-codes',           icon: 'github' },
  { name: 'LinkedIn',  url: 'https://linkedin.com/in/bhoomik-sevta',      icon: 'linkedin' },
  { name: 'Twitter',   url: 'https://twitter.com/bhoomik_codes',          icon: 'twitter' },
];
