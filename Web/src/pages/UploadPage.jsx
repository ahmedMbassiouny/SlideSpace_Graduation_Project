import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { UploadCloud, FileCheck, XCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import api from "@/lib/axios";

const UploadPage = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [documentId, setDocumentId] = useState(null); // New
  const [mlDocId, setMlDocId] = useState(null); // New: ML document ID from API
  const { toast } = useToast();

  const [extractedTitles, setExtractedTitles] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTitles, setEditedTitles] = useState([]);
  const [isExtractingTitles, setIsExtractingTitles] = useState(false); // New: Loading state for title extraction

  const [currentStep, setCurrentStep] = useState(1);

  const [showGenerateButton, setShowGenerateButton] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateStatus, setGenerateStatus] = useState(null); //
  const [generatedSlides, setGeneratedSlides] = useState([]);
  const [titlesSaved, setTitlesSaved] = useState(false); // New: Track if titles have been saved

  const steps = [
    // Define the steps for the upload process
    { id: 1, label: "Upload" },
    { id: 2, label: "Extract Titles" },
    { id: 3, label: "Edit & Generate" },
    { id: 4, label: "Preview & Export" },
  ];

  useEffect(() => {
    if (uploadStatus !== "success") {
      setCurrentStep(1);
    } else if (uploadStatus === "success" && extractedTitles.length === 0) {
      setCurrentStep(2);
    } else if (extractedTitles.length > 0) {
      setCurrentStep(3);
    }
  }, [uploadStatus, extractedTitles]);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('uploadPageData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        if (parsedData.documentId) {
          setDocumentId(parsedData.documentId);
          setUploadStatus("success");
        }
        if (parsedData.mlDocId) {
          setMlDocId(parsedData.mlDocId);
        }
        if (parsedData.titles && parsedData.titles.length > 0) {
          setExtractedTitles(parsedData.titles);
          setEditedTitles(parsedData.titles);
        }
        if (parsedData.titlesSaved) {
          setTitlesSaved(parsedData.titlesSaved);
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
        localStorage.removeItem('uploadPageData');
      }
    }
  }, []);

  // Save data to localStorage whenever important data changes
  const saveToLocalStorage = (titles, docId, mlDocId, saved = false) => {
    const dataToSave = {
      documentId: docId,
      mlDocId: mlDocId,
      titles: titles,
      titlesSaved: saved,
      timestamp: Date.now()
    };
    localStorage.setItem('uploadPageData', JSON.stringify(dataToSave));
  };

  // Clear saved data from localStorage
  const clearLocalStorage = () => {
    localStorage.removeItem('uploadPageData');
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (
        selectedFile.type === "application/pdf" ||
        selectedFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setFile(selectedFile);
        setUploadStatus(null);
        setUploadProgress(0);
        setDocumentId(null); // Reset
        setMlDocId(null); // Reset ML document ID
        setIsExtractingTitles(false); // Reset extracting state
        setTitlesSaved(false); // Reset saved state
      } else {
        toast({
          variant: "destructive",
          title: "Invalid File Type",
          description: "Please upload a PDF or DOCX file.",
        });
        setFile(null);
      }
    }
  };

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragOver(false);

      const droppedFile = event.dataTransfer.files[0];
      if (droppedFile) {
        if (
          droppedFile.type === "application/pdf" ||
          droppedFile.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          setFile(droppedFile);
          setUploadStatus(null);
          setUploadProgress(0);
          setDocumentId(null); // Reset
          setMlDocId(null); // Reset ML document ID
          setIsExtractingTitles(false); // Reset extracting state
          setTitlesSaved(false); // Reset saved state
        } else {
          toast({
            variant: "destructive",
            title: "Invalid File Type",
            description: "Please upload a PDF or DOCX file.",
          });
          setFile(null);
        }
      }
    },
    [toast]
  );

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
      });
      return;
    }

    setIsUploading(true);
    setUploadStatus(null);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const csrfRes = await api.get("/csrf.php");
      const csrfToken = csrfRes.data.csrf_token;

      const response = await api.post("/document.php?action=upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRF-Token": csrfToken,
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percent);
        },
      });

      const result = response.data;

      if (result.success) {
        setUploadStatus("success");
        setDocumentId(result.file_id); // Save the doc ID
        saveToLocalStorage([], result.file_id, null); // Save document ID with empty titles and no doc_id yet
        toast({
          title: "Upload Successful",
          description: result.message,
        });
      } else {
        setUploadStatus("error");
        toast({
          variant: "destructive",
          title: "Upload Failed",
          description: result.message,
        });
      }
    } catch (error) {
      setUploadStatus("error");
      toast({
        variant: "destructive",
        title: "Upload Error",
        description: error.response?.data?.message || error.message,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleExtractTitles = async () => {
    if (uploadStatus !== "success" || !documentId) {
      toast({
        title: "No file uploaded",
        description: "Please upload a file before extracting titles.",
      });
      return;
    }

    setIsExtractingTitles(true); // Start loading

    try {
      const csrfRes = await api.get("/csrf.php");
      const csrfToken = csrfRes.data.csrf_token;

      const response = await api.post(
        "/document.php?action=getTitles",
        { document_id: documentId },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        }
      );

      const result = response.data;

      if (result.success) {  
        setExtractedTitles(result.titles);
        setEditedTitles(result.titles);
        setMlDocId(result.doc_id); // Save doc_id
        setTitlesSaved(false); // Reset saved state for new titles
        console.log('ML Document ID captured:', result.doc_id); // Debug log
        saveToLocalStorage(result.titles, documentId, result.doc_id, false); // Save titles, document ID, and ML document ID
        toast({
          title: "Titles Extracted",
          description: "Edit the titles below if needed, then save them to generate slides.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Extraction Failed",
          description: result.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Extraction Error",
        description: error.response?.data?.message || error.message,
      });
    } finally {
      setIsExtractingTitles(false); // Stop loading
    }
  };

  const saveTitles = async () => {
    if (!documentId) return;

    if (editedTitles.length === 0) {
      toast({
        title: "No Titles to Save",
        description: "Please edit the titles before saving.",
      });
      return;
    }

    try {
      // Fetch CSRF token
      const csrfRes = await api.get("/csrf.php");
      const csrfToken = csrfRes.data.csrf_token;

      // ✅ Preserve original indexes when saving
      const titlesWithIndexes = editedTitles.map((titleObj, arrayIndex) => ({
        index: titleObj.index !== undefined ? titleObj.index : arrayIndex,
        title: titleObj.title
      }));

      // Send save request
      const response = await api.post(
        "/document.php?action=saveTitles",
        {
          document_id: documentId,
          titles: titlesWithIndexes,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        }
      );

      const result = response.data;

      if (result.success) {
        setShowGenerateButton(true); // Show the button
        setTitlesSaved(true); // Mark titles as saved
        saveToLocalStorage(titlesWithIndexes, documentId, mlDocId, true); // Save edited titles and doc_id
        toast({
          title: "Titles Saved",
          description: "The edited titles were saved successfully. You can now generate slides.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Save Failed",
          description: result.message || "Failed to save the titles.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Save Error",
        description: error.response?.data?.message || error.message,
      });
    }
  };

  const addNewTitle = () => {
    // Use the current length of the array as the new index
    const newIndex = editedTitles.length;
    
    // Add new title with the next sequential index
    const newTitle = {
      index: newIndex,
      title: "New Title"
    };
    
    setEditedTitles([...editedTitles, newTitle]);
  };

  const handleGenerateSlides = async () => {
    console.log('handleGenerateSlides called'); // Debug log
    console.log('documentId:', documentId); // Debug log
    console.log('mlDocId:', mlDocId); // Debug log
    console.log('editedTitles:', editedTitles); // Debug log
    console.log('titlesSaved:', titlesSaved); // Debug log
    
    if (!documentId || !mlDocId) {
      console.log('Missing documentId or mlDocId'); // Debug log
      toast({
        variant: "destructive",
        title: "Missing Data",
        description: "Document ID or ML Document ID is missing. Please try uploading again.",
      });
      return;
    }

    if (editedTitles.length === 0) {
      toast({
        title: "No Titles Available",
        description: "Please extract titles from your document first.",
      });
      return;
    }

    if (!titlesSaved) {
      toast({
        variant: "destructive",
        title: "Titles Not Saved",
        description: "Please save your titles before generating slides.",
      });
      return;
    }

    // Use current edited titles (titles are already saved)
    const titlesWithIndexes = editedTitles.map((titleObj, arrayIndex) => ({
      index: titleObj.index !== undefined ? titleObj.index : arrayIndex,
      title: titleObj.title
    }));
    
    console.log('titlesWithIndexes:', titlesWithIndexes); // Debug log
    
    setIsGenerating(true);
    setGenerateStatus("loading");

    try {
      // Fetch CSRF token
      const csrfRes = await api.get("/csrf.php");
      const csrfToken = csrfRes.data.csrf_token;

      console.log('Using ML Document ID for slides generation:', mlDocId); // Debug log
      console.log('Request payload:', { ml_document_id: mlDocId, titles: titlesWithIndexes }); // Debug log

      // Send request to generate slides using doc_id
      const response = await api.post(
        "/document.php?action=generateSlides",
        { ml_document_id: mlDocId, titles: titlesWithIndexes },
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
        }
      );

      console.log('API Response:', response.data); // Debug log

      const result = response.data;

      if (result.success) {
        setGenerateStatus("success");
        
        // Clear localStorage since we're moving to the next step
        clearLocalStorage();
        
        toast({
          title: "Slides Generated Successfully",
          description: "Redirecting to slide generation...",
        });

        // Redirect to SlideGenerationPage with slides data
        navigate('/generate', { 
          state: { 
            slides: result.slides || [],
            documentId: documentId,
            mlDocId: mlDocId,
            titles: titlesWithIndexes
          } 
        });
      } else {
        setGenerateStatus("error");
        toast({
          variant: "destructive",
          title: "Slide Generation Failed",
          description: result.message || "Failed to generate slides.",
        });
      }
    } catch (error) {
      setGenerateStatus("error");
      toast({
        variant: "destructive",
        title: "Slide Generation Error",
        description: error.response?.data?.message || error.message,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 container mx-auto max-w-3xl py-12 px-4">
        {/* Step Indicator */}
        <div className="mb-8">
          <ol className="flex items-center justify-center space-x-4 text-sm font-medium text-muted-foreground">
            {steps.map((step) => (
              <motion.li
                key={step.id}
                className={`flex items-center ${
                  currentStep === step.id
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: step.id * 0.1 }}
              >
                <motion.span
                  className={`mr-2 rounded-full w-6 h-6 flex items-center justify-center text-xs 
              ${
                currentStep === step.id
                  ? "bg-primary text-white"
                  : "bg-gray-300 text-gray-600"
              }
            `}
                  layout
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {step.id}
                </motion.span>
                {step.label}
              </motion.li>
            ))}
          </ol>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`transition-all duration-500 transform ${
            !isGenerating && extractedTitles.length === 0
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 h-0 overflow-hidden"
          } `}
        >
          <Card className="shadow-lg border-border/60 bg-card">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center text-primary">
                Upload Your Paper
              </CardTitle>
              <CardDescription className="text-center text-muted-foreground">
                Upload your scientific paper (PDF or DOCX) to generate
                presentation slides.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className={`transition-all duration-500 transform ${
            uploadStatus !== "success"
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 h-0 overflow-hidden"
          } `}>
                <div
                  className={`flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg transition-colors cursor-pointer
                  ${
                    isDragOver
                      ? "border-primary bg-primary/10"
                      : "border-primary/30 bg-primary/5"
                  } hover:bg-primary/10`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => document.getElementById("fileInput")?.click()}
                >
                  <UploadCloud className="w-16 h-16 mb-4 text-primary/70" />
                  <p className="mb-2 text-lg font-semibold text-foreground">
                    Drag & drop your file here
                  </p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    (PDF or DOCX only)
                  </p>
                  <input
                    id="fileInput"
                    type="file"
                    accept=".pdf,.docx"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              {file && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="p-4 space-y-3 border rounded-md bg-secondary/50"
                >
                  <p className="text-sm font-medium text-foreground">
                    Selected file:{" "}
                    <span className="font-normal text-muted-foreground">
                      {file.name}
                    </span>
                  </p>
                  {isUploading && (
                    <div className="space-y-1">
                      <Progress value={uploadProgress} className="w-full h-2" />
                      <p className="text-xs text-primary text-center">
                        {uploadProgress}% uploaded
                      </p>
                    </div>
                  )}
                  {isExtractingTitles && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                        <span className="text-sm text-primary">Extracting titles from document...</span>
                      </div>
                      <Progress value={undefined} className="w-full h-2" />
                      <p className="text-xs text-muted-foreground text-center">
                        This may take a few moments
                      </p>
                    </div>
                  )}
                  {uploadStatus === "success" && (
                    <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                      <FileCheck className="w-4 h-4" />
                      <span>Upload successful!</span>
                    </div>
                  )}
                  {uploadStatus === "error" && (
                    <div className="flex items-center justify-center gap-2 text-sm text-red-600">
                      <XCircle className="w-4 h-4" />
                      <span>Upload failed. Please try again.</span>
                    </div>
                  )}
                </motion.div>
              )}

              <Button
                onClick={
                  uploadStatus !== "success"
                    ? handleUpload
                    : extractedTitles.length === 0
                    ? handleExtractTitles
                    : ""
                }
                disabled={
                  !file ||
                  isUploading ||
                  isExtractingTitles ||
                  (uploadStatus === "success" && extractedTitles.length > 0)
                }
                className="w-full text-lg py-3"
                size="lg"
              >
                {isUploading
                  ? "Uploading..."
                  : isExtractingTitles
                  ? "Extracting Titles..."
                  : uploadStatus === "success" && extractedTitles.length === 0
                  ? "Extract Titles"
                  : uploadStatus === "success" && extractedTitles.length > 0
                  ? "Titles Extracted successfully"
                  : uploadStatus === "error"
                  ? "Retry Upload"
                  : "Upload Paper"}
              </Button>

              {/* Clear button for step 2 */}
              {uploadStatus === "success" && extractedTitles.length === 0 && (
                <Button
                  variant="outline"
                  onClick={() => {
                    clearLocalStorage();
                    setDocumentId(null);
                    setMlDocId(null);
                    setUploadStatus(null);
                    setFile(null);
                    setExtractedTitles([]);
                    setEditedTitles([]);
                    setShowGenerateButton(false);
                    setIsExtractingTitles(false); // Reset extracting state
                    setTitlesSaved(false); // Reset saved state
                    setCurrentStep(1);
                    toast({
                      title: "Data Cleared",
                      description: "All saved data has been cleared.",
                    });
                  }}
                  className="w-full mt-2"
                >
                  Clear & Upload New File
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`transition-all duration-500 transform  ${
            !isGenerating && extractedTitles.length > 0
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 h-0 overflow-hidden"
          } `}
        >
          <Card className="mt-6 border border-primary/40 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-primary">
                Extracted Titles - Save Required
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Edit the titles below if needed, then save them to enable slide generation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {editedTitles.map((title, index) => (
                <div key={index} className="flex items-center gap-4">
                  {editingIndex === index ? (
                    <input
                      value={editedTitles[index].title}
                      onChange={(e) => {
                        const newTitles = [...editedTitles];
                        newTitles[index] = {
                          index: editedTitles[index].index,
                          title: e.target.value,
                        };
                        setEditedTitles(newTitles);
                      }}
                      className="flex-1 p-2 border rounded-md bg-background text-foreground"
                    />
                  ) : (
                    <p className="flex-1 text-foreground">{title.title}</p>
                  )}
                  {editingIndex === index ? (
                    <>
                      <Button
                        size="sm"
                        onClick={() => setEditingIndex(null)}
                        variant="secondary"
                      >
                        Cancel
                      </Button>
                      <Button size="sm" onClick={() => setEditingIndex(null)}>
                        Save
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingIndex(index)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          const newTitles = editedTitles.filter(
                            (_, i) => i !== index
                          );
                          setEditedTitles(newTitles);
                        }}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              ))}

              {/* Add new title */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={addNewTitle}
                >
                  Add Title
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    clearLocalStorage();
                    setDocumentId(null);
                    setMlDocId(null);
                    setUploadStatus(null);
                    setFile(null);
                    setExtractedTitles([]);
                    setEditedTitles([]);
                    setShowGenerateButton(false);
                    setIsExtractingTitles(false); // Reset extracting state
                    setTitlesSaved(false); // Reset saved state
                    setCurrentStep(1);
                    toast({
                      title: "Data Cleared",
                      description: "All saved data has been cleared.",
                    });
                  }}
                >
                  Clear Data
                </Button>
                <Button 
                  onClick={saveTitles}
                  className="ml-auto"
                  disabled={editedTitles.length === 0}
                >
                  {titlesSaved ? "save titles" : "💾 Save Titles (Required)"}
                </Button>
              </div>
              
              {/* Generate Slides Button - Only enabled when titles are saved */}
              <div className="pt-4 border-t border-border/50">
                <Button
                  onClick={() => {
                    console.log('Generate Slides button clicked'); // Debug log
                    console.log('mlDocId:', mlDocId); // Debug log
                    console.log('editedTitles length:', editedTitles.length); // Debug log
                    handleGenerateSlides();
                    setCurrentStep(4);
                  }}
                  disabled={!mlDocId || editedTitles.length === 0 || !titlesSaved}
                  className="w-full text-lg py-4 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  size="lg"
                >
                  {!titlesSaved 
                    ? "🔒 Save Titles First to Generate Slides"
                    : editedTitles.length > 0
                    ? "🚀 Generate Slides Now"
                    : "No Titles Available"}
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  {!titlesSaved 
                    ? "You must save your titles before generating slides"
                    : "Ready to generate slides with your saved titles"}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`transition-all duration-500 transform ${
            isGenerating
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 h-0 overflow-hidden"
          }`}
        >
          <Card className="mt-6 border border-primary/40 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-primary flex items-center gap-2">
                {generateStatus === "loading" && <Loader2 className="w-5 h-5 animate-spin" />}
                {generateStatus === "success" && "✅"}
                {generateStatus === "error" && "❌"}
                {generateStatus === "loading" && "Generating Slides..."}
                {generateStatus === "success" && "Slides Generated Successfully!"}
                {generateStatus === "error" && "Generation Failed"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {generateStatus === "loading" && (
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <Loader2 className="w-12 h-12 animate-spin text-primary" />
                  </div>
                  <p className="text-muted-foreground">
                    Please wait while we generate your presentation slides...
                  </p>
                  <Progress value={undefined} className="w-full" />
                </div>
              )}
              
              {generateStatus === "success" && (
                <div className="text-center space-y-4">
                  <div className="text-green-600 text-lg">
                    🎉 Your slides have been generated successfully!
                  </div>
                  <p className="text-muted-foreground">
                    Redirecting to slides view...
                  </p>
                </div>
              )}
              
              {generateStatus === "error" && (
                <div className="text-center space-y-4">
                  <div className="text-red-600 text-lg">
                    ❌ Failed to generate slides
                  </div>
                  <p className="text-muted-foreground">
                    Please try again or contact support if the problem persists.
                  </p>
                  <Button 
                    onClick={handleGenerateSlides}
                    variant="outline"
                  >
                    Try Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default UploadPage;
