<?php 
session_start();
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
header("Expires: 0");
include "db.php";
$conn = get_conn();
if (isset($_POST['username'])){
    $username = $_POST['username'];
    $sql = "select * from students where username = '$username'";
    $result = $conn->query($sql);
    if($result && $result->num_rows>0){
        $data = $result->fetch_assoc();
        echo json_encode($data);
    } else {
        echo json_encode(["error" => "No student found"]);
    }
}
 else {
        echo json_encode(["error" => "Username not provided"]);
    }
?>