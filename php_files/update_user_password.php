<?php 
include "db.php";
$conn = get_conn();
if (isset($_POST['old_pass'])) {
    $username = $_POST['username'];
    $old_pass = $_POST['old_pass'];
    $new_pass = $_POST['new_pass'];
    $C_new_pass = $_POST['C_new_pass'];
    $sql1 = "SELECT password FROM students WHERE username = '$username'";
    $result = $conn->query($sql1);
    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $current_pass = $row['password'];
        if ($old_pass === $current_pass) {
            if ($new_pass === $C_new_pass) {
                $sql2 = "UPDATE students SET password = '$new_pass' WHERE username = '$username'";
                $sql3 = "UPDATE login_users SET password = '$new_pass' WHERE username = '$username'";
                if ($conn->query($sql2) && $conn->query($sql3)) {
                    echo "Password update successful!";
                } else {
                    echo "Server error during update!";
                }
            } else {
                echo "Confirm password must match new password.";
            }
        } else {
            echo "Old password is incorrect.";
        }
    } else {
        echo "User not found.";
    }
}
$conn->close();
?>