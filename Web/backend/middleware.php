<?php
require_once 'api-headers.php';
session_start();


function isAuthenticated()
{
  return isset($_SESSION['user_id']);
}

function requireAuth()
{
  if (!isAuthenticated()) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
  }
}

function requireRole($role)
{
  if (!isAuthenticated() || $_SESSION['role'] !== $role) {
    http_response_code(403);
    echo json_encode(['error' => 'Forbidden']);
    exit;
  }
}

function validateCsrfToken($token)
{
  if (!isset($_SESSION['csrf_token']) || $_SESSION['csrf_token'] !== $token) {
    http_response_code(403);
    echo json_encode(['error' => 'Invalid CSRF token']);
    exit;
  }
}