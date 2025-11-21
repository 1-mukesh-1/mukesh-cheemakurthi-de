import React from 'react';
import { motion } from 'framer-motion';
import { RESUME_DATA } from '../constants';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-6 border-t border-slate-900 bg-slate-950/80 backdrop-blur-lg">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-6">Let's Connect</h2>
            <p className="text-slate-400 mb-8 text-lg leading-relaxed">
              I'm currently seeking new opportunities in Data Engineering and Cloud Architecture. 
              Whether you have a question or just want to say hi, my inbox is always open.
            </p>
            
            <div className="space-y-4">
              <a href={`mailto:${RESUME_DATA.personal.email}`} className="flex items-center gap-4 text-slate-300 hover:text-cyan-400 transition-colors group">
                <div className="p-3 bg-slate-900 rounded-full group-hover:bg-cyan-500/10 transition-colors">
                    <Mail size={20} />
                </div>
                <span className="text-lg">{RESUME_DATA.personal.email}</span>
              </a>
              
              <div className="flex items-center gap-4 text-slate-300">
                 <div className="p-3 bg-slate-900 rounded-full">
                    <Phone size={20} />
                 </div>
                <span className="text-lg">{RESUME_DATA.personal.phone}</span>
              </div>

              <div className="flex items-center gap-4 text-slate-300">
                 <div className="p-3 bg-slate-900 rounded-full">
                    <MapPin size={20} />
                 </div>
                <span className="text-lg">{RESUME_DATA.personal.location}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between">
             <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <h3 className="text-xl font-bold text-white mb-6">Education</h3>
                <div className="space-y-6">
                    {RESUME_DATA.education.map((edu, idx) => (
                        <div key={idx}>
                            <div className="flex justify-between items-start">
                                <h4 className="text-cyan-400 font-medium">{edu.school}</h4>
                                <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">{edu.period}</span>
                            </div>
                            <p className="text-white text-sm mt-1">{edu.degree}</p>
                            <p className="text-slate-500 text-xs mt-1">GPA: {edu.gpa || 'N/A'}</p>
                        </div>
                    ))}
                </div>
             </div>

             <div className="flex gap-4 mt-8 md:mt-0">
                <a 
                    href={RESUME_DATA.personal.linkedin} 
                    className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                >
                    <Linkedin size={20} /> LinkedIn
                </a>
                <a 
                    href={RESUME_DATA.personal.github} 
                    className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                >
                    <Github size={20} /> GitHub
                </a>
             </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-slate-900 text-center text-slate-600 text-sm">
          <p>© {new Date().getFullYear()} {RESUME_DATA.personal.name}. All rights reserved.</p>
          <p className="mt-2">Built with React, Three.js, and Tailwind CSS.</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;