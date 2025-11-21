import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowDown, Download, Sparkles } from 'lucide-react';
import { RESUME_DATA } from '../constants';

// Text Scramble Hook
const useScrambleText = (text: string, speed: number = 30) => {
  const [display, setDisplay] = useState(text);
  const iterations = useRef(0);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iterations.current) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iterations.current >= text.length) {
        clearInterval(interval);
      }
      
      iterations.current += 1 / 3;
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return display;
};

const MagneticButton: React.FC<{ children: React.ReactNode; href?: string; className?: string; primary?: boolean }> = ({ children, href, className, primary }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: xSpring, y: ySpring }}
      className={className}
    >
      {children}
    </motion.a>
  );
};

const Hero: React.FC = () => {
  const scrambledName = useScrambleText(RESUME_DATA.personal.name);
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 150]); 
  const yCard = useTransform(scrollY, [0, 500], [0, -50]);

  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; 
    const rotateY = ((x - centerX) / centerX) * 10;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative px-6 pt-20 overflow-hidden">
      <div className="max-w-6xl w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            
          {/* Text Content */}
          <motion.div style={{ y: yText }} className="lg:col-span-3 space-y-8 relative z-10">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 mb-4"
              >
                <span className="h-px w-8 bg-accent"></span>
                <span className="text-accent font-medium tracking-widest text-sm uppercase">Data Engineer</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold text-text-primary leading-tight mb-4 tracking-tight font-sans">
                  {scrambledName}
              </h1>
              
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-2xl md:text-3xl text-text-secondary font-light flex items-center gap-3"
              >
                Building Scalable Data Systems
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-text-secondary leading-relaxed max-w-2xl border-l-2 border-border-secondary pl-6"
              >
                {RESUME_DATA.personal.summary}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <MagneticButton
                  href="#contact"
                  className="group relative px-8 py-3 bg-accent text-bg-primary font-bold rounded-full overflow-hidden transition-all hover:shadow-[0_0_30px_var(--accent-glow)]"
                  primary
                >
                  <span className="relative z-10 flex items-center gap-2">
                     Get in Touch <Sparkles size={18} />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </MagneticButton>

                <MagneticButton
                  href="#"
                  className="px-8 py-3 border border-border-secondary hover:border-accent/50 hover:bg-bg-secondary/50 text-text-secondary font-medium rounded-full transition-all flex items-center gap-2 backdrop-blur-sm"
                >
                  <Download size={18} />
                  Download Resume
                </MagneticButton>
              </motion.div>
          </motion.div>

          {/* Interactive Stats Card */}
          <motion.div
            style={{ y: yCard }}
            className="hidden lg:col-span-2 lg:block relative perspective-1000"
          >
             <div 
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="p-8 rounded-2xl bg-gradient-to-br from-bg-secondary/90 to-bg-secondary/40 backdrop-blur-xl border border-border-primary shadow-2xl transition-transform duration-100 ease-linear transform-gpu"
             >
                 {/* Decorative elements on card */}
                 <div className="absolute top-0 right-0 w-20 h-20 bg-accent/20 blur-[40px] rounded-full pointer-events-none" />
                 
                 <div className="space-y-8 relative z-10">
                    <div className="flex items-center justify-between group hover:bg-bg-tertiary/30 p-3 rounded-lg transition-colors">
                        <div className="flex flex-col">
                             <span className="text-xs text-text-muted uppercase tracking-widest mb-1">Optimization</span>
                             <span className="text-text-primary font-medium">Pipeline Runtime</span>
                        </div>
                        <div className="text-right">
                            <span className="block text-2xl text-green-400 font-bold font-mono">-87%</span>
                            <span className="text-xs text-green-500/70">8h → 1h</span>
                        </div>
                    </div>
                    
                    <div className="w-full h-px bg-border-primary" />

                    <div className="flex items-center justify-between group hover:bg-bg-tertiary/30 p-3 rounded-lg transition-colors">
                        <div className="flex flex-col">
                             <span className="text-xs text-text-muted uppercase tracking-widest mb-1">Scale</span>
                             <span className="text-text-primary font-medium">Daily Processing</span>
                        </div>
                        <div className="text-right">
                            <span className="block text-2xl text-accent font-bold font-mono">1TB+</span>
                            <span className="text-xs text-accent-dim text-accent">Spark & Hadoop</span>
                        </div>
                    </div>

                    <div className="w-full h-px bg-border-primary" />

                    <div className="flex items-center justify-between group hover:bg-bg-tertiary/30 p-3 rounded-lg transition-colors">
                        <div className="flex flex-col">
                             <span className="text-xs text-text-muted uppercase tracking-widest mb-1">Quality</span>
                             <span className="text-text-primary font-medium">Data Accuracy</span>
                        </div>
                        <div className="text-right">
                            <span className="block text-2xl text-purple-400 font-bold font-mono">99.5%</span>
                            <span className="text-xs text-purple-500/70">Automated Alerts</span>
                        </div>
                    </div>
                 </div>
             </div>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#experience"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-text-muted hover:text-accent cursor-pointer z-20"
      >
        <ArrowDown size={24} />
      </motion.a>
    </section>
  );
};

export default Hero;