<?php 
include "db.php";
$conn = get_conn();
date_default_timezone_set('Asia/Kolkata');
if(isset($_POST['f_name'])){
    $f_name = $_POST['f_name'];
    $f_description = $_POST['f_description'];
    $f_contact = $_POST['f_contact'];
    $added_at = date('Y-m-d H:i:s');
    $sql = "insert into faculty (f_name,f_description,contact,added_at) values ('$f_name','$f_description','$f_contact','$added_at');";
    if($conn->query($sql)){
        echo "faculty add successfull!!";
    }else{
        echo "server error!!";
    }
}
?>