import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { RESUME_DATA } from '../constants';
import { Code2, Database, Cloud, Server, Globe, Terminal } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  "Languages": <Terminal size={24} />,
  "Big Data ETL": <Server size={24} />,
  "Storage": <Database size={24} />,
  "Cloud & DevOps": <Cloud size={24} />,
  "Web": <Globe size={24} />
};

const Skills: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <section id="skills" className="py-24 px-6 bg-slate-950 relative overflow-hidden">
       {/* Background Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
           <span className="text-cyan-500 font-mono text-sm tracking-wider uppercase mb-2 block">Capabilities</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100">Technical Expertise</h2>
        </motion.div>

        <div 
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative"
        >
             {/* Spotlight Effect Layer */}
            <div 
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-30"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(6,182,212,0.15), transparent 40%)`
                }}
            />

          {RESUME_DATA.skills.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative h-full bg-slate-900/50 border border-slate-800 rounded-2xl p-8 overflow-hidden group hover:border-slate-700 transition-colors"
            >
               {/* Inner Card Spotlight (Subtle) */}
               <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`
                  }}
               />

              <div className="relative z-20">
                  <div className="flex items-center justify-between mb-6">
                     <div className="p-3 bg-slate-800/50 rounded-xl text-cyan-400 shadow-inner shadow-cyan-900/20 ring-1 ring-slate-700">
                        {iconMap[category.category] || <Code2 size={24} />}
                     </div>
                     <span className="text-xs font-mono text-slate-500">{category.skills.length} SKILLS</span>
                  </div>
                
                <h3 className="text-xl font-bold text-slate-100 mb-4 group-hover:text-cyan-400 transition-colors">{category.category}</h3>
                
                <div className="flex flex-wrap gap-2">
                    {category.skills.map(skill => (
                    <span
                        key={skill}
                        className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 rounded-md border border-slate-700/50 hover:bg-cyan-950/30 hover:border-cyan-500/30 hover:text-cyan-200 transition-all cursor-default"
                    >
                        {skill}
                    </span>
                    ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;