<?php 
include "db.php";
date_default_timezone_set('Asia/Kolkata');
$conn = get_conn();
$username = $_POST['username'];
$selected_faculty = $_POST['selected_faculty'];
$QR = $_POST['QR'];
$q7 = $_POST['q7'];
$q8 = $_POST['q8'];
$date = date("Y-m-d");
$time = date("H:i:s");

$sql = "insert into all_feedback (username,faculty_name,QR,Q7,Q8,date,time) values ('$username','$selected_faculty','$QR','$q7','$q8','$date','$time');";
if($conn->query($sql)){
    echo "feedback submitted";
}else{
    echo "server error!!";
}
$conn->close();
?>