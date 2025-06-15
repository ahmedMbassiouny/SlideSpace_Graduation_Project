<?php

require_once '../api-headers.php'; 

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

session_start();

// Generate CSRF token if it doesn't exist
if (!isset($_SESSION['csrf_token'])) {
  $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

header("Content-Type: application/json");
echo json_encode([
  'csrf_token' => $_SESSION['csrf_token']
]);
