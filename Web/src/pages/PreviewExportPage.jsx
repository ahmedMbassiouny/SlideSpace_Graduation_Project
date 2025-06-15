import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Outlet, Link, NavLink, useLocation, Navigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Share2,
  Mail,
  Copy,
  Star,
  Maximize,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "reveal.js";
import "reveal.js/dist/reveal.css";
import api from "@/lib/axios";

// ImageViewer component to handle base64 images
function ImageViewer({ base64 }) {
  return (
    <img
      src={`data:image/png;base64,${base64}`}
      alt="Slide"
      className="w-full h-auto rounded-lg object-contain"
      style={{ maxHeight: "100px" }}
    />
  );
}

// Mock data (same as SlideGenerationPage for consistency)
const mockSlides = [
  {
    id: 1,
    title: "Introduction to Quantum Computing",
    bullets: [
      "- Basic principles",
      "- Qubits vs bits",
      "- Qubits vs bits",
      "- Qubits vs bits",
      "- Qubits vs bits",
      "- Qubits vs bits",
      "- Qubits vs bits",
      "- Qubits vs bits",
      "- Qubits vs bits",
      "- Potential applications",
    ],
    images: [
      "../../media/Ahmed Bassiouny-Photoroom.png",
      "../../media/Ahmed Bassiouny-Photoroom.png",
      "../../media/Ahmed Bassiouny-Photoroom.png",
      "../../media/Ahmed Bassiouny-Photoroom.png",
      "../../media/Ahmed Bassiouny-Photoroom.png",
    ],
  },
  {
    id: 2,
    title: "Key Concepts",
    bullets: ["- Superposition", "- Entanglement", "- Quantum gates"],
  },
  {
    id: 3,
    title: "Algorithms",
    bullets: [
      "- Shor's algorithm",
      "- Grover's algorithm",
      "- Quantum simulation",
    ],
  },
  {
    id: 4,
    title: "Hardware Challenges",
    bullets: ["- Decoherence", "- Scalability", "- Error correction"],
  },
  {
    id: 5,
    title: "Future Outlook",
    bullets: [
      "- Research directions",
      "- Industry impact",
      "- Ethical considerations",
    ],
  },
];

const PreviewExportPage = () => {
  const location = useLocation();
  const { slides: receivedSlides, documentId, mlDocId, titles } =
    location.state || {};

  // Use received slides if available, otherwise use mock data
  const [slides] = useState(receivedSlides || mockSlides);
  const [shareLink] = useState("https://slidespace.example.com/share/xyz123");
  const [email, setEmail] = useState("");
  const [theme, setTheme] = useState("moon");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGeneratingPPTX, setIsGeneratingPPTX] = useState(false);
  const [isGeneratingGAPPTX, setIsGeneratingGAPPTX] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [savedDefaultPPTX, setSavedDefaultPPTX] = useState([]);
  const [savedGAPPTX, setSavedGAPPTX] = useState([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const { toast } = useToast();

  // If no slides data is available, redirect back to upload
  // Uncomment the following lines if you want to enforce this redirect
  // if (!receivedSlides) {
  //   return <Navigate to="/upload" replace />;
  // }

  const deckDivRef = useRef(null);
  const deckRef = useRef(null);

  const [currentSlide, setCurrentSlide] = useState(0);

  const [transition, setTransition] = useState("convex");

  const [fullscreenImage, setFullscreenImage] = useState(null);

  const openImage = (src) => setFullscreenImage(src);
  const closeImage = () => setFullscreenImage(null);

  useEffect(() => {
    if (deckRef.current) {
      deckRef.current.slide(currentSlide);
    }
  }, [currentSlide]);

  useEffect(() => {
    // Prevents double initialization in strict mode
    if (deckRef.current) return;

    deckRef.current = new Reveal(deckDivRef.current, {
      transition,
      // theme: theme,
      previewLinks: true,
      controls: true,
      progress: true,
      center: true,
      touch: true,
      loop: false,
      rtl: false,
      navigationMode: "default",
      shuffle: false,
      fragments: true,
      fragmentInURL: false,
      embedded: true,
      help: true,
      showNotes: false,
      autoPlayMedia: null,
      preloadIframes: null,
      autoSlide: 0,
      autoSlideStoppable: true,
      autoSlideMethod: "default",
      defaultTiming: null,
      mouseWheel: false,
      hideInactiveCursor: false,
      hideCursorTime: undefined,
      postMessage: true,
      postMessageEvents: false,
      focusBodyOnPageVisibility: true,
      viewDistance: 3,
      mobileViewDistance: 2,
      display: "block",
      hideAddressBar: true,
      keyboard: {
        27: null, // ESC key
        13: "next", // ENTER key
        32: "next", // SPACE key
        37: "prev", // LEFT arrow
        38: "prev", // UP arrow
        39: "next", // RIGHT arrow
        40: "next", // DOWN arrow
      },
      overview: true,
    });

    deckRef.current.initialize().then(() => {
      // good place for event handlers and plugin setups
      deckRef.current.slide(currentSlide);
      deckRef.current.on("slidechanged", (event) => {
        setCurrentSlide(event.indexh);

        // Auto-scroll selected thumbnail into view
        const btn = document.querySelector(
          `[data-slide-index="${event.indexh}"]`
        );

        if (btn) {
          btn.scrollIntoView({
            behavior: "smooth",
            inline: "center", // horizontal scroll
            block: "nearest", // prevent vertical scroll
          });
        }
      });

      console.log("Reveal.js initialized successfully");
    });

    return () => {
      try {
        if (deckRef.current) {
          deckRef.current.off("slidechanged");
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
    const themeLinkId = "reveal-theme-link";
    const href = `https://unpkg.com/reveal.js/dist/theme/${theme}.css`;

    let existingLink = document.getElementById(themeLinkId);
    if (existingLink) {
      existingLink.href = href;
    } else {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.id = themeLinkId;
      link.href = href;
      document.head.appendChild(link);
    }

    // Force reinitialize Reveal.js to apply theme
    if (deckRef.current) {
      deckRef.current.off("slidechanged");
      deckRef.current.destroy(); // full cleanup
      deckRef.current = new Reveal(deckDivRef.current, {
        transition: "slide",
        embedded: true,
        controls: true,
        progress: true,
        center: true,
        loop: false,
        backgroundTransition: "fade",
        width: 960,
        height: 700,
        slideNumber: true,
        overview: true,
      });

      deckRef.current.initialize().then(() => {
        deckRef.current.slide(currentSlide); // Restore current slide

        deckRef.current.on("slidechanged", (event) => {
          setCurrentSlide(event.indexh);
        });

        console.log(`Reveal.js reinitialized with ${theme} theme`);
      });
    }
  }, [theme, transition]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    toast({
      title: "Link Copied",
      description: "Share link copied to clipboard.",
    });
  };

  const handleShareEmail = () => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        variant: "destructive",
        title: "Invalid Email",
        description: "Please enter a valid email address.",
      });
      return;
    }
    toast({
      title: "Shared via Email",
      description: `Presentation link sent to ${email}.`,
    });
    setEmail("");
  };

  const handleRate = (rating) => {
    toast({
      title: "Rating Submitted",
      description: `You rated this presentation ${rating} stars.`,
    });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      // Enter fullscreen mode
      const presentationContainer = deckDivRef.current?.closest(
        ".presentation-container"
      );
      if (presentationContainer) {
        presentationContainer.requestFullscreen().catch((err) => {
          toast({
            variant: "destructive",
            title: "Fullscreen Error",
            description: `Could not enter fullscreen mode: ${err.message}`,
          });
        });
      } else {
        document.documentElement.requestFullscreen().catch((err) => {
          toast({
            variant: "destructive",
            title: "Fullscreen Error",
            description: `Could not enter fullscreen mode: ${err.message}`,
          });
        });
      }
      setIsFullscreen(true);
    } else {
      // Exit fullscreen mode
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Listen for keyboard events to toggle fullscreen with 'F' key
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNowFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isNowFullscreen);

      if (deckRef.current) {
        deckRef.current.off("slidechanged");
        deckRef.current.destroy();
        deckRef.current = null;
        deckRef.current = new Reveal(deckDivRef.current, {
          transition: "slide",
          embedded: true,
          controls: true,
          progress: true,
          center: true,
          loop: false,
          backgroundTransition: "fade",
          slideNumber: true,
          overview: true,
        });

        deckRef.current.initialize().then(() => {
          deckRef.current.slide(currentSlide);
          deckRef.current.on("slidechanged", (event) => {
            setCurrentSlide(event.indexh);
          });

          console.log("Reveal.js rebuilt on fullscreen change");
        });
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [theme, transition, currentSlide]);

  const handleExport = async (format) => {
    if (format === "pdf") {
      await generatePDF();
    } else if (format === "pptx") {
      await generatePPTX("default");
    } else if (format === "pptx_ga") {
      await generatePPTX("ga");
    }
  };

  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    
    try {
    toast({
        title: "PDF Generation Started",
        description: "Preparing your presentation for PDF export. The print dialog will open automatically.",
      });

      // Create a temporary container for PDF generation
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      tempContainer.style.width = '1920px'; // Standard presentation width
      tempContainer.style.height = '1080px'; // Standard presentation height
      tempContainer.style.backgroundColor = 'white';
      tempContainer.style.padding = '40px';
      tempContainer.style.fontFamily = 'Arial, sans-serif';
      tempContainer.style.color = 'black';
      tempContainer.style.overflow = 'hidden';
      
      document.body.appendChild(tempContainer);

      // Generate PDF content with enhanced formatting
      let pdfContent = `
        <div style="max-width: 800px; margin: 0 auto; padding: 20px;">
          <div class="presentation-header" style="text-align: center; margin-bottom: 50px; padding: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 15px; color: white; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <h1 style="margin: 0; font-size: 32px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
              📊 Presentation Export
            </h1>
            <p style="margin: 15px 0 0 0; font-size: 16px; opacity: 0.9;">
              Professional Presentation Document
            </p>
            <div style="margin-top: 20px; padding: 15px; background: rgba(255,255,255,0.1); border-radius: 10px; backdrop-filter: blur(10px);">
              <span style="font-size: 14px;">Generated on ${new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          </div>
      `;
      
      slides.forEach((slide, index) => {
        pdfContent += `
          <div class="slide" style="page-break-after: always; margin-bottom: 50px; padding: 30px; background: white; border-radius: 15px; box-shadow: 0 5px 20px rgba(0,0,0,0.08); border: 1px solid #e1e8ed; position: relative; overflow: hidden;">
            <div style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #667eea, #764ba2);"></div>
            <div style="display: flex; align-items: center; margin-bottom: 25px;">
              <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px; color: white; font-weight: bold; font-size: 18px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);">
                ${index + 1}
              </div>
              <h2 style="font-size: 26px; color: #2d3748; margin: 0; font-weight: 600; flex: 1; border-bottom: 3px solid #667eea; padding-bottom: 10px; text-shadow: 0 1px 2px rgba(0,0,0,0.1);">
                ${slide.title}
              </h2>
            </div>
        `;
        
        if (slide.bullets && slide.bullets.length > 0) {
          pdfContent += `
            <div style="background: #f8fafc; padding: 25px; border-radius: 12px; border-left: 5px solid #667eea;">
              <ul style="font-size: 16px; line-height: 1.8; margin: 0; padding-left: 20px; color: #4a5568; list-style: none;">
          `;
          slide.bullets.forEach((bullet, bulletIndex) => {
            const cleanBullet = bullet.replace(/^- /, '').trim();
            if (cleanBullet) {
              pdfContent += `
                <li style="margin-bottom: 15px; position: relative; padding-left: 25px;">
                  <span style="position: absolute; left: 0; top: 6px; width: 8px; height: 8px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%;"></span>
                  <span style="font-weight: 500; color: #2d3748;">${cleanBullet}</span>
                </li>
              `;
            }
          });
          pdfContent += '</ul></div>';
        }

        // Add images if they exist
        if (slide.images && slide.images.length > 0) {
          pdfContent += `
            <div style="margin-top: 25px; padding: 20px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 12px; border: 1px solid #e2e8f0;">
              <div style="text-align: center; margin-bottom: 15px;">
                <div style="font-size: 16px; margin-bottom: 8px;">🖼️</div>
                <h3 style="font-size: 16px; color: #2d3748; margin: 0; font-weight: 600;">
                  Slide Images (${slide.images.length})
                </h3>
              </div>
              <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; align-items: center;">
          `;
          
          slide.images.forEach((img, imgIndex) => {
            // Check if the image is base64 or URL
            const isBase64 = typeof img === "string" && (img.length > 100 || img.startsWith("data:"));
            const isUrl = typeof img === "string" && (img.startsWith("http") || img.startsWith("/"));
            
            if (isBase64) {
              pdfContent += `
                <div style="text-align: center; padding: 8px; background: white; border-radius: 6px; box-shadow: 0 1px 4px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; width: 80px; height: 80px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                  <img src="data:image/png;base64,${img}" alt="Slide Image ${imgIndex + 1}" style="max-width: 60px; max-height: 50px; object-fit: contain; border-radius: 4px; margin-bottom: 4px;" />
                  <p style="font-size: 10px; color: #64748b; margin: 0; font-weight: 500;">${imgIndex + 1}</p>
                </div>
              `;
            } else if (isUrl) {
              pdfContent += `
                <div style="text-align: center; padding: 8px; background: white; border-radius: 6px; box-shadow: 0 1px 4px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; width: 80px; height: 80px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                  <img src="${img}" alt="Slide Image ${imgIndex + 1}" style="max-width: 60px; max-height: 50px; object-fit: contain; border-radius: 4px; margin-bottom: 4px;" />
                  <p style="font-size: 10px; color: #64748b; margin: 0; font-weight: 500;">${imgIndex + 1}</p>
                </div>
              `;
            } else if (img === null || img === undefined || img === "") {
              pdfContent += `
                <div style="text-align: center; padding: 8px; background: white; border-radius: 6px; box-shadow: 0 1px 4px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; width: 80px; height: 80px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                  <div style="color: #94a3b8; font-size: 12px; font-weight: 500;">N/A</div>
                </div>
              `;
            } else {
              // Fallback for other formats
              pdfContent += `
                <div style="text-align: center; padding: 8px; background: white; border-radius: 6px; box-shadow: 0 1px 4px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; width: 80px; height: 80px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                  <img src="${img}" alt="Slide Image ${imgIndex + 1}" style="max-width: 60px; max-height: 50px; object-fit: contain; border-radius: 4px; margin-bottom: 4px;" />
                  <p style="font-size: 10px; color: #64748b; margin: 0; font-weight: 500;">${imgIndex + 1}</p>
                </div>
              `;
            }
          });
          
          pdfContent += '</div></div>';
        }
        
        pdfContent += '</div>';
      });

      pdfContent += `
        <div class="presentation-footer" style="margin-top: 50px; padding: 30px; background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%); border-radius: 15px; color: white; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
          <div style="font-size: 18px; margin-bottom: 10px;">🚀</div>
          <p style="margin: 0; font-size: 16px; font-weight: 500;">
            Generated by SlideSpace Presentation Platform
          </p>
          <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.8;">
            Professional AI-Powered Presentation Generation
          </p>
        </div>
      </div>`;

      // Use browser's print functionality to generate PDF
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Professional Presentation PDF Export</title>
          <style>
            @page {
              size: A4;
              margin: 0.8in;
            }
            body {
              font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
              margin: 0;
              padding: 0;
              background: #f7fafc;
              color: #2d3748;
              line-height: 1.6;
              font-size: 14px;
            }
            @media print {
              body { 
                margin: 0; 
                background: white;
              }
              .slide { 
                page-break-after: always; 
                page-break-inside: avoid;
                box-shadow: none !important;
                border: 1px solid #e2e8f0 !important;
              }
              .slide:last-child { page-break-after: avoid; }
              .presentation-header, .presentation-footer {
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
              }
            }
            .slide {
              margin-bottom: 50px;
              padding: 30px;
              background: white;
              border-radius: 15px;
              box-shadow: 0 5px 20px rgba(0,0,0,0.08);
              border: 1px solid #e1e8ed;
              position: relative;
              overflow: hidden;
            }
            .slide::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 4px;
              background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c);
            }
            .slide h2 {
              font-size: 26px;
              color: #2d3748;
              margin: 0 0 25px 0;
              font-weight: 600;
              border-bottom: 3px solid #667eea;
              padding-bottom: 10px;
              text-shadow: 0 1px 2px rgba(0,0,0,0.1);
            }
            .slide ul {
              font-size: 16px;
              line-height: 1.8;
              margin: 0;
              padding-left: 20px;
              color: #4a5568;
              list-style: none;
            }
            .slide li {
              margin-bottom: 15px;
              position: relative;
              padding-left: 25px;
            }
            .slide li::before {
              content: '';
              position: absolute;
              left: 0;
              top: 6px;
              width: 8px;
              height: 8px;
              background: linear-gradient(135deg, #667eea, #764ba2);
              border-radius: 50%;
            }
            .presentation-header {
              text-align: center;
              margin-bottom: 50px;
              padding: 30px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              border-radius: 15px;
              color: white;
              box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            }
            .presentation-header h1 {
              margin: 0;
              font-size: 32px;
              font-weight: 700;
              text-shadow: 0 2px 4px rgba(0,0,0,0.3);
            }
            .presentation-footer {
              margin-top: 50px;
              padding: 30px;
              background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
              border-radius: 15px;
              color: white;
              text-align: center;
              box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            }
            .slide-number {
              width: 40px;
              height: 40px;
              background: linear-gradient(135deg, #667eea, #764ba2);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 15px;
              color: white;
              font-weight: bold;
              font-size: 18px;
              box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
            }
            .content-box {
              background: #f8fafc;
              padding: 25px;
              border-radius: 12px;
              border-left: 5px solid #667eea;
            }
            .image-indicator {
              margin-top: 25px;
              padding: 20px;
              background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
              border-radius: 12px;
              text-align: center;
              color: white;
            }
            .metadata-box {
              margin-top: 20px;
              padding: 15px;
              background: rgba(255,255,255,0.1);
              border-radius: 10px;
              backdrop-filter: blur(10px);
            }
          </style>
        </head>
        <body>
          ${pdfContent}
        </body>
        </html>
      `);
      
      printWindow.document.close();
      
      // Wait for content to load then print
      setTimeout(() => {
        printWindow.print();
        // Close the window automatically after printing
        setTimeout(() => {
          printWindow.close();
          // Show success message after closing
          toast({
            title: "PDF Export Complete",
            description: "Your PDF has been generated successfully. Check your downloads folder.",
          });
        }, 2000); // Close after 2 seconds
      }, 500);

      // Clean up
      document.body.removeChild(tempContainer);

      // Success message is now shown after the window closes

    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        variant: "destructive",
        title: "PDF Generation Error",
        description: "Failed to generate PDF. Please try again.",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const generatePPTX = async (mode) => {
    if (!documentId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Document ID not found. Please try uploading again.",
      });
      return;
    }

    // Set loading state based on mode
    if (mode === "ga") {
      setIsGeneratingGAPPTX(true);
    } else {
      setIsGeneratingPPTX(true);
    }

    try {
      // Fetch CSRF token
      const csrfRes = await api.get("/csrf.php");
      const csrfToken = csrfRes.data.csrf_token;

      // Call the appropriate API endpoint
      const endpoint = mode === "ga" ? "generateGAPPTX" : "generatePPTX";
      const response = await api.post(
        `/document.php?action=${endpoint}`,
        {
          document_id: documentId,
          slides: slides,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        }
      );

      const result = response.data;

      if (result.success && result.pptx_data) {
        // Convert base64 to blob and download
        const byteCharacters = atob(result.pptx_data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-presentationml.presentation' });

        // Create download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = result.filename || `presentation_${mode}.pptx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        toast({
          title: "PPTX Generated Successfully",
          description: result.message || "PPTX file has been generated and saved.",
        });

        // Reload saved PPTX files
        await loadSavedPPTXFiles();
      } else {
        toast({
          variant: "destructive",
          title: "Generation Failed",
          description: result.message || "Failed to generate PPTX file.",
        });
      }
    } catch (error) {
      console.error("Error generating PPTX:", error);
      toast({
        variant: "destructive",
        title: "Generation Error",
        description: error.response?.data?.message || "Failed to generate PPTX file.",
      });
    } finally {
      // Clear loading state
      if (mode === "ga") {
        setIsGeneratingGAPPTX(false);
      } else {
        setIsGeneratingPPTX(false);
      }
    }
  };

  // Load saved PPTX files
  const loadSavedPPTXFiles = async () => {
    if (!documentId) return;
    
    setIsLoadingFiles(true);
    try {
      // Load default PPTX files
      const defaultResponse = await api.post('/document.php', {
        action: 'getDefaultPPTXFiles',
        document_id: documentId
      });
      
      if (defaultResponse.data.success) {
        setSavedDefaultPPTX(defaultResponse.data.files);
      }
      
      // Load GA PPTX files
      const gaResponse = await api.post('/document.php', {
        action: 'getGAPPTXFiles',
        document_id: documentId
      });
      
      if (gaResponse.data.success) {
        setSavedGAPPTX(gaResponse.data.files);
      }
    } catch (error) {
      console.error('Error loading saved PPTX files:', error);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  // Download saved PPTX file
  const downloadSavedPPTX = async (fileId, type, filename) => {
    try {
      const response = await api.post('/document.php', {
        action: 'downloadPPTX',
        file_id: fileId,
        type: type
      });
      
      if (response.data.success) {
        // Convert base64 to blob and download
        const binaryString = atob(response.data.file_data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' });
        
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        toast({
          title: "Download Complete",
          description: `PPTX file "${filename}" has been downloaded successfully.`,
        });
      }
    } catch (error) {
      console.error('Error downloading PPTX file:', error);
      toast({
        variant: "destructive",
        title: "Download Error",
        description: "Failed to download PPTX file. Please try again.",
      });
    }
  };

  // Load saved files when component mounts
  useEffect(() => {
    if (documentId) {
      loadSavedPPTXFiles();
    }
  }, [documentId]);

  return (
    <div
      className={`min-h-screen bg-background ${
        isFullscreen
          ? "fixed inset-0 z-50"
          : "xl:container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8"
      }`}
    >
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          margin: 10px 0;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 10px;
          border: 2px solid rgba(255, 255, 255, 0.1);
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
          box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:active {
          background: linear-gradient(135deg, #4c51bf 0%, #553c9a 100%);
        }
        
        /* Firefox scrollbar */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #667eea rgba(0, 0, 0, 0.1);
        }
        
        /* Hide scrollbar when not needed */
        .custom-scrollbar::-webkit-scrollbar-thumb:vertical {
          min-height: 30px;
        }
      `}</style>
      {!isFullscreen && (
        <motion.h1
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4 sm:mb-6 lg:mb-8 text-primary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Preview & Export Presentation
        </motion.h1>
      )}

      <div
        className={`flex flex-col xl:flex-row gap-4 sm:gap-6 lg:gap-8 ${
          isFullscreen ? "h-full" : ""
        }`}
      >
        {/* Presentation Preview with Reveal.js */}
        <div className={`w-full ${isFullscreen ? "h-full" : "xl:w-2/3"}`}>
          {!isFullscreen && (
            <div className="mb-4 flex flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm w-auto"
              >
                <option value="black">Theme: Black</option>
                <option value="white">Theme: White</option>
                <option value="league">Theme: League</option>
                <option value="sky">Theme: Sky</option>
                <option value="beige">Theme: Beige</option>
                <option value="simple">Theme: Simple</option>
                <option value="solarized">Theme: Solarized</option>
                <option value="moon">Theme: Moon</option>
                <option value="night">Theme: Night</option>
                <option value="serif">Theme: Serif</option>
                <option value="blood">Theme: Blood</option>
              </select>

              <select
                value={transition}
                onChange={(e) => setTransition(e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm w-auto"
              >
                <option value="slide">Transition: Slide</option>
                <option value="fade">Transition: Fade</option>
                <option value="zoom">Transition: Zoom</option>
                <option value="convex">Transition: Convex</option>
                <option value="concave">Transition: Concave</option>
              </select>

              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground hidden sm:block">
                  Click slides then press F for fullscreen
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleFullscreen}
                  title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                  className="w-full sm:w-auto"
                >
                  <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Reveal.js Container */}
          <div
            className={`presentation-container reveal theme-${theme} border rounded-lg overflow-hidden ${
              isFullscreen ? "h-full w-full" : ""
            }`}
            ref={deckDivRef}
            tabIndex={0}
            onFocus={() => {
              if (deckDivRef.current) {
                // deckDivRef.current.style.outline = "2px solid #3b82f6";
                // deckDivRef.current.style.outlineOffset = "2px";
              }
            }}
            onBlur={() => {
              if (deckDivRef.current) {
                deckDivRef.current.style.outline = "none";
              }
            }}
            style={{
              height: isFullscreen ? "100vh" : "65vh",
              minHeight: isFullscreen ? "100vh" : "300px",
              maxHeight: isFullscreen ? "100vh" : "65vh",
              width: "100%",
              position: "relative",
            }}
          >
            {/* Fullscreen Exit Button */}
            {isFullscreen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                title="Exit Fullscreen"
                className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white"
              >
                <Maximize className="w-5 h-5 rotate-45" />
              </Button>
            )}

            {/* Reveal.js Slide Content */}
            <div className="slides overflow-y-scroll overflow-x-hidden custom-scrollbar">
              {slides.map((slide, index) => (
                <section
                  key={index}
                  className="overflow-y-auto overscroll-x-none h-screen flex flex-col justify-center items-center px-8 py-12"
                  data-background-size="cover"
                  data-transition={transition}
                  data-background-transition="fade"
                >
                  {/* Slide Title */}
                  <h2 className="text-5xl font-extrabold mb-12 text-center leading-tight tracking-wide">
                    {slide.title}
                  </h2>
                  
                  {/* Bullet Points with Fragments (appear one-by-one) */}
                  {slide.bullets?.length > 0 && (
                    <div className="w-full max-w-4xl">
                      <ul className="text-2xl space-y-6 leading-relaxed">
                      {slide.bullets.map((point, pointIndex) => (
                          <li key={pointIndex} className="fragment fade-in transform transition-all duration-500 hover:scale-105">
                            <p className="text-left font-medium">{point.replace(/^- /, "")}</p>
                        </li>
                      ))}
                    </ul>
                    </div>
                  )}

                  {slide.images && slide.images.length > 0 && (
                    <div className="w-full max-w-6xl mt-12">
                      <div className="grid grid-cols-3 gap-6 flex-wrap justify-evenly">
                      {slide.images.map((img, i) => {
                        // Check if the image is base64 or URL
                          const isBase64 = typeof img === "string" && (img.length > 100 || img.startsWith("data:"));
                          const isUrl = typeof img === "string" && (img.startsWith("http") || img.startsWith("/"));

                        if (isBase64) {
                          return (
                            <div
                              key={i}
                                onClick={() => openImage(`data:image/png;base64,${img}`)}
                                className="w-full h-auto rounded-xl cursor-pointer object-contain hover:scale-110 transition-all duration-300 transform shadow-lg hover:shadow-2xl fragment fade-in"
                                style={{ maxHeight: "140px" }}
                            >
                              <ImageViewer base64={img} />
                            </div>
                          );
                        } else if (isUrl) {
                          return (
                            <img
                              key={i}
                              src={img}
                              alt={`slide-${index}-img-${i}`}
                              onClick={() => openImage(img)}
                                className="w-full h-auto rounded-xl cursor-pointer object-contain hover:scale-110 transition-all duration-300 transform shadow-lg hover:shadow-2xl fragment fade-in"
                                style={{ maxHeight: "140px" }}
                              />
                            );
                          } else if (img === null || img === undefined || img === "") {
                          return (
                            <div
                              key={i}
                                className="w-full h-28 bg-gray-200 rounded-xl flex items-center justify-center text-sm font-medium fragment fade-in shadow-md"
                            >
                              Image {i + 1}
                            </div>
                          );
                        } else {
                          // Fallback for other formats
                          return (
                            <img
                              key={i}
                              src={img}
                              alt={`slide-${index}-img-${i}`}
                              onClick={() => openImage(img)}
                                className="w-full h-auto rounded-xl cursor-pointer object-contain hover:scale-110 transition-all duration-300 transform shadow-lg hover:shadow-2xl fragment fade-in"
                                style={{ maxHeight: "140px" }}
                            />
                          );
                        }
                      })}
                      </div>
                    </div>
                  )}
                </section>
              ))}
            </div>
          </div>

          {/* Slide Thumbnails */}
          {!isFullscreen && (
            <div className="py-2 border-t">
              <h3 className="text-sm font-medium mb-2">Slide Overview</h3>
              <div className="flex justify-between  gap-2 w-full overflow-x-auto pb-2 ">
                {slides.map((slide, index) => (
                  <button
                    key={index}
                    data-slide-index={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`flex-shrink-0  p-2 text-xs border rounded w-full text-left shadow-xl 
                      min-w-[80px] max-w-[120px]
                      sm:min-w-[100px] sm:max-w-[160px]
                      md:min-w-[120px] md:max-w-[200px]
                      lg:min-w-[140px] lg:max-w-[240px]
                      xl:min-w-[160px] xl:max-w-[280px]
                      2xl:min-w-[200px] 2xl:max-w-[320px]
                      transition-all
                      ${
                        index === currentSlide
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background hover:bg-muted"
                      }`}
                  >
                    <div className="font-medium  truncate">{slide.title}</div>
                    <div className="truncate">
                      {slide.points?.[0]?.substring(0, 400)}...
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions Panel */}
        <div
          className={`flex flex-col justify-between w-full xl:w-1/3 space-y-4 sm:space-y-6 ${
            isFullscreen ? "hidden" : ""
          }`}
        >
          <Card className="shadow-md border-border/60 bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg sm:text-xl text-primary">
                Export Options
              </CardTitle>
              <CardDescription className="text-xs">
                Choose your preferred export format
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* PDF Export */}
              <div className="space-y-2">
              <Button
                className="w-full text-sm sm:text-base"
                onClick={() => handleExport("pdf")}
                  disabled={isGeneratingPDF || isGeneratingPPTX || isGeneratingGAPPTX}
              >
                  <Download className="w-4 h-4 mr-2" /> 
                  {isGeneratingPDF ? "Generating PDF..." : "Export as PDF"}
              </Button>
                <p className="text-xs text-muted-foreground">
                  Professional PDF format with enhanced styling
                </p>
              </div>

              {/* Standard PPTX Export */}
              <div className="space-y-2">
              <Button
                className="w-full text-sm sm:text-base"
                onClick={() => handleExport("pptx")}
                  disabled={isGeneratingPPTX || isGeneratingGAPPTX}
              >
                  <Download className="w-4 h-4 mr-2" /> 
                  {isGeneratingPPTX ? "Generating..." : "Export as PPTX"}
              </Button>
                <p className="text-xs text-muted-foreground">
                  AI-powered PowerPoint with standard ML optimization
                </p>
              </div>

              {/* Premium GA PPTX Export */}
              <div className="space-y-2 p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-purple-700 bg-purple-100 px-2 py-1 rounded-full">
                    ⭐ PREMIUM
                  </span>
                  <span className="text-xs text-purple-600 font-medium">
                    Advanced AI
                  </span>
                </div>
                <Button
                  className="w-full text-sm sm:text-base bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => handleExport("pptx_ga")}
                  disabled={isGeneratingPPTX || isGeneratingGAPPTX}
                >
                  <Download className="w-4 h-4 mr-2" /> 
                  {isGeneratingGAPPTX ? "Generating GA..." : "Export as PPTX (GA)"}
                </Button>
                <p className="text-xs text-purple-600 font-medium">
                  🚀 Advanced Genetic Algorithm AI for superior layout optimization
                </p>
              </div>

              {/* Saved PPTX Files Section */}
              {(savedDefaultPPTX.length > 0 || savedGAPPTX.length > 0) && (
                <div className="mt-6 pt-4 border-t border-border">
                  <h4 className="text-sm font-semibold text-primary mb-3">Saved PPTX Files</h4>
                  
                  {/* Default PPTX Files */}
                  {savedDefaultPPTX.length > 0 && (
                    <div className="mb-4">
                      <h5 className="text-xs font-medium text-muted-foreground mb-2">Standard PPTX</h5>
                      <div className="space-y-2">
                        {savedDefaultPPTX.map((file) => (
                          <div key={file.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium truncate">{file.filename}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(file.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => downloadSavedPPTX(file.id, 'default', file.filename)}
                              className="ml-2"
                            >
                              <Download className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* GA PPTX Files */}
                  {savedGAPPTX.length > 0 && (
                    <div>
                      <h5 className="text-xs font-medium text-muted-foreground mb-2">GA PPTX</h5>
                      <div className="space-y-2">
                        {savedGAPPTX.map((file) => (
                          <div key={file.id} className="flex items-center justify-between p-2 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium truncate">{file.filename}</p>
                              <p className="text-xs text-purple-600">
                                {new Date(file.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => downloadSavedPPTX(file.id, 'ga', file.filename)}
                              className="ml-2"
                            >
                              <Download className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Loading indicator */}
              {isLoadingFiles && (
                <div className="mt-4 text-center">
                  <p className="text-xs text-muted-foreground">Loading saved files...</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-md border-border/60 bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg sm:text-xl text-primary">
                Share
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Input
                  value={shareLink}
                  readOnly
                  className="flex-grow text-sm"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopyLink}
                  className="w-full sm:w-auto"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="w-full text-sm sm:text-base"
                    variant="secondary"
                  >
                    <Mail className="w-4 h-4 mr-2" /> Share via Email
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Share via Email</DialogTitle>
                    <DialogDescription>
                      Enter the email address to send the presentation link to.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right text-sm">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="col-span-3 text-sm"
                        placeholder="recipient@example.com"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      onClick={handleShareEmail}
                      className="w-full sm:w-auto"
                    >
                      Send Link
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card className="shadow-md border-border/60 bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg sm:text-xl text-primary">
                Rate This Presentation
              </CardTitle>
              <CardDescription className="text-sm">
                Average Rating: 4.5{" "}
                <Star className="inline w-4 h-4 text-yellow-400 fill-yellow-400" />
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRate(star)}
                  className="text-yellow-400 hover:text-yellow-500 w-8 h-8 sm:w-10 sm:h-10"
                >
                  <Star className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              ))}
            </CardContent>
          </Card>
          {/* <div className="p-5"></div> */}
        </div>

        {fullscreenImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            onClick={closeImage}
          >
            <img
              src={fullscreenImage}
              alt="Full View"
              className="max-w-full max-h-full object-contain rounded shadow-lg"
            />
            <button
              onClick={closeImage}
              className="absolute top-4 right-4 text-white text-2xl bg-red-600 px-4 py-1 rounded"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewExportPage;
