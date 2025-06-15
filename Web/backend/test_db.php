<?php
require_once 'config/db.php';

// Test database connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "Database connection successful!\n";

// Check if presentations_content table exists
$result = $conn->query("SHOW TABLES LIKE 'presentations_content'");
if ($result->num_rows > 0) {
    echo "presentations_content table exists!\n";
    
    // Show table structure
    $structure = $conn->query("DESCRIBE presentations_content");
    echo "Table structure:\n";
    while ($row = $structure->fetch_assoc()) {
        echo "- " . $row['Field'] . " (" . $row['Type'] . ")\n";
    }
} else {
    echo "presentations_content table does not exist!\n";
}

// Check if documents table exists
$result = $conn->query("SHOW TABLES LIKE 'documents'");
if ($result->num_rows > 0) {
    echo "documents table exists!\n";
} else {
    echo "documents table does not exist!\n";
}

$conn->close();
?> 