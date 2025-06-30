<?php 
header("Content-Type: application/json");
include "db.php";
$conn = get_conn();
$student = isset($_POST['student']) ? $_POST['student'] : '';
$faculty = isset($_POST['faculty']) ? $_POST['faculty'] : '';

$sql = "SELECT * FROM all_feedback";
$conditions = [];

if (!empty($student)) {
    $conditions[] = "username = '$student'";
}
if (!empty($faculty)) {
    $conditions[] = "faculty_name = '$faculty'";
}

if (!empty($conditions)) {
    $sql .= " WHERE " . implode(" AND ", $conditions);
}

$result = $conn->query($sql);

$users = [];

while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

echo json_encode($users);
?>