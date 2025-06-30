<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include "db.php";
$conn = get_conn();  
if(isset($_POST['username'])){
$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];
$sql = "INSERT INTO login_users (username, email ,password) VALUES ('$username', '$email','$password')";
$conn->query($sql);
$conn->close();
}
?>