import React, { useEffect, useRef, useState } from "react";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, ArrowRight, Download, Share2, Mail, Copy, Star, Maximize } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from "reveal.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";
import "reveal.js/dist/theme/white.css";
import "reveal.js/dist/theme/league.css";
import "reveal.js/dist/theme/sky.css";
import "reveal.js/dist/theme/beige.css";
import "reveal.js/dist/theme/simple.css";
import "reveal.js/dist/theme/solarized.css";
import "reveal.js/dist/theme/moon.css";
import "reveal.js/dist/theme/night.css";
import "reveal.js/dist/theme/serif.css";
import "reveal.js/dist/theme/blood.css";

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
  const [shareLink] = useState("https://slidespace.example.com/share/xyz123");
  const [email, setEmail] = useState("");
  const [theme, setTheme] = useState('black');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { toast } = useToast();
  
  const deckDivRef = useRef(null);
  const deckRef = useRef(null);

  useEffect(() => {
    // Prevents double initialization in strict mode
    if (deckRef.current) return;

    deckRef.current = new Reveal(deckDivRef.current, {
      transition: "slide",
      theme: theme,
      controls: true,
      progress: true,
      center: true,
      touch: true,
      loop: false,
      rtl: false,
      navigationMode: 'default',
      shuffle: false,
      fragments: true,
      fragmentInURL: false,
      embedded: false,
      help: true,
      showNotes: false,
      autoPlayMedia: null,
      preloadIframes: null,
      autoSlide: 0,
      autoSlideStoppable: true,
      autoSlideMethod: 'default',
      defaultTiming: null,
      mouseWheel: false,
      hideInactiveCursor: true,
      hideCursorTime: 5000,
      previewLinks: false,
      postMessage: true,
      postMessageEvents: false,
      focusBodyOnPageVisibility: true,
      viewDistance: 3,
      mobileViewDistance: 2,
      display: 'block',
      hideAddressBar: true,
      keyboard: {
        27: null, // ESC key
        13: 'next', // ENTER key
        32: 'next', // SPACE key
        37: 'prev', // LEFT arrow
        38: 'prev', // UP arrow
        39: 'next', // RIGHT arrow
        40: 'next', // DOWN arrow
      },
      overview: true
    });

    deckRef.current.initialize().then(() => {
      // good place for event handlers and plugin setups
      console.log("Reveal.js initialized successfully");
    });

    return () => {
      try {
        if (deckRef.current) {
          deckRef.current.destroy();
          deckRef.current = null;
        }
      } catch (e) {
        console.warn("Reveal.js destroy call failed.");
      }
    };
  }, [slides]);

  // Change theme
  useEffect(() => {
    if (deckRef.current) {
      deckRef.current.configure({ theme: theme });
    }
  }, [theme]);

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
    setEmail("");
  };

  const handleRate = (rating) => {
    toast({ title: "Rating Submitted", description: `You rated this presentation ${rating} stars.` });
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
  };

  const handleExport = (format) => {
    toast({ title: "Export Started", description: `Downloading presentation as ${format.toUpperCase()}...` });
    if (deckRef.current && format === 'pdf') {
      deckRef.current.togglePDFExport();
    }
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

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Presentation Preview with Reveal.js */}
        <div className="lg:w-2/3">
          <div className="mb-4 flex items-center justify-between">
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="px-3 py-2 border rounded-lg bg-background"
            >
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="league">League</option>
              <option value="sky">Sky</option>
              <option value="beige">Beige</option>
              <option value="simple">Simple</option>
              <option value="solarized">Solarized</option>
              <option value="moon">Moon</option>
              <option value="night">Night</option>
              <option value="serif">Serif</option>
              <option value="blood">Blood</option>
            </select>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              <Maximize className="w-5 h-5" />
            </Button>
          </div>

          {/* Reveal.js Container */}
          <div className="reveal h-[600px] border rounded-lg overflow-hidden" ref={deckDivRef}>
            <div className="slides">
              {slides.map((slide, index) => (
                <section key={index}>
                  <h2 className="text-3xl font-bold mb-6">{slide.title}</h2>
                  <div className="text-left space-y-4">
                    {slide.points && slide.points.map((point, pointIndex) => (
                      <div key={pointIndex} className="text-xl">
                        {point.startsWith('-') ? point : `• ${point}`}
                      </div>
                    ))}
                    {slide.content && (
                      <div className="mt-6 text-lg">
                        {slide.content}
                      </div>
                    )}
                  </div>
                  {slide.notes && (
                    <aside className="notes">
                      {slide.notes}
                    </aside>
                  )}
                </section>
              ))}
            </div>
          </div>
        </div>

        {/* Actions Panel */}
        <div className={`lg:w-1/3 space-y-6 ${isFullscreen ? 'hidden' : ''}`}>
          <Card className="shadow-md border-border/60 bg-card">
            <CardHeader>
              <CardTitle className="text-xl text-primary">Export</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" onClick={() => handleExport('pdf')}>
                <Download className="w-4 h-4 mr-2" /> Export as PDF
              </Button>
              <Button className="w-full" onClick={() => handleExport('pptx')}>
                <Download className="w-4 h-4 mr-2" /> Export as PPTX
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