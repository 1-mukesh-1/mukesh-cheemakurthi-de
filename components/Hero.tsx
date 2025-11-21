import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

const Hero: React.FC = () => {
  const scrambledName = useScrambleText(RESUME_DATA.personal.name);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
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
          <div className="lg:col-span-3 space-y-8 relative">
            <motion.div style={{ y: y1 }} className="relative z-10">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 mb-4"
              >
                <span className="h-px w-8 bg-cyan-500"></span>
                <span className="text-cyan-400 font-medium tracking-widest text-sm uppercase">Data Engineer</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold text-slate-100 leading-tight mb-4 tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-500">
                  {scrambledName}
                </span>
              </h1>
              
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-2xl md:text-3xl text-slate-400 font-light flex items-center gap-3"
              >
                Building Scalable Data Systems
              </motion.h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-400 leading-relaxed max-w-2xl border-l-2 border-slate-800 pl-6"
            >
              {RESUME_DATA.personal.summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <a
                href="#contact"
                className="group relative px-8 py-3 bg-cyan-500 text-slate-950 font-bold rounded-full overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                   Get in Touch <Sparkles size={18} />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </a>
              <a
                href="#"
                className="px-8 py-3 border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-900/50 text-slate-300 font-medium rounded-full transition-all flex items-center gap-2 backdrop-blur-sm"
              >
                <Download size={18} />
                Download Resume
              </a>
            </motion.div>
          </div>

          {/* Interactive Stats Card */}
          <motion.div
            style={{ y: y2 }}
            className="hidden lg:col-span-2 lg:block relative perspective-1000"
          >
             <div 
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-900/40 backdrop-blur-xl border border-slate-700/50 shadow-2xl transition-transform duration-100 ease-linear transform-gpu"
             >
                 {/* Decorative elements on card */}
                 <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/20 blur-[40px] rounded-full pointer-events-none" />
                 <div className="absolute bottom-0 left-0 w-20 h-20 bg-purple-500/20 blur-[40px] rounded-full pointer-events-none" />

                 <div className="space-y-8 relative z-10">
                    <div className="flex items-center justify-between group hover:bg-white/5 p-3 rounded-lg transition-colors">
                        <div className="flex flex-col">
                             <span className="text-xs text-slate-500 uppercase tracking-widest mb-1">Optimization</span>
                             <span className="text-slate-200 font-medium">Pipeline Runtime</span>
                        </div>
                        <div className="text-right">
                            <span className="block text-2xl text-green-400 font-bold font-mono">-87%</span>
                            <span className="text-xs text-green-500/70">8h → 1h</span>
                        </div>
                    </div>
                    
                    <div className="w-full h-px bg-slate-800" />

                    <div className="flex items-center justify-between group hover:bg-white/5 p-3 rounded-lg transition-colors">
                        <div className="flex flex-col">
                             <span className="text-xs text-slate-500 uppercase tracking-widest mb-1">Scale</span>
                             <span className="text-slate-200 font-medium">Daily Processing</span>
                        </div>
                        <div className="text-right">
                            <span className="block text-2xl text-cyan-400 font-bold font-mono">1TB+</span>
                            <span className="text-xs text-cyan-500/70">Spark & Hadoop</span>
                        </div>
                    </div>

                    <div className="w-full h-px bg-slate-800" />

                    <div className="flex items-center justify-between group hover:bg-white/5 p-3 rounded-lg transition-colors">
                        <div className="flex flex-col">
                             <span className="text-xs text-slate-500 uppercase tracking-widest mb-1">Quality</span>
                             <span className="text-slate-200 font-medium">Data Accuracy</span>
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 hover:text-cyan-400 cursor-pointer"
      >
        <ArrowDown size={24} />
      </motion.a>
    </section>
  );
};

export default Hero;