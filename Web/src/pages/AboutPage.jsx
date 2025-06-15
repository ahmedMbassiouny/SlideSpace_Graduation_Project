import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Cpu, Target, Users, Code, Database, Server, Globe, Palette, Presentation, FileText, Brain, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const teamMembers = [
  { name: "Ahmed Bassiouny", role: "Fullstack Lead", icon: <Code className="w-8 h-8 text-blue-500" />, initials: "AB" },
  { name: "Ahmed Ismail", role: "Backend Lead", icon: <Server className="w-8 h-8 text-green-500" />, initials: "AI" },
  { name: "Ahmed Makboul", role: "ML Lead", icon: <Cpu className="w-8 h-8 text-purple-500" />, initials: "AM" },
  { name: "Hossam Ahmed", role: "ML Developer", icon: <Brain className="w-8 h-8 text-indigo-500" />, initials: "HA" },
  { name: "Ahmed Mostafa", role: "ML Developer", icon: <Zap className="w-8 h-8 text-orange-500" />, initials: "AM" },
  { name: "Omar Iman", role: "ML Developer", icon: <Target className="w-8 h-8 text-red-500" />, initials: "OI" },
];

const techStack = [
  // Frontend Technologies
  { name: "React 18", icon: <Code className="w-5 h-5 text-blue-500" />, category: "Frontend" },
  { name: "Vite", icon: <Code className="w-5 h-5 text-purple-500" />, category: "Build Tool" },
  { name: "TailwindCSS", icon: <Code className="w-5 h-5 text-teal-500" />, category: "Styling" },
  { name: "Framer Motion", icon: <Code className="w-5 h-5 text-pink-500" />, category: "Animation" },
  { name: "shadcn/ui", icon: <Code className="w-5 h-5 text-gray-700" />, category: "UI Components" },
  { name: "React Router", icon: <Code className="w-5 h-5 text-red-500" />, category: "Routing" },
  { name: "Lucide React", icon: <Code className="w-5 h-5 text-green-500" />, category: "Icons" },
  
  // Backend Technologies
  { name: "PHP 8", icon: <Server className="w-5 h-5 text-purple-600" />, category: "Backend" },
  { name: "MySQL", icon: <Database className="w-5 h-5 text-blue-600" />, category: "Database" },
  { name: "Apache", icon: <Server className="w-5 h-5 text-orange-500" />, category: "Web Server" },
  { name: "XAMPP", icon: <Server className="w-5 h-5 text-green-600" />, category: "Development" },
  
  // AI & ML Technologies
  { name: "Custom AI Model", icon: <Cpu className="w-5 h-5 text-orange-500" />, category: "AI/ML" },
  { name: "Genetic Algorithm", icon: <Cpu className="w-5 h-5 text-indigo-500" />, category: "AI/ML" },
  { name: "Python/PyTorch", icon: <Cpu className="w-5 h-5 text-yellow-500" />, category: "AI/ML" },
  
  // Presentation & Export
  { name: "Reveal.js", icon: <Presentation className="w-5 h-5 text-blue-400" />, category: "Presentation" },
  { name: "PPTX Generation", icon: <FileText className="w-5 h-5 text-green-500" />, category: "Export" },
  { name: "PDF Export", icon: <FileText className="w-5 h-5 text-red-500" />, category: "Export" },
  
  // Development Tools
  { name: "Git", icon: <Code className="w-5 h-5 text-orange-600" />, category: "Version Control" },
  { name: "PostCSS", icon: <Code className="w-5 h-5 text-purple-400" />, category: "CSS Processing" },
  { name: "ESLint", icon: <Code className="w-5 h-5 text-blue-400" />, category: "Code Quality" },
];

const AboutPage = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-12"
      >
        {/* Mission Section */}
        <Card className="shadow-lg border-border/60 bg-card overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <CardHeader className="p-0 mb-4">
                <Target className="w-10 h-10 text-primary mb-3" />
                <CardTitle className="text-3xl font-bold text-primary">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  SlideSpace aims to revolutionize how researchers and professionals interact with scientific literature. We bridge the gap between complex papers and clear communication by leveraging cutting-edge AI to automate the creation of insightful presentations. Our goal is to save valuable time and enhance knowledge sharing within the scientific community.
                </p>
              </CardContent>
            </div>
             <div className="md:w-1/2 relative min-h-[250px] md:min-h-full">
               <img  class="absolute inset-0 w-full h-full object-cover" alt="Abstract image representing connection and transformation" src="https://images.unsplash.com/photo-1643101807331-21a4a3f081d5" />
             </div>
          </div>
        </Card>

        {/* AI Model Section */}
        <Card className="shadow-lg border-border/60 bg-card">
          <CardHeader className="text-center">
             <Cpu className="w-10 h-10 text-primary mx-auto mb-3" />
            <CardTitle className="text-2xl font-semibold">The SlideSpace AI Engine</CardTitle>
            <CardDescription>Intelligent summarization tailored for science.</CardDescription>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground max-w-2xl mx-auto">
            <p>
              At the heart of SlideSpace is our proprietary AI model, specifically trained to understand the nuances of scientific writing across various domains like AI, ML, and Computer Vision. It identifies key concepts, extracts crucial figures and data points, and structures them logically into presentation slides, maintaining the core message of the original paper.
            </p>
          </CardContent>
        </Card>

        {/* Team Section */}
        <Card className="shadow-lg border-border/60 bg-card">
          <CardHeader className="text-center">
             <Users className="w-10 h-10 text-primary mx-auto mb-3" />
            <CardTitle className="text-2xl font-semibold">Meet the Team</CardTitle>
            <CardDescription>The minds behind SlideSpace.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                className="text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4 }}
              >
                <div className="w-24 h-24 mb-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center border-4 border-primary/20">
                  {member.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Tech Stack Section */}
        <Card className="shadow-lg border-border/60 bg-card">
          <CardHeader className="text-center">
             <Code className="w-10 h-10 text-primary mx-auto mb-3" />
            <CardTitle className="text-2xl font-semibold">Technology Stack</CardTitle>
            <CardDescription>The tools and technologies powering SlideSpace.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech) => (
              <motion.div
                key={tech.name}
                className="flex items-center space-x-2 bg-muted px-3 py-1.5 rounded-full text-sm text-muted-foreground border border-transparent hover:border-primary/30 hover:bg-primary/5 transition-all"
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true, amount: 0.8 }}
                 transition={{ duration: 0.3 }}
              >
                {tech.icon}
                <span>{tech.name}</span>
                <span className="text-xs opacity-70">({tech.category})</span>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AboutPage;
  