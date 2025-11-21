import React from 'react';
import { motion } from 'framer-motion';
import { RESUME_DATA } from '../constants';
import { MapPin, Building2, ChevronRight } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
           <span className="text-accent font-mono text-sm tracking-wider uppercase mb-2 block">Career History</span>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary">Professional Experience</h2>
        </motion.div>

        <div className="space-y-16 relative">
          {/* Continuous Timeline Line */}
          <div className="absolute left-0 md:left-[300px] top-4 bottom-0 w-px bg-border-primary hidden md:block">
            <motion.div 
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="w-full bg-gradient-to-b from-accent via-blue-600 to-transparent opacity-50"
            />
          </div>

          {RESUME_DATA.experience.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex flex-col md:flex-row gap-10 group"
            >
               {/* Timeline Node */}
               <div className="hidden md:block absolute left-[294px] top-1.5 z-10">
                   <div className="w-3 h-3 rounded-full bg-bg-primary border-2 border-accent shadow-[0_0_10px_var(--accent-glow)] group-hover:scale-125 transition-transform duration-300"></div>
               </div>

              {/* Left Column (Meta) */}
              <div className="md:w-[260px] flex-shrink-0 md:text-right pt-1 pr-4">
                <div className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">{job.period}</div>
                <div className="text-text-muted text-sm flex md:justify-end items-center gap-2 mb-1">
                  <Building2 size={14} /> {job.company}
                </div>
                 <div className="text-text-muted text-sm flex md:justify-end items-center gap-2">
                  <MapPin size={14} /> {job.location}
                </div>
              </div>

              {/* Right Column (Content) */}
              <div className="flex-1 md:pl-12">
                <div className="bg-bg-secondary/40 backdrop-blur-sm border border-border-primary p-8 rounded-2xl hover:border-accent/30 hover:bg-bg-secondary/60 transition-all duration-300 shadow-lg">
                    <h3 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3">
                        {job.role}
                        <span className="hidden group-hover:inline-block text-accent animate-pulse">•</span>
                    </h3>
                    
                    <ul className="space-y-4">
                    {job.description.map((point, idx) => (
                        <li key={idx} className="text-text-secondary text-base leading-relaxed flex items-start gap-3 group/item">
                            <span className="mt-1.5 text-accent/50 group-hover/item:text-accent transition-colors">
                                <ChevronRight size={16} />
                            </span>
                            <span>{point}</span>
                        </li>
                    ))}
                    </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;