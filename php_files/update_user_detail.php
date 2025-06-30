<?php
include "db.php";
$conn = get_conn();
date_default_timezone_set('Asia/Kolkata');
if(isset($_POST['full_name'])){
$full_name = $_POST['full_name'];
$username = $_POST['username'];
$email = $_POST['email'];
$contact = $_POST['contact'];
$description = $_POST['description'];
$gender = $_POST['gender'];
$last_update = date('Y-m-d H:i:s');
$image = "";
if (isset($_FILES['formFile']) && $_FILES['formFile']['error'] === 0) {
    $get_old_image = "SELECT image FROM students WHERE username = '$username'";
    $res = $conn->query($get_old_image);
    $old_image = "";
    if ($res && $res->num_rows > 0) {
        $row = $res->fetch_assoc();
        $old_image = $row['image'];
    }
    if (!empty($old_image) && file_exists("../uploads/" . $old_image)) {
        unlink("../uploads/" . $old_image);
    }
    $image = $_FILES['formFile']['name'];
    move_uploaded_file($_FILES['formFile']['tmp_name'], '../uploads/' . $image);
}
$dob = $_POST['dob'];

$sql1 = "UPDATE students SET 
          full_name = '$full_name',
          email = '$email',
          contact = '$contact',
          last_update = '$last_update',
          description = '$description',
          gender = '$gender',
          dob = '$dob'";

if (!empty($image)) {
    $sql1 .= ", image = '$image'";
}

$sql1 .= " WHERE username = '$username'";
$sql2 = "update login_users set
            email = '$email'";
$sql2 .= " WHERE username = '$username'";

if($conn->query($sql1)&& $conn->query($sql2) ){
    echo "update successfull!!";
}else{
    echo "server error!!";
}
}
$conn->close();
?>