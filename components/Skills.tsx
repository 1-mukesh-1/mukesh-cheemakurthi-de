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

const TiltCard: React.FC<{ children: React.ReactNode; index: number }> = ({ children, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5; 
    const rotateY = ((x - centerX) / centerX) * 5;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseEnter = () => setOpacity(1);
  
  const handleMouseLeave = () => {
    setOpacity(0);
    if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="perspective-1000"
    >
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative h-full bg-bg-secondary/50 border border-border-primary rounded-2xl p-8 overflow-hidden group hover:border-border-secondary transition-all duration-200 ease-out transform-gpu"
        >
             {/* Inner Card Spotlight */}
             <div 
                className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
                style={{
                  opacity,
                  background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, var(--accent-dim), transparent 40%)`
                }}
             />
             {children}
        </div>
    </motion.div>
  );
}

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 px-6 bg-bg-primary relative overflow-hidden">
       {/* Background Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
           <span className="text-accent font-mono text-sm tracking-wider uppercase mb-2 block">Capabilities</span>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary">Technical Expertise</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {RESUME_DATA.skills.map((category, index) => (
            <TiltCard key={category.category} index={index}>
              <div className="relative z-20">
                  <div className="flex items-center justify-between mb-6">
                     <div className="p-3 bg-bg-tertiary/50 rounded-xl text-accent shadow-inner shadow-accent/10 ring-1 ring-border-secondary">
                        {iconMap[category.category] || <Code2 size={24} />}
                     </div>
                     <span className="text-xs font-mono text-text-muted">{category.skills.length} SKILLS</span>
                  </div>
                
                <h3 className="text-xl font-bold text-text-primary mb-4 group-hover:text-accent transition-colors">{category.category}</h3>
                
                <div className="flex flex-wrap gap-2">
                    {category.skills.map(skill => (
                    <span
                        key={skill}
                        className="px-3 py-1.5 text-xs font-medium text-text-secondary bg-bg-tertiary/80 rounded-md border border-border-secondary hover:border-accent/30 hover:text-accent transition-all cursor-default"
                    >
                        {skill}
                    </span>
                    ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;