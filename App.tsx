import React, { Suspense } from 'react';
import Background3D from './components/Background3D';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './contexts/ThemeContext';

function AppContent() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent/30 cursor-none transition-colors duration-500">
      {/* Global Custom Cursor */}
      <CustomCursor />

      {/* Theme Switcher */}
      <ThemeToggle />

      <Navigation />
      
      {/* 3D Background Canvas - Suspense handles the loading state of 3D assets */}
      <Suspense fallback={<div className="fixed inset-0 bg-bg-primary z-[-1]" />}>
        <Background3D />
      </Suspense>

      <main className="relative z-10">
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;