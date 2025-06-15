import React, { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input"; // Added Input import
import {
  ArrowLeft,
  ArrowRight,
  Edit,
  Save,
  Eye,
  Download,
  Share2,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

// Mock data for generated slides (fallback)
const mockSlides = [
  {
    id: 1,
    title: "Introduction to Quantum Computing",
    points: [
      "- Basic principles",
      "- Qubits vs bits",
      "- Potential applications",
    ],
  },
  {
    id: 2,
    title: "Key Concepts",
    points: ["- Superposition", "- Entanglement", "- Quantum gates"],
  },
  {
    id: 3,
    title: "Algorithms",
    points: [
      "- Shor's algorithm",
      "- Grover's algorithm",
      "- Quantum simulation",
    ],
  },
  {
    id: 4,
    title: "Hardware Challenges",
    points: ["- Decoherence", "- Scalability", "- Error correction"],
  },
  {
    id: 5,
    title: "Future Outlook",
    points: [
      "- Research directions",
      "- Industry impact",
      "- Ethical considerations",
    ],
  },
];

function ImageViewer({ base64 }) {
  return <img src={`data:image/png;base64,${base64}`} alt="Slide" className="rounded-md shadow-md max-h-64 mx-auto" />;
}


const SlideGenerationPage = () => {
  const location = useLocation();
  const { slides: receivedSlides, documentId, titles } = location.state || {};

  // Use received slides if available, otherwise use mock data
  const [slides, setSlides] = useState(receivedSlides || mockSlides);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [editingSlideId, setEditingSlideId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedPoints, setEditedPoints] = useState("");
  const { toast } = useToast();

  // If no slides data is available, redirect back to upload
  // if (!receivedSlides) {
  //   return <Navigate to="/upload" replace />;
  // }

  const currentSlide = slides[currentSlideIndex];

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    setEditingSlideId(null); // Exit edit mode when changing slides
  };

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setEditingSlideId(null); // Exit edit mode when changing slides
  };

  const handleEditClick = (slide) => {
    setEditingSlideId(slide.id);
    setEditedTitle(slide.title);
    // Handle both 'points' and 'bullets' fields
    const slideContent = slide.points || slide.bullets || [];
    setEditedPoints(slideContent.join("\n"));
  };

  const handleSaveEdit = () => {
    setSlides(
      slides.map((slide) =>
        slide.id === editingSlideId
          ? {
              ...slide,
              title: editedTitle,
              bullets: editedPoints.split("\n").filter((p) => p.trim() !== ""),
              points: editedPoints.split("\n").filter((p) => p.trim() !== ""),
            }
          : slide
      )
    );
    setEditingSlideId(null);
    toast({
      title: "Slide Updated",
      description: "Your changes have been saved.",
    });
  };

  const handleCancelEdit = () => {
    setEditingSlideId(null);
  };

  const handleRate = (rating) => {
    // Placeholder for rating submission
    toast({
      title: "Rating Submitted",
      description: `You rated this presentation ${rating} stars.`,
    });
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  // Determine direction for animation
  const [direction, setDirection] = useState(0);
  const paginate = (newDirection) => {
    setDirection(newDirection);
    if (newDirection > 0) handleNextSlide();
    else handlePrevSlide();
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <motion.h1
        className="text-3xl font-bold text-center mb-8 text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Generated Slides
      </motion.h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Slide Preview Area */}
        <div className="lg:w-2/3 relative overflow-hidden">
          <Card className="shadow-lg border-border/60 bg-card aspect-video flex flex-col justify-center items-center p-8 relative">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentSlideIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0 p-8 flex flex-col justify-center items-center"
              >
                {editingSlideId === currentSlide.id ? (
                  <div className="w-full space-y-4">
                    <Input
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="text-2xl font-bold text-center border-primary focus:ring-primary"
                      placeholder="Slide Title"
                    />
                    <Textarea
                      value={editedPoints}
                      onChange={(e) => setEditedPoints(e.target.value)}
                      rows={6}
                      className="text-lg border-primary focus:ring-primary"
                      placeholder="Bullet points (one per line)"
                    />
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handleSaveEdit}>
                        <Save className="w-4 h-4 mr-2" /> Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold mb-4 text-center text-foreground">
                      {currentSlide.title}
                    </h2>
                    <ul className="list-disc space-y-2 text-lg text-muted-foreground text-left w-full max-w-md">
                      {(currentSlide.points || currentSlide.bullets || []).map(
                        (point, index) => (
                          <li key={index}>{point.replace(/^- /, "")}</li>
                        )
                      )}
                    </ul>
                    {currentSlide.images && currentSlide.images.length > 0 && (
                      <div className="mt-4 space-y-4 text-center">
                        <p className="text-sm text-muted-foreground">
                          {currentSlide.images.length} image
                          {currentSlide.images.length > 1 ? "s" : ""}:
                        </p>
                        {currentSlide.images.map((img, idx) => (
                          <ImageViewer key={idx} base64={img} />
                        ))}
                      </div>
                    )}

                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-4 right-4 text-muted-foreground hover:text-primary"
                      onClick={() => handleEditClick(currentSlide)}
                    >
                      <Edit className="w-5 h-5" />
                    </Button>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </Card>
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full shadow-md bg-background/80 hover:bg-accent"
            onClick={() => paginate(-1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full shadow-md bg-background/80 hover:bg-accent"
            onClick={() => paginate(1)}
          >
            <ArrowRight className="w-5 h-5" />
          </Button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-muted-foreground">
            Slide {currentSlideIndex + 1} of {slides.length}
          </div>
        </div>

        {/* Controls and Actions Area */}
        <div className="lg:w-1/3 space-y-6">
          <Card className="shadow-md border-border/60 bg-card">
            <CardHeader>
              <CardTitle className="text-xl text-primary">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                <Eye className="w-4 h-4 mr-2" /> Preview Full Presentation
              </Button>
              <Button className="w-full">
                <Download className="w-4 h-4 mr-2" /> Export as PPTX
              </Button>
              <Button className="w-full">
                <Download className="w-4 h-4 mr-2" /> Export as PDF
              </Button>
              <Button className="w-full" variant="secondary">
                <Share2 className="w-4 h-4 mr-2" /> Share Link
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-md border-border/60 bg-card">
            <CardHeader>
              <CardTitle className="text-xl text-primary">
                Rate This Presentation
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRate(star)}
                  className="text-yellow-400 hover:text-yellow-500"
                >
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

export default SlideGenerationPage;
