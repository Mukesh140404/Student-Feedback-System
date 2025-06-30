<?php 
function get_conn(){
    $server = "localhost";
    $user = "root";
    $password= "";
    $dbname = "studentdb";

    $conn = new mysqli($server,$user,$password,$dbname);
    if($conn->connect_error){
        die("Error Occured".$conn->connect_error);
    } 
    return $conn;
}
?>