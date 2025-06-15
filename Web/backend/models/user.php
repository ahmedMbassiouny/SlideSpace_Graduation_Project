<?php
require_once __DIR__ . '/../config/db.php';

class User
{
  public function findByEmail($email)
  {
    global $conn;

    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    if (!$stmt) {
      die("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("s", $email);
    $stmt->execute();

    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    $stmt->close();

    return $user;
  }

  public function register($name, $email, $hashedPassword)
  {
    global $conn;
    $stmt = $conn->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'user')");
    $stmt->bind_param("sss", $name, $email, $hashedPassword);
    return $stmt->execute();
  }
}
