import React from 'react';
import { motion } from 'framer-motion';
import { RESUME_DATA } from '../constants';
import { ExternalLink, FolderGit2, ArrowUpRight } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
           <span className="text-accent font-mono text-sm tracking-wider uppercase mb-2 block">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary">Featured Projects</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-10">
          {RESUME_DATA.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-bg-secondary/40 backdrop-blur-md border border-border-primary rounded-2xl overflow-hidden hover:shadow-[0_0_40px_var(--accent-dim)] transition-all duration-500"
            >
              {/* Decorative Gradient Bar */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent to-blue-600 opacity-50 group-hover:opacity-100 group-hover:w-1.5 transition-all duration-300" />
              
              <div className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                             <h3 className="text-2xl md:text-3xl font-bold text-text-primary group-hover:text-accent transition-colors">{project.title}</h3>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                            <span className="flex items-center gap-1.5 px-3 py-1 bg-bg-tertiary/50 rounded-full border border-border-secondary">
                                <FolderGit2 size={14} className="text-accent" /> 
                                {project.association}
                            </span>
                            <span className="text-text-muted">|</span>
                            <span className="font-mono text-xs text-text-muted">{project.period}</span>
                        </div>
                    </div>
                    
                    {/* Action Button - Links always visible now */}
                    {project.link && (
                    <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-bg-tertiary text-accent border border-border-secondary hover:bg-accent hover:text-bg-primary hover:border-accent transition-all duration-300 group/btn"
                    >
                        <span className="font-medium">View Project</span>
                        <ArrowUpRight size={18} className="group-hover/btn:rotate-45 transition-transform duration-300" />
                    </a>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                    {project.points.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 mt-2.5 rounded-full bg-text-muted group-hover:bg-accent transition-colors flex-shrink-0" />
                            <p className="text-text-secondary text-sm leading-relaxed group-hover:text-text-primary transition-colors">{point}</p>
                        </div>
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

export default Projects;