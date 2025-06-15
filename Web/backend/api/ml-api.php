<?php

// first method to get ml api
$ML_BASE_URL = 'https://0463-35-192-144-14.ngrok-free.app';


// git method to get ml api
// https://gist.github.com/AhmedGA-PPTX/79ec449dc37d6264520ed2f92c88ff4c

$gistId = '79ec449dc37d6264520ed2f92c88ff4c';  // GitHub Gist ID
$gistUrl =  "https://api.github.com/gists/$gistId";

function getCurrentNgrokUrl($gistUrl)
{
  $ch = curl_init();

  curl_setopt($ch, CURLOPT_URL, $gistUrl);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_USERAGENT, 'PHP Script');  // GitHub API requires a user agent

  $response = curl_exec($ch);
  curl_close($ch);

  if (!$response) {
    throw new Exception('Error fetching ngrok URL from GitHub');
  }

  $data = json_decode($response, true);
  if (!isset($data['files']['ngrok_url.json']['content'])) {
    throw new Exception('Invalid Gist data structure');
  }

  $content = json_decode($data['files']['ngrok_url.json']['content'], true);

  return $content['ngrok_url'];
}

$ML_BASE_URL = getCurrentNgrokUrl($gistUrl); ;



function processDocumentWithML($filePath)
{
    global $ML_BASE_URL;
    
    $mlApiUrl = $ML_BASE_URL . '/process_document';
    
    // Debug logging
    error_log("ML API Debug: Attempting to call URL: " . $mlApiUrl);
    error_log("ML API Debug: File path: " . $filePath);
    
    // Check if file exists and is readable
    if (!file_exists($filePath) || !is_readable($filePath)) {
        $errorMsg = "File not found or not readable: " . $filePath;
        error_log("ML API Error: " . $errorMsg);
        return ['error' => $errorMsg];
    }

    // Check file size
    $fileSize = filesize($filePath);
    error_log("ML API Debug: File size: " . $fileSize . " bytes");
    
    if ($fileSize === 0) {
        $errorMsg = "File is empty: " . $filePath;
        error_log("ML API Error: " . $errorMsg);
        return ['error' => $errorMsg];
    }

    // Prepare the cURL request
    $curl = curl_init();
    
    // Create file upload
    $postData = [
        'file' => new CURLFile($filePath)
    ];

    // Create a temporary file for verbose output
    $verbose = fopen('php://temp', 'w+');

    curl_setopt_array($curl, [
        CURLOPT_URL => $mlApiUrl,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $postData,
        CURLOPT_HTTPHEADER => [
            'Accept: multipart/form-data'
        ],
        CURLOPT_TIMEOUT => 180, // 3 minutes timeout for ML processing
        CURLOPT_SSL_VERIFYPEER => false, // For development - remove in production
        CURLOPT_SSL_VERIFYHOST => false,  // For development - remove in production
        CURLOPT_VERBOSE => true, // Enable verbose output for debugging
        CURLOPT_STDERR => $verbose // Capture verbose output
    ]);

    $response = curl_exec($curl);
    $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    $error = curl_error($curl);
    $info = curl_getinfo($curl);
    
    // Get verbose output
    rewind($verbose);
    $verboseOutput = stream_get_contents($verbose);
    fclose($verbose);
    
    curl_close($curl);

    // Detailed error logging
    error_log("ML API Debug: HTTP Code: " . $httpCode);
    error_log("ML API Debug: Response length: " . strlen($response));
    error_log("ML API Debug: Total time: " . $info['total_time'] . " seconds");
    
    if ($verboseOutput) {
        error_log("ML API Debug: Verbose output: " . $verboseOutput);
    }

    // Check for cURL errors
    if ($error) {
        $errorMsg = "cURL Error: " . $error;
        error_log("ML API " . $errorMsg);
        return ['error' => $errorMsg, 'curl_error' => $error];
    }

    // Check HTTP status code
    if ($httpCode !== 200) {
        $errorMsg = "HTTP Error: " . $httpCode . " - Response: " . substr($response, 0, 500);
        error_log("ML API " . $errorMsg);
        return [
            'error' => $errorMsg, 
            'http_code' => $httpCode, 
            'response' => substr($response, 0, 500),
            'url' => $mlApiUrl
        ];
    }

    // Log first part of response for debugging
    error_log("ML API Debug: Response preview: " . substr($response, 0, 200));

    // Decode JSON response
    $decodedResponse = json_decode($response, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        $errorMsg = "JSON Decode Error: " . json_last_error_msg() . " - Raw response: " . substr($response, 0, 500);
        error_log("ML API " . $errorMsg);
        return [
            'error' => $errorMsg, 
            'json_error' => json_last_error_msg(),
            'raw_response' => substr($response, 0, 500)
        ];
    }

    // Validate response structure
    if (!isset($decodedResponse['doc_id']) || !isset($decodedResponse['titles']) || !is_array($decodedResponse['titles'])) {
        $errorMsg = "Invalid Response Structure: " . $response . " - Decoded response keys: " . implode(', ', array_keys($decodedResponse));
        error_log("ML API " . $errorMsg);
        return [
            'error' => $errorMsg, 
            'response' => $response,
            'decoded_keys' => array_keys($decodedResponse)
        ];
    }

    error_log("ML API Debug: Successfully processed document with " . count($decodedResponse['titles']) . " titles");
    return $decodedResponse;
}


function extractDocumentTitles($filePath)
{
    // Add debugging information
    error_log("ExtractDocumentTitles Debug: Starting extraction for file: " . $filePath);
    
    // Check if file exists
    if (!file_exists($filePath)) {
        error_log("ExtractDocumentTitles Error: File does not exist: " . $filePath);
        return false;
    }
    
    // Check if file is readable
    if (!is_readable($filePath)) {
        error_log("ExtractDocumentTitles Error: File is not readable: " . $filePath);
        return false;
    }
    
    // Check file size
    $fileSize = filesize($filePath);
    error_log("ExtractDocumentTitles Debug: File size: " . $fileSize . " bytes");
    
    if ($fileSize === 0) {
        error_log("ExtractDocumentTitles Error: File is empty: " . $filePath);
        return false;
    }
    
    $mlResponse = processDocumentWithML($filePath);
    
    if (is_array($mlResponse) && isset($mlResponse['error'])) {
        // ML API returned an error with details
        error_log("ExtractDocumentTitles Error: " . $mlResponse['error']);
        return false;
    } elseif ($mlResponse === false) {
        error_log("ExtractDocumentTitles Error: processDocumentWithML returned false");
        return false;
    }
    
    // Check if response has required fields
    if (!isset($mlResponse['doc_id'])) {
        error_log("ExtractDocumentTitles Error: Missing doc_id in ML response");
        error_log("ExtractDocumentTitles Debug: ML response keys: " . implode(', ', array_keys($mlResponse)));
        return false;
    }
    
    if (!isset($mlResponse['titles']) || !is_array($mlResponse['titles'])) {
        error_log("ExtractDocumentTitles Error: Missing or invalid titles in ML response");
        error_log("ExtractDocumentTitles Debug: ML response: " . json_encode($mlResponse));
        return false;
    }

    // Format the response with sequential indexes
    $titles = [];
    $index = 0;
    foreach ($mlResponse['titles'] as $title) {
        $titles[] = ["index" => $index, "title" => $title];
        $index++;
    }

    error_log("ExtractDocumentTitles Debug: Successfully extracted " . count($titles) . " titles");
    error_log("ExtractDocumentTitles Debug: Doc ID: " . $mlResponse['doc_id']);

    return [
        'success' => true,
        'titles' => $titles,
        'doc_id' => $mlResponse['doc_id']
    ];
}

function callMLSlidesApi($documentId, $titlesArray)
{
    global $ML_BASE_URL;
    
    // $titlesArray should be an array of integers like [1, 6, 5]
    if (!is_array($titlesArray) || empty($titlesArray)) {
        $errorMsg = "Invalid title indexes provided";
        error_log("ML Slides API Error: " . $errorMsg);
        return ['error' => $errorMsg];
    }
    
    $mlApiUrl = $ML_BASE_URL . '/slides/' . $documentId;
    
    // Prepare the request data as JSON body
    $requestBody = json_encode(['titles' => $titlesArray]);
    

    // Make the GET request with JSON body (as per Postman collection)
    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL => $mlApiUrl,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST => 'GET', // Use GET method
        CURLOPT_POSTFIELDS => $requestBody, // But still send JSON body
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Accept: application/json'
        ],
        CURLOPT_TIMEOUT => 180, // 3 minutes timeout
        CURLOPT_SSL_VERIFYPEER => false, // For development
        CURLOPT_SSL_VERIFYHOST => false,  // For development
        CURLOPT_VERBOSE => true, // Enable verbose output for debugging
        CURLOPT_STDERR => fopen('php://temp', 'w+') // Capture verbose output
    ]);

    $response = curl_exec($curl);
    $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    $error = curl_error($curl);
    $totalTime = curl_getinfo($curl, CURLINFO_TOTAL_TIME);
    $info = curl_getinfo($curl);
    curl_close($curl);

    // Check for cURL errors
    if ($error) {
        $errorMsg = "cURL Error: " . $error;
        echo "<script>console.error('ML Slides API " . $errorMsg . "');</script>";
        error_log("ML Slides API " . $errorMsg);
        return ['error' => $errorMsg, 'curl_error' => $error];
    }

    // Check HTTP status code
    if ($httpCode !== 200) {
        $errorMsg = "HTTP Error: " . $httpCode . " - Response: " . $response;
        error_log("ML Slides API " . $errorMsg);
        return ['error' => $errorMsg, 'http_code' => $httpCode, 'response' => $response];
    }

    // Decode the response
    $decodedResponse = json_decode($response, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        $errorMsg = "JSON Decode Error: " . json_last_error_msg() . " - Response: " . $response;
        error_log("ML Slides API " . $errorMsg);
        return ['error' => $errorMsg, 'response' => $response];
    }

    error_log("ML Slides API Debug: Successfully generated " . count($decodedResponse['slides']) . " slides");
    return $decodedResponse;
}

function callMLPPTXApi($documentId, $slides, $mode = 'default')
{
    global $ML_BASE_URL;
    
    if (!$documentId || !$slides) {
        $errorMsg = "Document ID and slides are required";
        error_log("ML PPTX API Error: " . $errorMsg);
        return ['error' => $errorMsg];
    }
    
    // Determine the endpoint based on mode
    if ($mode === 'ga') {
        $mlApiUrl = $ML_BASE_URL . '/GA_generate_pptx/' . $documentId;
    } else {
        $mlApiUrl = $ML_BASE_URL . '/Defualt_generate_pptx/' . $documentId;
    }
    
    // Prepare the slides data as JSON body
    $requestBody = json_encode($slides);
    
    error_log("ML PPTX API Debug: Calling URL: " . $mlApiUrl);
    error_log("ML PPTX API Debug: Mode: " . $mode);
    error_log("ML PPTX API Debug: Slides count: " . count($slides));

    // Make the POST request
    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL => $mlApiUrl,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $requestBody,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Accept: application/octet-stream'
        ],
        CURLOPT_TIMEOUT => 300, // 5 minutes timeout for PPTX generation
        CURLOPT_SSL_VERIFYPEER => false, // For development
        CURLOPT_SSL_VERIFYHOST => false,  // For development
        CURLOPT_VERBOSE => true, // Enable verbose output for debugging
        CURLOPT_STDERR => fopen('php://temp', 'w+') // Capture verbose output
    ]);

    $response = curl_exec($curl);
    $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    $error = curl_error($curl);
    $totalTime = curl_getinfo($curl, CURLINFO_TOTAL_TIME);
    $info = curl_getinfo($curl);
    curl_close($curl);

    // Check for cURL errors
    if ($error) {
        $errorMsg = "cURL Error: " . $error;
        error_log("ML PPTX API " . $errorMsg);
        return ['error' => $errorMsg, 'curl_error' => $error];
    }

    // Check HTTP status code
    if ($httpCode !== 200) {
        $errorMsg = "HTTP Error: " . $httpCode . " - Response length: " . strlen($response);
        error_log("ML PPTX API " . $errorMsg);
        return ['error' => $errorMsg, 'http_code' => $httpCode];
    }

    // Check if response is empty
    if (empty($response)) {
        $errorMsg = "Empty response from ML API";
        error_log("ML PPTX API " . $errorMsg);
        return ['error' => $errorMsg];
    }

    // Generate filename based on mode and timestamp
    $timestamp = time();
    $filename = $mode === 'ga' ? "presentation_ga_{$timestamp}.pptx" : "presentation_{$timestamp}.pptx";

    error_log("ML PPTX API Debug: Successfully generated PPTX file: " . $filename);
    error_log("ML PPTX API Debug: Response size: " . strlen($response) . " bytes");

    return [
        'pptx_data' => base64_encode($response), // Encode as base64 for JSON transmission
        'filename' => $filename,
        'size' => strlen($response)
    ];
}



