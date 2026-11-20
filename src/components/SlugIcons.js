'use client';

// Client boundary for lucide icons used by the src/app/[slug] Server Component.
// Importing lucide-react directly in a Server Component can pull its React
// context into the server bundle and fail the build ("createContext is not a function").
export { ArrowLeft, Clock, ArrowRight, Home, ChevronRight } from 'lucide-react';
