<?php
require_once '../models/user.php';
require_once '../middleware.php';

$requestMethod = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? null;

// Route the request
if ($requestMethod === 'POST' && $action === 'login') {
  loginUser();
} elseif ($requestMethod === 'POST' && $action === 'register') {
  registerUser();
} elseif ($requestMethod === 'POST' && $action === 'logout') {
  logoutUser();
} elseif ($requestMethod === 'GET' && $action === 'admin') {
  admin();
} elseif ($requestMethod === 'GET' && $action === 'user') {
  user();
} else {
  http_response_code(405);
  echo json_encode(["status" => "error", "message" => "Invalid request method"]);
  exit();
}


function loginUser()
{
  $data = json_decode(file_get_contents("php://input"), true);

  $csrfHeader = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
  validateCsrfToken($csrfHeader);

  $email = $data['email'] ?? '';
  $password = $data['password'] ?? '';

  $userModel = new User();
  $user = $userModel->findByEmail($email);

  if ($user && password_verify($password, $user['password'])) {
    session_regenerate_id(true); // Prevent session fixation
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['role'] = $user['role'];
    $_SESSION['name'] = $user['name'];

    echo json_encode([
      'status' => 'success',
      'message' => 'Login successful',
      'user' => [
        'id' => $user['id'],
        'name' => $user['name'],
        'role' => $user['role']
      ]
    ]);
  } else {
    // http_response_code(401);
    echo json_encode(['status' => 'error', 'error' => 'Invalid credentials']);
  }
}


function registerUser()
{
  $data = json_decode(file_get_contents("php://input"), true);

  $csrfHeader = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? '';
  validateCsrfToken($csrfHeader);

  $name = trim($data["name"] ?? "");
  $email = trim($data["email"] ?? "");
  $password = $data["password"] ?? "";
  $password = password_hash($password, PASSWORD_BCRYPT);

  $userModel = new User();
  $user = $userModel->findByEmail($email);

  if (empty($name) || empty($email) || empty($password)) {
    echo json_encode(["status" => "error", "message" => "All fields are required"]);
    exit();
  }

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["status" => "error", "message" => "Invalid email format"]);
    exit();
  }

  if ($user) {
    echo json_encode(["status" => "error", "message" => "Email already exists"]);
    exit();
  }


  if ($userModel->register($name, $email, $password)) {
    echo json_encode(["status" => "success", "message" => "Registration successful"]);
  } else {
    echo json_encode(["status" => "error", "message" => "Registration failed"]);
  }
}


function admin()
{
  requireRole('admin');

  echo json_encode([
    'message' => 'Hello, admin!',
    'admin' => $_SESSION['name']
  ]);
}


function user()
{
  requireAuth();

  echo json_encode([
    'message' => "Hello, {$_SESSION['name']}!",
    'user' => [
      'id' => $_SESSION['user_id'],
      'name' => $_SESSION['name'],
      'role' => $_SESSION['role']
    ]
  ]);
}


function logoutUser()
{
  session_start();
  session_unset();
  session_destroy();
  echo json_encode(['status' => 'success', 'message' => 'Logged out']);
}
