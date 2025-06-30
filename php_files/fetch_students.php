<?php 
header("Content-Type: application/json");
include "db.php";
$conn = get_conn();

$sql = "SELECT * FROM students;";
$result = $conn->query($sql);

$users = [];

while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}
$response = [
    "count" => count($users),
    "students" => $users
];

echo json_encode($response);
?>