<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
include "db.php";
$conn = get_conn();  
date_default_timezone_set('Asia/Kolkata');
if(isset($_POST['username'])){
$full_name = $_POST['full_name'];
$username = $_POST['username'];
$email = $_POST['email'];
$contact = $_POST['contact'];
$password = $_POST['password'];
$gender = $_POST['gender'];
$dob = $_POST['dob'];
$created_at = date('Y-m-d H:i:s');

$sql = "INSERT INTO students (username,full_name, email ,contact,password,gender,dob,created_at) VALUES ('$username','$full_name', '$email','$contact','$password','$gender','$dob','$created_at')";
if ($conn->query($sql)) {
  echo "User added!";
} else {
  echo "Error: " . $conn->error;
}}
$conn->close();
?>