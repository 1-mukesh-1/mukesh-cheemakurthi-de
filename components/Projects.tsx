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
           <span className="text-cyan-500 font-mono text-sm tracking-wider uppercase mb-2 block">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100">Featured Projects</h2>
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
              className="group relative bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden hover:shadow-[0_0_40px_rgba(6,182,212,0.1)] transition-all duration-500"
            >
              {/* Decorative Gradient Bar */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-600 opacity-50 group-hover:opacity-100 group-hover:w-1.5 transition-all duration-300" />
              
              <div className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                             <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                             {project.link && (
                                 <a 
                                    href={project.link} 
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-slate-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 duration-300"
                                >
                                    <ExternalLink size={20} />
                                 </a>
                             )}
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                            <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700/50">
                                <FolderGit2 size={14} className="text-cyan-500" /> 
                                {project.association}
                            </span>
                            <span className="text-slate-600">|</span>
                            <span className="font-mono text-xs text-slate-500">{project.period}</span>
                        </div>
                    </div>
                    
                    {/* Action Button */}
                    {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer" className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 text-cyan-400 border border-slate-700 group-hover:bg-cyan-500 group-hover:text-white group-hover:border-cyan-400 transition-all duration-300">
                        <ArrowUpRight size={24} className="group-hover:rotate-45 transition-transform duration-300" />
                    </a>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                    {project.points.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 mt-2.5 rounded-full bg-slate-600 group-hover:bg-cyan-500 transition-colors flex-shrink-0" />
                            <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">{point}</p>
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