import React, { Suspense } from 'react';
import Background3D from './components/Background3D';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30 cursor-none">
      {/* Global Custom Cursor */}
      <CustomCursor />

      <Navigation />
      
      {/* 3D Background Canvas - Suspense handles the loading state of 3D assets */}
      <Suspense fallback={<div className="fixed inset-0 bg-slate-950 z-[-1]" />}>
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

export default App;