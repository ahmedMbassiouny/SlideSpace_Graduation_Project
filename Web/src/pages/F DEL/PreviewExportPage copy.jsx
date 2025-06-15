
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { RevealPresentation } from '@/components/ui/RevealPresentation';
import { ArrowLeft, ArrowRight, Download, Share2, Mail, Link as LinkIcon, Copy, Star, Maximize } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data (same as SlideGenerationPage for consistency)
const mockSlides = [
  { id: 1, title: "Introduction to Quantum Computing", points: ["- Basic principles", "- Qubits vs bits", "- Potential applications"] },
  { id: 2, title: "Key Concepts", points: ["- Superposition", "- Entanglement", "- Quantum gates"] },
  { id: 3, title: "Algorithms", points: ["- Shor's algorithm", "- Grover's algorithm", "- Quantum simulation"] },
  { id: 4, title: "Hardware Challenges", points: ["- Decoherence", "- Scalability", "- Error correction"] },
  { id: 5, title: "Future Outlook", points: ["- Research directions", "- Industry impact", "- Ethical considerations"] },
];

const PreviewExportPage = () => {
  const [slides] = useState(mockSlides);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [shareLink] = useState("https://slidespace.example.com/share/xyz123"); // Placeholder link
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const currentSlide = slides[currentSlideIndex];

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleExport = (format) => {
    toast({ title: "Export Started", description: `Downloading presentation as ${format.toUpperCase()}...` });
    // Placeholder for actual export logic
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    toast({ title: "Link Copied", description: "Share link copied to clipboard." });
  };

   const handleShareEmail = () => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
       toast({ variant: "destructive", title: "Invalid Email", description: "Please enter a valid email address." });
       return;
    }
    toast({ title: "Shared via Email", description: `Presentation link sent to ${email}.` });
    // Placeholder for actual email sending logic
    setEmail(""); // Clear input after sending
  };

  const handleRate = (rating) => {
    toast({ title: "Rating Submitted", description: `You rated this presentation ${rating} stars.` });
     // Placeholder for rating submission
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
         toast({ variant: "destructive", title: "Fullscreen Error", description: `Could not enter fullscreen mode: ${err.message}` });
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
     // Listen for exit fullscreen event (e.g., pressing Esc)
    document.onfullscreenchange = () => setIsFullscreen(!!document.fullscreenElement);
  };

  const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction) => ({ zIndex: 0, x: direction < 0 ? '100%' : '-100%', opacity: 0 }),
  };

  const [direction, setDirection] = useState(0);
  const paginate = (newDirection) => {
    setDirection(newDirection);
    if (newDirection > 0) handleNextSlide();
    else handlePrevSlide();
  };

  return (

    
    <div className={`container mx-auto py-12 px-4 ${isFullscreen ? 'fixed inset-0 bg-background z-50 overflow-auto' : ''}`}>
      <motion.h1
        className="text-3xl font-bold text-center mb-8 text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Preview & Export Presentation
      </motion.h1>

      <RevealPresentation />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Presentation Preview */}
        <div className={`lg:w-2/3 relative overflow-hidden ${isFullscreen ? 'h-full flex flex-col' : ''}`}>
          <Card className={`shadow-lg border-border/60 bg-card ${isFullscreen ? 'flex-grow' : 'aspect-video'} flex flex-col justify-center items-center p-8 relative`}>
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentSlideIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                className="absolute inset-0 p-8 flex flex-col justify-center items-center"
              >
                <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-center text-foreground">{currentSlide.title}</h2>
                <ul className="list-disc space-y-2 text-lg lg:text-xl text-muted-foreground text-left w-full max-w-md lg:max-w-lg">
                  {currentSlide.points.map((point, index) => (
                    <li key={index}>{point.replace(/^- /, '')}</li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
             {/* Fullscreen Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-muted-foreground hover:text-primary"
              onClick={toggleFullscreen}
            >
              <Maximize className="w-5 h-5" />
            </Button>
          </Card>

          {/* Navigation Controls */}
          <div className={`flex items-center justify-between mt-4 ${isFullscreen ? 'p-4 bg-background border-t' : ''}`}>
            <Button variant="outline" onClick={() => paginate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Slide {currentSlideIndex + 1} of {slides.length}
            </span>
            <Button variant="outline" onClick={() => paginate(1)}>
              Next <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Actions Panel */}
        <div className={`lg:w-1/3 space-y-6 ${isFullscreen ? 'hidden' : ''}`}>
          <Card className="shadow-md border-border/60 bg-card">
            <CardHeader>
              <CardTitle className="text-xl text-primary">Export</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" onClick={() => handleExport('pptx')}>
                <Download className="w-4 h-4 mr-2" /> Export as PPTX
              </Button>
              <Button className="w-full" onClick={() => handleExport('pdf')}>
                <Download className="w-4 h-4 mr-2" /> Export as PDF
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-md border-border/60 bg-card">
            <CardHeader>
              <CardTitle className="text-xl text-primary">Share</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input value={shareLink} readOnly className="flex-grow" />
                <Button variant="outline" size="icon" onClick={handleCopyLink}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" variant="secondary">
                    <Mail className="w-4 h-4 mr-2" /> Share via Email
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Share via Email</DialogTitle>
                    <DialogDescription>
                      Enter the email address to send the presentation link to.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="col-span-3"
                        placeholder="recipient@example.com"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleShareEmail}>Send Link</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card className="shadow-md border-border/60 bg-card">
            <CardHeader>
              <CardTitle className="text-xl text-primary">Rate This Presentation</CardTitle>
              <CardDescription>Average Rating: 4.5 <Star className="inline w-4 h-4 text-yellow-400 fill-yellow-400" /></CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button key={star} variant="ghost" size="icon" onClick={() => handleRate(star)} className="text-yellow-400 hover:text-yellow-500">
                  <Star className="w-6 h-6" />
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PreviewExportPage;
  