<?php
require_once '../api-headers.php';
require_once '../middleware.php';
require_once '../config/db.php';
require_once 'ml-api.php';


$requestMethod = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? null;

// Route the request
if ($requestMethod === 'POST' && $action === 'upload') {
  uploadFile();
} elseif ($requestMethod === 'POST' && $action === 'getTitles') {
  getDocumentTitles();
} elseif ($requestMethod === 'POST' && $action === 'saveTitles') {
  saveDocumentTitles();
} elseif ($requestMethod === 'POST' && $action === 'generateSlides') {
  generateSlides();
} elseif ($requestMethod === 'POST' && $action === 'getSlides') {
  getSlides();
} elseif ($requestMethod === 'POST' && $action === 'saveSlides') {
  saveSlides();
} elseif ($requestMethod === 'POST' && $action === 'generatePPTX') {
  generatePPTX();
} elseif ($requestMethod === 'POST' && $action === 'generateGAPPTX') {
  generateGAPPTX();
} elseif ($requestMethod === 'POST' && $action === 'getDefaultPPTXFiles') {
  getDefaultPPTXFiles();
} elseif ($requestMethod === 'POST' && $action === 'getGAPPTXFiles') {
  getGAPPTXFiles();
} elseif ($requestMethod === 'POST' && $action === 'downloadPPTX') {
  downloadPPTX();
} else {
  http_response_code(405);
  echo json_encode(["status" => "error", "message" => "Invalid request method"]);
  exit();
}


function uploadFile()
{
  global $conn;

  // Check if user is logged in
  requireAuth();

  $csrfHeader = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
  validateCsrfToken($csrfHeader);


  if (!isset($_FILES['file'])) {
    echo json_encode(["success" => false, "message" => "No file uploaded."]);
    exit;
  }

  $file = $_FILES['file'];
  $originalName = basename($file["name"]);
  $_SESSION['file_name'] = $originalName;
  $fileTmpPath = $file["tmp_name"];
  $fileType = mime_content_type($fileTmpPath);

  // Allow only PDF and DOCX
  $allowedTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ];
  if (!in_array($fileType, $allowedTypes)) {
    echo json_encode(["success" => false, "message" => "Invalid file type."]);
    exit;
  }

  // Save file
  $uploadDir = "../../uploads/";
  if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
  }

  $timestampedName = time() . "_" . $originalName;
  $filePath = $uploadDir . $timestampedName;

  if (move_uploaded_file($fileTmpPath, $filePath)) {
    $userId = $_SESSION['user_id'];
    $title = pathinfo($originalName, PATHINFO_FILENAME); // use original filename without extension

    // Insert into DB
    $stmt = $conn->prepare("INSERT INTO documents (user_id, title, filename) VALUES (?, ?, ?)");
    $stmt->bind_param("iss", $userId, $title, $timestampedName);
    if ($stmt->execute()) {
      $_SESSION['document_id'] = $stmt->insert_id;
      echo json_encode([
        "success" => true,
        "message" => "File uploaded and saved successfully.",
        "file_path" => $filePath,
        "file_id" => $stmt->insert_id
      ]);
    } else {
      echo json_encode([
        "success" => false,
        "message" => "Database error: " . $stmt->error
      ]);
    }

    $stmt->close();
  } else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to move uploaded file."]);
  }
}


function getDocumentTitles()
{
  global $conn;

  // Check if user is logged in
  requireAuth();

  $csrfHeader = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
  validateCsrfToken($csrfHeader);

  // Get the document ID from the request
  $input = json_decode(file_get_contents("php://input"), true);
  $documentId = $input['document_id'] ?? null;

  if (!$documentId) {
    echo json_encode(["success" => false, "message" => "Document ID is required."]);
    return;
  }

  // Get the document filename from database
  $stmt = $conn->prepare("SELECT filename FROM documents WHERE id = ? AND user_id = ?");
  $stmt->bind_param("ii", $documentId, $_SESSION['user_id']);
  $stmt->execute();
  $result = $stmt->get_result();

  if ($result->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "Document not found or access denied."]);
    $stmt->close();
    return;
  }

  $document = $result->fetch_assoc();
  $stmt->close();

  // Get the file path
  $filePath = realpath("../../uploads/" . $document['filename']);

  if (!$filePath || !file_exists($filePath)) {
    echo json_encode(["success" => false, "message" => "File not found on server."]);
    return;
  }

  // Call ML API to get titles
  $mlResponse = extractDocumentTitles($filePath);

  if ($mlResponse === false) {

    echo json_encode(["success" => false, "message" => "Failed to extract titles from document." . $mlResponse['message']]);
    return;
  }

  // Extract the ML document ID from the response
  $mlDocId = $mlResponse['doc_id'] ?? null;
  $_SESSION['ml_doc_id'] = $mlDocId;

  // Debug logging
  error_log("getDocumentTitles Debug: ML Doc ID extracted: " . ($mlDocId ?? 'null'));
  error_log("getDocumentTitles Debug: Titles count: " . count($mlResponse['titles']));

  // Prepare the response with both titles and doc_id
  $response = [
    'success' => true,
    'titles' => $mlResponse['titles'],
    'doc_id' => $mlDocId
  ];

  // Send response
  echo json_encode($response);
}


function saveDocumentTitles()
{
  global $conn;

  requireAuth();

  $csrfHeader = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
  validateCsrfToken($csrfHeader);

  $input = json_decode(file_get_contents("php://input"), true);

  $documentId = $input['document_id'] ?? null;
  $titlesArray = $input['titles'] ?? [];

  if (!$documentId || !is_array($titlesArray) || empty($titlesArray)) {
    echo json_encode(["success" => false, "message" => "Invalid or missing data."]);
    return;
  }

  // Encode titles array into JSON
  $titlesJson = json_encode($titlesArray, JSON_UNESCAPED_UNICODE);

  if ($titlesJson === false) {
    echo json_encode(["success" => false, "message" => "Failed to encode titles to JSON."]);
    return;
  }

  // Delete duplicates / existing titles for this document
  $deleteStmt = $conn->prepare("DELETE FROM presentations_titles WHERE document_id = ?");
  $deleteStmt->bind_param("i", $documentId);
  $deleteStmt->execute();
  $deleteStmt->close();

  // Insert new titles
  $stmt = $conn->prepare("INSERT INTO presentations_titles (document_id, titles, created_at) VALUES (?, ?, NOW())");
  $stmt->bind_param("is", $documentId, $titlesJson);

  if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Titles saved successfully. titles: "]);
  } else {
    echo json_encode(["success" => false, "message" => "DB error: " . $stmt->error]);
  }

  $stmt->close();
}

function generateSlides()
{
  global $conn;

  requireAuth();

  $csrfHeader = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
  validateCsrfToken($csrfHeader);

  $input = json_decode(file_get_contents("php://input"), true);

  $mlDocumentId = $input['ml_document_id'] ?? null;
  $titlesArray = $input['titles'] ?? [];

  if (!$mlDocumentId) {
    echo json_encode(["success" => false, "message" => "Document ID is required"]);
    return;
  }

  if (empty($titlesArray)) {
    echo json_encode(["success" => false, "message" => "Titles array is required"]);
    return;
  }

  // Extract just the indexes from the titles array
  $titleIndexes = [];
  foreach ($titlesArray as $titleObj) {
    if (isset($titleObj['index'])) {
      $titleIndexes[] = $titleObj['index'];
    }
  }

  // Debug logging
  error_log("generateSlides Debug: Document ID: " . $mlDocumentId);
  error_log("generateSlides Debug: Title indexes: " . json_encode($titleIndexes));
  error_log("generateSlides Debug: Original titles: " . json_encode($titlesArray));

  $mlResponse = callMLSlidesApi($mlDocumentId, $titleIndexes);

  // Check if there was an error
  if (isset($mlResponse['error'])) {
    echo json_encode([
      "success" => false,
      "message" => "Failed to generate slides with ML API: " . $mlResponse['error'],
      "details" => $mlResponse
    ]);
    return;
  }

  // Check if response has slides
  if (isset($mlResponse['slides']) && is_array($mlResponse['slides'])) {
    echo json_encode([
      "success" => true,
      "message" => "Slides generated successfully.",
      "slides" => $mlResponse['slides']
    ]);

    // Always save slides to JSON file first
    $slidesDir = "../../slides/";
    if (!is_dir($slidesDir)) {
      mkdir($slidesDir, 0755, true);
    }

    $slideName = $_SESSION['file_name'];

    $timestampedName = time() . "_" . $slideName . "slide" . ".json";

    $slidesFile = $slidesDir . $timestampedName;

    $slidesJson = json_encode($mlResponse['slides'], JSON_UNESCAPED_UNICODE);

    if (file_put_contents($slidesFile, $slidesJson)) {
      error_log("Slides saved to file: " . $slidesFile);

      // Save file path to database instead of content
      $stmt = $conn->prepare("INSERT INTO presentations_content (document_id, slide_content_path, created_at) VALUES (?, ?, NOW())");
      $stmt->bind_param("is", $_SESSION['document_id'], $timestampedName);

      if ($stmt->execute()) {
        error_log("File path saved to database successfully: " . $slidesFile);
      } else {
        error_log("Error saving file path to database: " . $stmt->error);
      }
      $stmt->close();
    } else {
      error_log("Failed to save slides to file: " . $slidesFile);
    }
  } else {
    echo json_encode([
      "success" => false,
      "message" => "Invalid response from ML API",
      "response" => $mlResponse
    ]);
  }
}

function getSlides()
{
  global $conn;

  requireAuth();

  $csrfHeader = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
  validateCsrfToken($csrfHeader);

  $input = json_decode(file_get_contents("php://input"), true);
  $documentId = $input['document_id'] ?? null;

  if (!$documentId) {
    echo json_encode(["success" => false, "message" => "Document ID is required."]);
    return;
  }

  // Get the file path and document title from database
  $stmt = $conn->prepare("
    SELECT pc.slide_content_path, d.title 
    FROM presentations_content pc 
    JOIN documents d ON pc.document_id = d.id 
    WHERE pc.document_id = ? AND d.user_id = ? 
    ORDER BY pc.created_at DESC LIMIT 1
  ");
  $stmt->bind_param("ii", $documentId, $_SESSION['user_id']);
  $stmt->execute();
  $result = $stmt->get_result();

  if ($result->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "No slides found for this document."]);
    $stmt->close();
    return;
  }

  $row = $result->fetch_assoc();
  $stmt->close();

  $slidesFilePath = "../../slides/" . $row['slide_content_path'];
  $presentationTitle = $row['title'];

  // Check if the file exists
  if (!file_exists($slidesFilePath)) {
    echo json_encode(["success" => false, "message" => "Slides file not found."]);
    return;
  }

  // Read and decode the JSON file
  $slidesJson = file_get_contents($slidesFilePath);
  if ($slidesJson === false) {
    echo json_encode(["success" => false, "message" => "Failed to read slides file."]);
    return;
  }

  $slides = json_decode($slidesJson, true);
  if ($slides === null) {
    echo json_encode(["success" => false, "message" => "Invalid JSON format in slides file."]);
    return;
  }

  echo json_encode([
    "success" => true,
    "slides" => $slides,
    "presentation_title" => $presentationTitle,
    "file_path" => $slidesFilePath
  ]);
}

function saveSlides()
{
  global $conn;

  requireAuth();

  $csrfHeader = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
  validateCsrfToken($csrfHeader);

  $input = json_decode(file_get_contents("php://input"), true);
  $documentId = $input['document_id'] ?? null;
  $slides = $input['slides'] ?? null;

  if (!$documentId || !$slides) {
    echo json_encode(["success" => false, "message" => "Document ID and slides are required."]);
    return;
  }

  // Always save slides to a JSON file first
  $slidesDir = "../../slides/";
  if (!is_dir($slidesDir)) {
    mkdir($slidesDir, 0755, true);
  }

  // Use a timestamped filename to avoid duplicates
  $slideFileName = time() . "_slides_" . $documentId . ".json";
  $slidesFilePath = $slidesDir . $slideFileName;

  // Save slides as JSON
  $slidesJson = json_encode($slides, JSON_UNESCAPED_UNICODE);
  if (file_put_contents($slidesFilePath, $slidesJson) === false) {
    echo json_encode(["success" => false, "message" => "Failed to save slides file."]);
    return;
  }

  // Remove previous slide content entries for this document to avoid duplicates
  $deleteStmt = $conn->prepare("DELETE FROM presentations_content WHERE document_id = ?");
  $deleteStmt->bind_param("i", $documentId);
  $deleteStmt->execute();
  $deleteStmt->close();

  // Insert new slide content path using the correct column name
  $stmt = $conn->prepare("INSERT INTO presentations_content (document_id, slide_content_path, created_at) VALUES (?, ?, NOW())");
  $stmt->bind_param("is", $documentId, $slideFileName);
  if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Slides saved successfully."]);
  } else {
    echo json_encode(["success" => false, "message" => "Failed to save slides: " . $stmt->error]);
  }
  $stmt->close();
}

function generatePPTX()
{
  global $conn;

  requireAuth();

  $csrfHeader = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
  validateCsrfToken($csrfHeader);

  $input = json_decode(file_get_contents("php://input"), true);
  $documentId = $input['document_id'] ?? null;
  $slides = $input['slides'] ?? null;

  if (!$documentId || !$slides) {
    echo json_encode(["success" => false, "message" => "Document ID and slides are required."]);
    return;
  }

  // Get the ML document ID from session or database
  $mlDocId = $_SESSION['ml_doc_id'] ?? null;
  
  if (!$mlDocId) {
    echo json_encode(["success" => false, "message" => "ML Document ID not found."]);
    return;
  }

  // Call ML API to generate PPTX
  $mlResponse = callMLPPTXApi($mlDocId, $slides, 'default');

  if (isset($mlResponse['error'])) {
    echo json_encode([
      "success" => false,
      "message" => "Failed to generate PPTX: " . $mlResponse['error']
    ]);
    return;
  }

  // Get the presentation content ID
  $stmt = $conn->prepare("SELECT id FROM presentations_content WHERE document_id = ? ORDER BY created_at DESC LIMIT 1");
  $stmt->bind_param("i", $documentId);
  $stmt->execute();
  $result = $stmt->get_result();
  
  if ($result->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "Presentation content not found."]);
    $stmt->close();
    return;
  }
  
  $presentationContent = $result->fetch_assoc();
  $presentationId = $presentationContent['id'];
  $stmt->close();

  // Create PPTX directory if it doesn't exist
  $pptxDir = "../../pptx/";
  if (!is_dir($pptxDir)) {
    mkdir($pptxDir, 0755, true);
  }

  // Generate unique filename
  $timestamp = time();
  $filename = "default_pptx_" . $documentId . "_" . $timestamp . ".pptx";
  $filePath = $pptxDir . $filename;

  // Decode base64 PPTX data and save to file
  $pptxData = base64_decode($mlResponse['pptx_data']);
  if (file_put_contents($filePath, $pptxData) === false) {
    echo json_encode(["success" => false, "message" => "Failed to save PPTX file."]);
    return;
  }

  // Save to database
  $stmt = $conn->prepare("INSERT INTO default_pptx_presentations (presentation_id, filename, created_at) VALUES (?, ?, NOW())");
  $stmt->bind_param("is", $presentationId, $filename);
  
  if ($stmt->execute()) {
    echo json_encode([
      "success" => true,
      "message" => "PPTX generated and saved successfully.",
      "pptx_data" => $mlResponse['pptx_data'],
      "filename" => $filename,
      "file_path" => $filePath
    ]);
  } else {
    echo json_encode([
      "success" => false,
      "message" => "Failed to save PPTX to database: " . $stmt->error
    ]);
  }
  $stmt->close();
}

function generateGAPPTX()
{
  global $conn;

  requireAuth();

  $csrfHeader = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
  validateCsrfToken($csrfHeader);

  $input = json_decode(file_get_contents("php://input"), true);
  $documentId = $input['document_id'] ?? null;
  $slides = $input['slides'] ?? null;

  if (!$documentId || !$slides) {
    echo json_encode(["success" => false, "message" => "Document ID and slides are required."]);
    return;
  }

  // Get the ML document ID from session or database
  $mlDocId = $_SESSION['ml_doc_id'] ?? null;
  
  if (!$mlDocId) {
    echo json_encode(["success" => false, "message" => "ML Document ID not found."]);
    return;
  }

  // Call ML API to generate PPTX using GA
  $mlResponse = callMLPPTXApi($mlDocId, $slides, 'ga');

  if (isset($mlResponse['error'])) {
    echo json_encode([
      "success" => false,
      "message" => "Failed to generate PPTX: " . $mlResponse['error']
    ]);
    return;
  }

  // Get the presentation content ID
  $stmt = $conn->prepare("SELECT id FROM presentations_content WHERE document_id = ? ORDER BY created_at DESC LIMIT 1");
  $stmt->bind_param("i", $documentId);
  $stmt->execute();
  $result = $stmt->get_result();
  
  if ($result->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "Presentation content not found."]);
    $stmt->close();
    return;
  }
  
  $presentationContent = $result->fetch_assoc();
  $presentationId = $presentationContent['id'];
  $stmt->close();

  // Create PPTX directory if it doesn't exist
  $pptxDir = "../../pptx/";
  if (!is_dir($pptxDir)) {
    mkdir($pptxDir, 0755, true);
  }

  // Generate unique filename
  $timestamp = time();
  $filename = "ga_pptx_" . $documentId . "_" . $timestamp . ".pptx";
  $filePath = $pptxDir . $filename;

  // Decode base64 PPTX data and save to file
  $pptxData = base64_decode($mlResponse['pptx_data']);
  if (file_put_contents($filePath, $pptxData) === false) {
    echo json_encode(["success" => false, "message" => "Failed to save PPTX file."]);
    return;
  }

  // Save to database
  $stmt = $conn->prepare("INSERT INTO ga_pptx_presentations (presentation_id, filename, created_at) VALUES (?, ?, NOW())");
  $stmt->bind_param("is", $presentationId, $filename);
  
  if ($stmt->execute()) {
    echo json_encode([
      "success" => true,
      "message" => "GA PPTX generated and saved successfully.",
      "pptx_data" => $mlResponse['pptx_data'],
      "filename" => $filename,
      "file_path" => $filePath
    ]);
  } else {
    echo json_encode([
      "success" => false,
      "message" => "Failed to save GA PPTX to database: " . $stmt->error
    ]);
  }
  $stmt->close();
}

function getDefaultPPTXFiles()
{
  global $conn;

  requireAuth();

  $csrfHeader = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
  validateCsrfToken($csrfHeader);

  $input = json_decode(file_get_contents("php://input"), true);
  $documentId = $input['document_id'] ?? null;

  if (!$documentId) {
    echo json_encode(["success" => false, "message" => "Document ID is required."]);
    return;
  }

  // Get default PPTX files for this document
  $stmt = $conn->prepare("
    SELECT dpp.id, dpp.filename, dpp.created_at, d.title as document_title
    FROM default_pptx_presentations dpp
    JOIN presentations_content pc ON dpp.presentation_id = pc.id
    JOIN documents d ON pc.document_id = d.id
    WHERE pc.document_id = ? AND d.user_id = ?
    ORDER BY dpp.created_at DESC
  ");
  $stmt->bind_param("ii", $documentId, $_SESSION['user_id']);
  $stmt->execute();
  $result = $stmt->get_result();

  $files = [];
  while ($row = $result->fetch_assoc()) {
    $files[] = [
      'id' => $row['id'],
      'filename' => $row['filename'],
      'created_at' => $row['created_at'],
      'document_title' => $row['document_title']
    ];
  }
  $stmt->close();

  echo json_encode([
    "success" => true,
    "files" => $files
  ]);
}

function getGAPPTXFiles()
{
  global $conn;

  requireAuth();

  $csrfHeader = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
  validateCsrfToken($csrfHeader);

  $input = json_decode(file_get_contents("php://input"), true);
  $documentId = $input['document_id'] ?? null;

  if (!$documentId) {
    echo json_encode(["success" => false, "message" => "Document ID is required."]);
    return;
  }

  // Get GA PPTX files for this document
  $stmt = $conn->prepare("
    SELECT gpp.id, gpp.filename, gpp.created_at, d.title as document_title
    FROM ga_pptx_presentations gpp
    JOIN presentations_content pc ON gpp.presentation_id = pc.id
    JOIN documents d ON pc.document_id = d.id
    WHERE pc.document_id = ? AND d.user_id = ?
    ORDER BY gpp.created_at DESC
  ");
  $stmt->bind_param("ii", $documentId, $_SESSION['user_id']);
  $stmt->execute();
  $result = $stmt->get_result();

  $files = [];
  while ($row = $result->fetch_assoc()) {
    $files[] = [
      'id' => $row['id'],
      'filename' => $row['filename'],
      'created_at' => $row['created_at'],
      'document_title' => $row['document_title']
    ];
  }
  $stmt->close();

  echo json_encode([
    "success" => true,
    "files" => $files
  ]);
}

function downloadPPTX()
{
  global $conn;

  requireAuth();

  $csrfHeader = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
  validateCsrfToken($csrfHeader);

  $input = json_decode(file_get_contents("php://input"), true);
  $fileId = $input['file_id'] ?? null;
  $type = $input['type'] ?? null; // 'default' or 'ga'

  if (!$fileId || !$type) {
    echo json_encode(["success" => false, "message" => "File ID and type are required."]);
    return;
  }

  // Get file information based on type
  if ($type === 'default') {
    $stmt = $conn->prepare("
      SELECT dpp.filename, d.title as document_title
      FROM default_pptx_presentations dpp
      JOIN presentations_content pc ON dpp.presentation_id = pc.id
      JOIN documents d ON pc.document_id = d.id
      WHERE dpp.id = ? AND d.user_id = ?
    ");
  } else {
    $stmt = $conn->prepare("
      SELECT gpp.filename, d.title as document_title
      FROM ga_pptx_presentations gpp
      JOIN presentations_content pc ON gpp.presentation_id = pc.id
      JOIN documents d ON pc.document_id = d.id
      WHERE gpp.id = ? AND d.user_id = ?
    ");
  }
  
  $stmt->bind_param("ii", $fileId, $_SESSION['user_id']);
  $stmt->execute();
  $result = $stmt->get_result();

  if ($result->num_rows === 0) {
    echo json_encode(["success" => false, "message" => "File not found or access denied."]);
    $stmt->close();
    return;
  }

  $fileInfo = $result->fetch_assoc();
  $stmt->close();

  $filePath = "../../pptx/" . $fileInfo['filename'];

  if (!file_exists($filePath)) {
    echo json_encode(["success" => false, "message" => "File not found on server."]);
    return;
  }

  // Read file and encode as base64
  $fileContent = file_get_contents($filePath);
  $base64Content = base64_encode($fileContent);

  echo json_encode([
    "success" => true,
    "filename" => $fileInfo['filename'],
    "document_title" => $fileInfo['document_title'],
    "file_data" => $base64Content
  ]);
}
