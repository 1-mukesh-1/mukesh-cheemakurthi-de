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
                          target.tagName.toLowerCase() === 'button' ||
                          target.closest('a') !== null ||
                          target.closest('button') !== null;
      setIsPointer(isClickable);
    };

    window.addEventListener('mousemove', mouseMove);
    return () => window.removeEventListener('mousemove', mouseMove);
  }, []);

  // Determine colors based on theme
  const dotColor = theme === 'light' ? 'bg-blue-600' : (theme === 'neon' ? 'bg-[#00ff41]' : 'bg-cyan-400');
  const ringBorder = theme === 'light' ? 'border-blue-600' : (theme === 'neon' ? 'border-[#00ff41]' : 'border-cyan-400');

  return (
    <>
      {/* Main Pointer Dot - Moves instantly for precision */}
      <motion.div
        className={`fixed top-0 left-0 w-2.5 h-2.5 ${dotColor} rounded-full pointer-events-none z-[100]`}
        animate={{
          x: mousePosition.x - 5,
          y: mousePosition.y - 5,
          scale: isPointer ? 0.5 : 1 // Shrink slightly on hover for focus
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />
      
      {/* Trailing Ring - Follows with physics for fluid feel */}
      <motion.div
        className={`fixed top-0 left-0 w-10 h-10 border ${ringBorder} rounded-full pointer-events-none z-[99] bg-transparent`}
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isPointer ? 1.5 : 1,
          opacity: isPointer ? 0.5 : 0.2,
          borderWidth: isPointer ? '1px' : '1.5px'
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1
        }}
      />
    </>
  );
};

export default CustomCursor;