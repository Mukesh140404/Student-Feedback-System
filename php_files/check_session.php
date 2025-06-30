<?php
session_start();
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
header("Expires: 0");
if (!isset($_SESSION['loggedin'])) {
    echo "unauthorized";
    exit;
} else {
    $data = [
        "username" => $_SESSION['username']??"guest",
        "mssg" => "authorized"
    ];
    echo json_encode($data);
}
?>