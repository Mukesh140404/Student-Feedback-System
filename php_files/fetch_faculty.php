<?php 
header("Content-Type: application/json");
include "db.php";
$conn = get_conn();

$sql = "SELECT * FROM faculty;";
$result = $conn->query($sql);

$users = [];

while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}
$response = [
    "count" => count($users),
    "users" => $users
];

echo json_encode($response);
?>