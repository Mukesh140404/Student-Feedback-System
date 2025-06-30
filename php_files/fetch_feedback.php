<?php 
header("Content-Type: application/json");
include "db.php";
$conn = get_conn();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id'])) {
    $id = $_POST['id'];
    $sql = "SELECT * FROM all_feedback WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();
        echo json_encode(["users" => $row]);
    } else {
        echo json_encode(["error" => "No feedback found"]);
    }
}
$conn->close();
?>