import React from 'react';
import { motion } from 'framer-motion';
import { RESUME_DATA } from '../constants';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 px-6 border-t border-border-primary bg-bg-secondary/80 backdrop-blur-lg">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-text-primary mb-6">Let's Connect</h2>
            <p className="text-text-secondary mb-8 text-lg leading-relaxed">
              I'm currently seeking new opportunities in Data Engineering and Cloud Architecture. 
              Whether you have a question or just want to say hi, my inbox is always open.
            </p>
            
            <div className="space-y-4">
              <a href={`mailto:${RESUME_DATA.personal.email}`} className="flex items-center gap-4 text-text-secondary hover:text-accent transition-colors group">
                <div className="p-3 bg-bg-tertiary rounded-full group-hover:bg-accent/10 transition-colors">
                    <Mail size={20} />
                </div>
                <span className="text-lg">{RESUME_DATA.personal.email}</span>
              </a>
              
              <div className="flex items-center gap-4 text-text-secondary">
                 <div className="p-3 bg-bg-tertiary rounded-full">
                    <Phone size={20} />
                 </div>
                <span className="text-lg">{RESUME_DATA.personal.phone}</span>
              </div>

              <div className="flex items-center gap-4 text-text-secondary">
                 <div className="p-3 bg-bg-tertiary rounded-full">
                    <MapPin size={20} />
                 </div>
                <span className="text-lg">{RESUME_DATA.personal.location}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between">
             <div className="bg-bg-tertiary p-8 rounded-2xl border border-border-primary">
                <h3 className="text-xl font-bold text-text-primary mb-6">Education</h3>
                <div className="space-y-6">
                    {RESUME_DATA.education.map((edu, idx) => (
                        <div key={idx}>
                            <div className="flex justify-between items-start">
                                <h4 className="text-accent font-medium">{edu.school}</h4>
                                <span className="text-xs text-text-muted bg-bg-secondary px-2 py-1 rounded border border-border-secondary">{edu.period}</span>
                            </div>
                            <p className="text-text-primary text-sm mt-1">{edu.degree}</p>
                            <p className="text-text-muted text-xs mt-1">GPA: {edu.gpa || 'N/A'}</p>
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
                    className="flex-1 py-4 bg-bg-tertiary hover:bg-border-secondary text-text-primary rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                >
                    <Github size={20} /> GitHub
                </a>
             </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-border-primary text-center text-text-muted text-sm">
          <p>© {new Date().getFullYear()} {RESUME_DATA.personal.name}. All rights reserved.</p>
          <p className="mt-2">Built with React, Three.js, and Tailwind CSS.</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;