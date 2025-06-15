<?php
// ML API Configuration
// Update these values with your actual ML API credentials

// ML API Base URL - Replace with your actual ML API endpoint
$ML_BASE_URL = 'https://api.example.com/ml';

// ML API Key - Replace with your actual API key
$ML_API_KEY = 'your-api-key-here';

// ML API Endpoints
$ML_ENDPOINTS = [
    'health' => '/health',
    'extract_titles' => '/extract-titles',
    'generate_slides' => '/generate-slides'
];

// Timeout settings (in seconds)
$ML_TIMEOUTS = [
    'connection' => 10,
    'extract_titles' => 60,
    'generate_slides' => 120
];

// Retry settings
$ML_RETRY_ATTEMPTS = 3;
$ML_RETRY_DELAY = 2; // seconds

// Debug mode (set to true for detailed logging)
$ML_DEBUG_MODE = false;

// Allowed file types for ML processing
$ML_ALLOWED_FILE_TYPES = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

// Maximum file size for ML processing (in bytes) - 50MB
$ML_MAX_FILE_SIZE = 50 * 1024 * 1024;
?> 