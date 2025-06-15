import React, { useEffect, useRef, useState } from 'react';
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

const RevealDemoPage = () => {
  const [theme, setTheme] = useState('black');
  
  const deckDivRef = useRef(null);
  const deckRef = useRef(null);

  // Sample slides for testing
  const demoSlides = [
    {
      title: "Welcome to Reveal.js",
      points: [
        "Professional presentation framework",
        "Built with modern web technologies",
        "Supports multiple themes and transitions"
      ],
      content: "This is a sample presentation to demonstrate the Reveal.js integration."
    },
    {
      title: "Key Features",
      points: [
        "Responsive design",
        "Touch support for mobile devices",
        "Keyboard navigation",
        "Fullscreen mode",
        "Export to PDF"
      ]
    },
    {
      title: "Navigation",
      points: [
        "Use arrow keys to navigate",
        "Space bar for next slide",
        "ESC for overview mode",
        "F for fullscreen"
      ]
    },
    {
      title: "Themes",
      points: [
        "Multiple built-in themes",
        "Customizable styling",
        "Dark and light modes",
        "Professional appearance"
      ]
    },
    {
      title: "Thank You!",
      points: [
        "Questions?",
        "Contact support",
        "Rate this presentation"
      ]
    }
  ];

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
  }, []);

  // Change theme
  useEffect(() => {
    if (deckRef.current) {
      deckRef.current.configure({ theme: theme });
    }
  }, [theme]);

  return (
    <div className=" overflow-auto h-screen container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">
        Reveal.js Demo Presentation
      </h1>
      
      <div className="max-w-6xl mx-auto">
        <div className="mb-4 flex items-center justify-center">
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
        </div>

        {/* Reveal.js Container */}
        <div className="reveal h-[600px] border rounded-lg overflow-hidden" ref={deckDivRef}>
          <div className="slides">
            {demoSlides.map((slide, index) => (
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
    </div>
  );
};

export default RevealDemoPage;
