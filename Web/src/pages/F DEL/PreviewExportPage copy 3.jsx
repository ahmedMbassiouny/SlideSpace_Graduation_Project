import React from "react";
import RevealPresentation from "@/components/ui/RevealPresentation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Upload,
  PlayCircle,
  UserPlus,
  FileText,
  Cpu,
  Presentation,
  ArrowRight,
} from "lucide-react"; // Added ArrowRight
import { Link } from "react-router-dom";

function PreviewExportPage() {
  return (
    <div>
      <div className="overflow-auto h-screen">
        <h1>Preview & Export Presentation</h1>
        <h1>Preview & Export Presentation</h1>
        <h1>Preview & Export Presentation</h1>
        <h1>Preview & Export Presentation</h1>
        <RevealPresentation />
        <RevealPresentation />
        <h1>Preview & Export Presentation</h1>
        <h1>Preview & Export Presentation</h1>
        <h1>Preview & Export Presentation</h1>
        <h1>Preview & Export Presentation</h1>
        <h1>Preview & Export Presentation</h1>
        <h1>Preview & Export Presentation</h1>
        <h1>Preview & Export Presentation</h1>
        <h1>Preview & Export Presentation</h1>
      </div>
    </div>
  );
}

export default PreviewExportPage;
