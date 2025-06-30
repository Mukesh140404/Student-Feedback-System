document.addEventListener("DOMContentLoaded", () => {
  fetch("php_files/check_session.php")
    .then((res) => res.json())
    .then((data) => {
      if (data.mssg !== "authorized") {
        window.location.href = "loginPage.html";
      } else {
        localStorage.setItem("username", data.username);
      }
    });
});
function logout() {
  fetch("php_files/logout.php")
    .then((res) => res.text())
    .then((data) => {
      if (data === "logged out") {
        localStorage.clear();
        window.location.href = "loginPage.html";
      }
    });
}
