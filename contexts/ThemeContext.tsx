import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light' | 'neon';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  showHint: boolean;
  dismissHint: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [showHint, setShowHint] = useState(false);

  // Color maps for JS-side usage (Three.js)
  const themeColors = {
    dark: { primary: '#020617', secondary: '#94a3b8', accent: '#22d3ee' },
    light: { primary: '#f8fafc', secondary: '#475569', accent: '#2563eb' },
    neon: { primary: '#000000', secondary: '#008f11', accent: '#00ff41' }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }

    const hintSeen = localStorage.getItem('theme_hint_seen');
    if (!hintSeen) {
      // Show hint after a short delay
      setTimeout(() => setShowHint(true), 2000);
    }
  }, []);

  useEffect(() => {
    // Remove old classes
    document.body.classList.remove('theme-dark', 'theme-light', 'theme-neon');
    // Add new class
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const dismissHint = () => {
    setShowHint(false);
    localStorage.setItem('theme_hint_seen', 'true');
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      colors: themeColors[theme], 
      showHint, 
      dismissHint 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};