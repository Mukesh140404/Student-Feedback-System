<?php
include "db.php";

// Table creation SQL
$sql = "CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    contact VARCHAR(20),
    password VARCHAR(100),
    gender CHAR(1),
    dob DATE
)";

if ($conn->query($sql) === TRUE) {
    echo "✅ Table 'students' created successfully!";
} else {
    echo "❌ Error creating table: ";
}

$conn->close();
?>