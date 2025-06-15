import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Maximize, 
  Minimize,
  Download,
  Share2,
  Eye,
  EyeOff
} from 'lucide-react';


// Import only basic Reveal.js CSS for now
import 'reveal.js/dist/reveal.css';


const RevealSlideViewer = ({ slides, presentationTitle = "Presentation" }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [theme, setTheme] = useState('white');
  const [showNotes, setShowNotes] = useState(false);
  const { toast } = useToast();

  const totalSlides = slides?.length || 0;
  const currentSlideData = slides?.[currentSlide];

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToFirst = () => {
    setCurrentSlide(0);
  };

  const goToLast = () => {
    setCurrentSlide(totalSlides - 1);
  };

  // Fullscreen toggle
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

  // Export functions
  const exportPDF = () => {
    toast({
      title: "Export Started",
      description: "Exporting presentation as PDF..."
    });
  };

  const exportPPTX = () => {
    toast({
      title: "Export Started",
      description: "Exporting presentation as PPTX..."
    });
  };

  if (!slides || slides.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">No slides available</p>
      </div>
    );
  }

  return (
    <div className={`w-full ${isFullscreen ? 'fixed inset-0 z-50 bg-background' : ''}`}>
      {/* Header Controls */}
      <div className={`flex items-center justify-between p-4 border-b bg-background ${isFullscreen ? 'sticky top-0 z-10' : ''}`}>
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-primary">{presentationTitle}</h1>
          <span className="text-sm text-muted-foreground">
            Slide {currentSlide + 1} of {totalSlides}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Theme Selector */}
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="px-2 py-1 text-sm border rounded"
          >
            <option value="white">White</option>
            <option value="black">Black</option>
            <option value="league">League</option>
            <option value="sky">Sky</option>
            <option value="beige">Beige</option>
            <option value="simple">Simple</option>
            <option value="solarized">Solarized</option>
            <option value="moon">Moon</option>
            <option value="night">Night</option>
            <option value="serif">Serif</option>
            <option value="blood">Blood</option>
            <option value="default">Default</option>
          </select>

          {/* Notes Toggle */}
          {/* <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowNotes(!showNotes)}
            title="Toggle Notes"
          >
            {showNotes ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button> */}

          {/* Auto-play Toggle */}
          {/* <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? "Pause Auto-play" : "Start Auto-play"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button> */}

          {/* Fullscreen Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Simple Slide Display */}
      <div className={`bg-white ${isFullscreen ? 'h-full' : 'h-[600px]'} flex items-center justify-center p-8`}>
        {currentSlideData && (
          <div className="text-center max-w-4xl">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">{currentSlideData.title}</h2>
            <div className="text-left space-y-4">
              {currentSlideData.points && currentSlideData.points.map((point, pointIndex) => (
                <div key={pointIndex} className="text-xl text-gray-600">
                  {point.startsWith('-') ? point : `• ${point}`}
                </div>
              ))}
              {currentSlideData.content && (
                <div className="mt-6 text-lg text-gray-700">
                  {currentSlideData.content}
                </div>
              )}
            </div>
            {showNotes && currentSlideData.notes && (
              <div className="mt-8 p-4 bg-yellow-100 rounded-lg">
                <h3 className="font-semibold mb-2">Notes:</h3>
                <p>{currentSlideData.notes}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className={`flex items-center justify-between p-4 border-t bg-background ${isFullscreen ? 'sticky bottom-0 z-10' : ''}`}>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={goToFirst}>
            <SkipBack className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={prevSlide}>
            ← Previous
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={exportPDF}>
            <Download className="w-4 h-4 mr-2" />
            PDF
          </Button>
          <Button variant="outline" size="sm" onClick={exportPPTX}>
            <Download className="w-4 h-4 mr-2" />
            PPTX
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={nextSlide}>
            Next →
          </Button>
          <Button variant="outline" size="sm" onClick={goToLast}>
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Slide Thumbnails */}
      {!isFullscreen && (
        <div className="p-4 border-t">
          <h3 className="text-sm font-medium mb-2">Slide Overview</h3>
          <div className="flex space-x-2 overflow-x-auto">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`flex-shrink-0 p-2 text-xs border rounded min-w-[100px] text-left ${
                  index === currentSlide 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'bg-background hover:bg-muted'
                }`}
              >
                <div className="font-medium truncate">{slide.title}</div>
                <div className="text-muted-foreground truncate">
                  {slide.points?.[0]?.substring(0, 30)}...
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RevealSlideViewer; 