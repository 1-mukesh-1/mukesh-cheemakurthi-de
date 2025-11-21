import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over a clickable element
      const target = e.target as HTMLElement;
      const isClickable = window.getComputedStyle(target).cursor === 'pointer' || 
                          target.tagName.toLowerCase() === 'a' || 
                          target.tagName.toLowerCase() === 'button';
      setIsPointer(isClickable);
    };

    window.addEventListener('mousemove', mouseMove);
    return () => window.removeEventListener('mousemove', mouseMove);
  }, []);

  // Determine colors based on theme for the cursor
  const cursorColor = theme === 'light' ? 'border-blue-600' : (theme === 'neon' ? 'border-[#00ff41]' : 'border-cyan-400');
  const centerColor = theme === 'light' ? 'bg-blue-600' : (theme === 'neon' ? 'bg-[#00ff41]' : 'bg-cyan-400');

  return (
    <>
      {/* Center Diamond */}
      <motion.div
        className={`fixed top-0 left-0 w-2 h-2 ${centerColor} rotate-45 pointer-events-none z-[100]`}
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isPointer ? 0 : 1
        }}
        transition={{ type: "tween", ease: "linear", duration: 0.1 }}
      />
      
      {/* Outer Target Reticle */}
      <motion.div
        className={`fixed top-0 left-0 w-8 h-8 border-2 ${cursorColor} pointer-events-none z-[99] backdrop-invert-0`}
        style={{ borderRadius: '4px' }}
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          rotate: isPointer ? 45 : 0,
          scale: isPointer ? 1.5 : 1,
          opacity: 0.8
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
         {/* Crosshair lines */}
         <div className={`absolute top-1/2 left-[-4px] w-[6px] h-[2px] ${centerColor} -translate-y-1/2`} />
         <div className={`absolute top-1/2 right-[-4px] w-[6px] h-[2px] ${centerColor} -translate-y-1/2`} />
         <div className={`absolute left-1/2 top-[-4px] w-[2px] h-[6px] ${centerColor} -translate-x-1/2`} />
         <div className={`absolute left-1/2 bottom-[-4px] w-[2px] h-[6px] ${centerColor} -translate-x-1/2`} />
      </motion.div>
    </>
  );
};

export default CustomCursor;