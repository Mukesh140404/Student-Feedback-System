document.addEventListener("DOMContentLoaded", () => {
  localStorage.clear();
  if (!window.location.hash.includes("#reloaded")) {
    window.location.href = window.location.href + "#reloaded";
    window.location.reload(true);
  }
});
function fetchUsers() {
  let email = document.getElementById("login_email").value;
  let password = document.getElementById("login_password").value;

  fetch("php_files/loginpage.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(
      password
    )}`,
  })
    .then((res) => res.text())
    .then((data) => {
      if (data === "admin") {
        window.location.href = "adminDashboard.html";
      } else if (data === "student") {
        fetch("php_files/get_user.php")
          .then((res) => res.text())
          .then((uname) => {
            localStorage.setItem("username", uname);
            window.location.href = "studentDashboard.html";
          });
      } else {
        alert("Invalid email or password");
      }
    })
    .catch((err) => console.error("Login Error:", err));
}
