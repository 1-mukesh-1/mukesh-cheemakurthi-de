export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  location: string;
  gpa?: string;
  coursework: string;
}

export interface Project {
  title: string;
  period: string;
  association: string;
  location: string;
  points: string[];
  link?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ResumeData {
  personal: {
    name: string;
    title: string;
    location: string;
    email: string;
    linkedin: string;
    github: string;
    phone: string;
    summary: string;
  };
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: SkillCategory[];
}