import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, ArrowLeft, Download, Share2, Star, Maximize } from 'lucide-react';
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

const PresentationViewerPage = () => {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [slides, setSlides] = useState([]);
  const [presentationTitle, setPresentationTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('black');
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const deckDivRef = useRef(null);
  const deckRef = useRef(null);

  useEffect(() => {
    if (documentId) {
      loadSlides();
    }
  }, [documentId]);

  const loadSlides = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get CSRF token
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

      const response = await fetch('/backend/api/document.php?action=getSlides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
        },
        body: JSON.stringify({
          document_id: documentId
        }),
        credentials: 'include'
      });

      // get data   from json file to test
        
      const data =  await response.json();

      if (data.success) {
        setSlides(data.slides);
        setPresentationTitle(data.presentation_title || 'Presentation');
        toast({
          title: "Success",
          description: "Slides loaded successfully!"
        });
      } else {
        setError(data.message || 'Failed to load slides');
        toast({
          variant: "destructive",
          title: "Error",
          description: data.message || 'Failed to load slides'
        });
      }
    } catch (err) {
      console.error('Error loading slides:', err);
      setError('Network error occurred while loading slides');
      toast({
        variant: "destructive",
        title: "Error",
        description: 'Network error occurred while loading slides'
      });
    } finally {
      setLoading(false);
    }
  };

  // Initialize Reveal.js when slides are loaded
  useEffect(() => {
    if (slides.length > 0 && deckDivRef.current && !deckRef.current) {
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
    }
  }, [slides]);

  // Change theme
  useEffect(() => {
    if (deckRef.current) {
      deckRef.current.configure({ theme: theme });
    }
  }, [theme]);

  const handleExport = (format) => {
    toast({
      title: "Export Started",
      description: `Exporting presentation as ${format.toUpperCase()}...`
    });
    if (deckRef.current && format === 'pdf') {
      deckRef.current.togglePDFExport();
    }
  };

  const handleShare = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link Copied",
      description: "Presentation link copied to clipboard!"
    });
  };

  const handleRate = (rating) => {
    toast({
      title: "Rating Submitted",
      description: `You rated this presentation ${rating} stars.`
    });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        toast({
          variant: "destructive",
          title: "Fullscreen Error",
          description: `Could not enter fullscreen mode: ${err.message}`
        });
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading presentation...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`container mx-auto py-12 px-4 ${isFullscreen ? 'fixed inset-0 bg-background z-50 overflow-auto' : ''}`}>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Presentation Viewer */}
        <div className="lg:w-2/3">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-primary">{presentationTitle}</h1>
            <div className="flex items-center space-x-2">
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
            <CardContent>
              <Button className="w-full" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" /> Copy Share Link
              </Button>
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

          <Card className="shadow-md border-border/60 bg-card">
            <CardHeader>
              <CardTitle className="text-xl text-primary">Navigation</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Documents
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PresentationViewerPage; 