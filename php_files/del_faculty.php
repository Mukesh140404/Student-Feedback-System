<?php
header("Content-Type: application/json");
include "db.php";

$conn = get_conn();

if (isset($_POST['id'])) {
    $id = intval($_POST['id']);
    $sql = "DELETE FROM faculty WHERE id = '$id'";
    if($conn->query($sql)){
        echo "delete successfully";
    }else{
        echo "server error!";
    }
} else {
    echo "no valid id!";
}