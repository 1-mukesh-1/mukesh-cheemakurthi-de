import React from 'react';
import { Sun, Moon, Terminal, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme, showHint, dismissHint } = useTheme();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      
      <AnimatePresence>
        {showHint && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="bg-bg-secondary border border-accent rounded-lg p-4 shadow-xl max-w-[200px] relative"
          >
            <button 
                onClick={dismissHint}
                className="absolute top-1 right-1 text-text-muted hover:text-text-primary"
            >
                <X size={14} />
            </button>
            <p className="text-sm text-text-primary font-medium">
                🎨 Customize your view! Try switching themes here.
            </p>
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-bg-secondary border-b border-r border-accent transform rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-2 bg-bg-secondary/80 backdrop-blur-md p-2 rounded-full border border-border-primary shadow-2xl">
        <button
          onClick={() => { setTheme('dark'); if(showHint) dismissHint(); }}
          className={`p-3 rounded-full transition-all duration-300 ${theme === 'dark' ? 'bg-accent text-bg-primary shadow-[0_0_15px_var(--accent-glow)]' : 'text-text-secondary hover:text-text-primary'}`}
          aria-label="Cosmic Theme"
        >
          <Moon size={20} />
        </button>
        
        <button
          onClick={() => { setTheme('light'); if(showHint) dismissHint(); }}
          className={`p-3 rounded-full transition-all duration-300 ${theme === 'light' ? 'bg-accent text-white shadow-[0_0_15px_var(--accent-glow)]' : 'text-text-secondary hover:text-text-primary'}`}
          aria-label="Professional Theme"
        >
          <Sun size={20} />
        </button>

        <button
          onClick={() => { setTheme('neon'); if(showHint) dismissHint(); }}
          className={`p-3 rounded-full transition-all duration-300 ${theme === 'neon' ? 'bg-accent text-black shadow-[0_0_15px_var(--accent-glow)]' : 'text-text-secondary hover:text-text-primary'}`}
          aria-label="Matrix Theme"
        >
          <Terminal size={20} />
        </button>
      </div>
    </div>
  );
};

export default ThemeToggle;