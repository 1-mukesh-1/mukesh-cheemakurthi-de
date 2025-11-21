import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import { RESUME_DATA } from '../constants';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled ? 'bg-bg-primary/80 backdrop-blur-md border-b border-border-primary py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-xl font-bold text-accent tracking-wider font-mono">
          MC<span className="text-text-primary">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-text-secondary hover:text-accent text-sm font-medium transition-colors uppercase tracking-wide"
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center space-x-4 ml-6 border-l border-border-secondary pl-6">
             <a href={RESUME_DATA.personal.linkedin} target="_blank" rel="noreferrer" className="text-text-muted hover:text-text-primary transition-colors">
                <Linkedin size={18} />
             </a>
             <a href={RESUME_DATA.personal.github} target="_blank" rel="noreferrer" className="text-text-muted hover:text-text-primary transition-colors">
                <Github size={18} />
             </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-text-secondary hover:text-accent"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-bg-secondary/95 backdrop-blur-lg border-b border-border-primary shadow-2xl">
          <div className="flex flex-col px-6 py-8 space-y-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg text-text-secondary hover:text-accent font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;