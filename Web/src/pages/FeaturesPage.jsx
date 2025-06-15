import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, UploadCloud, Cpu, Presentation, Edit, Download, Share2, Star, ShieldCheck, FileText, Database, Zap, Palette, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const featuresList = [
  { icon: UploadCloud, title: "Effortless Upload (PDF & DOCX)", description: "Easily upload your scientific papers in popular formats. Just drag and drop or select files from your device." },
  { icon: Cpu, title: "Advanced AI Summarization", description: "Our custom AI model analyzes complex scientific text, identifies key findings, and extracts essential information." },
  { icon: Presentation, title: "Instant Slide Generation", description: "Automatically transforms summarized content into well-structured, presentation-ready slides with titles and bullet points." },
  { icon: Edit, title: "Real-time Slide Editor", description: "Customize generated slides directly in the app. Edit text, reorder points, and refine content before finalizing." },
  { icon: Download, title: "Multiple Export Options (PPTX & PDF)", description: "Export your finished presentation in standard formats compatible with Microsoft PowerPoint and Adobe Acrobat." },
  { icon: FileText, title: "Enhanced PDF Export", description: "Professional PDF export with custom styling, gradients, and optimized layout for print and digital sharing." },
  { icon: Database, title: "PPTX File Management", description: "Save and manage all your generated PPTX files in the database. Download previous versions anytime with secure access." },
  { icon: Zap, title: "Genetic Algorithm Optimization", description: "Premium GA-powered PPTX generation for superior layout optimization and professional presentation design." },
  { icon: Palette, title: "Custom Scrollbar Styling", description: "Beautiful, professional scrollbar design with gradient effects and smooth animations for enhanced user experience." },
  { icon: Eye, title: "Live Presentation Preview", description: "Preview your slides in real-time with Reveal.js integration, smooth transitions, and interactive navigation." },
  { icon: Share2, title: "Easy Sharing Capabilities", description: "Share your presentation via a unique link or directly through email with colleagues and collaborators." },
  { icon: Star, title: "Rating & Feedback System", description: "Rate generated presentations and provide feedback to help us improve the AI model and user experience." },
  { icon: ShieldCheck, title: "Secure & Private", description: "Your uploaded documents and generated content are handled securely, respecting your privacy and intellectual property." },
];

const FeaturesPage = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">SlideSpace Features</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover the powerful tools SlideSpace offers to streamline your research communication workflow.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuresList.map((feature, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
          >
            <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-border/60 bg-card flex flex-col">
              <CardHeader className="flex flex-row items-start space-x-4 pb-4">
                 <div className="flex-shrink-0 bg-primary/10 p-3 rounded-full">
                    <feature.icon className="w-6 h-6 text-primary" />
                 </div>
                 <div>
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                 </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
               <div className="p-6 pt-0 mt-auto">
                 <CheckCircle className="w-5 h-5 text-green-500 inline mr-2" />
                 <span className="text-sm font-medium text-green-600">Included in all plans</span>
               </div>
            </Card>
          </motion.div>
        ))}
      </div>

       {/* Call to Action Section */}
      <motion.section
        className="w-full mt-16 py-16 bg-gradient-to-r from-blue-50 via-transparent to-gray-50 rounded-lg text-center"
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         viewport={{ once: true }}
         transition={{ duration: 0.7, delay: 0.3 }}
      >
        <div className="container px-4 mx-auto md:px-6">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Ready to Experience the Future of Scientific Presentations?
          </h2>
          <p className="max-w-xl mx-auto mb-8 text-lg text-gray-600">
            Sign up for SlideSpace today and transform your research papers into compelling slides effortlessly.
          </p>
          <Link to="/signup">
            <Button size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
               Get Started Now
            </Button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default FeaturesPage;
  