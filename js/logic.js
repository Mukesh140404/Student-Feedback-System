let loginbox = document.getElementById("login");
let signupbox = document.getElementById("signup");

function switch_to_signup() {
  loginbox.classList.add("d-none");
  signupbox.classList.remove("d-none");
}

function register_btn_click() {
  let full_name = document.getElementById("full_name").value;
  let username = document.getElementById("username").value;
  let email = document.getElementById("email").value;
  let contact = document.getElementById("contact").value;
  let password = document.getElementById("password").value;
  let genderInput = document.querySelector('input[name="gender"]:checked');
  let gender = genderInput ? genderInput.value : null;
  let dob = document.getElementById("dob").value;

  let formData = new FormData();
  formData.append("full_name", full_name);
  formData.append("username", username);
  formData.append("email", email);
  formData.append("contact", contact);
  formData.append("password", password);
  formData.append("gender", gender);
  formData.append("dob", dob);

  let formData2 = new FormData();
  formData2.append("username", username);
  formData2.append("email", email);
  formData2.append("password", password);

  fetch("php_files/insert_user.php", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.text())
    .then((data) => {
      console.log("Server Response: ", data);
      alert(data);
      document.getElementById("full_name").value = "";
      document.getElementById("username").value = "";
      document.getElementById("email").value = "";
      document.getElementById("contact").value = "";
      document.getElementById("password").value = "";
      document.getElementById("dob").value = "";
      let genderRadios = document.getElementsByName("gender");
      genderRadios.forEach((radio) => (radio.checked = false));
      switch_to_login();
    })
    .catch((error) => {
      alert("server error");
    });

  fetch("php_files/insert_login.php", {
    method: "POST",
    body: formData2,
  })
    .then((res) => res.text())
    .then((data) => {
      console.log(data);
    });
}
function switch_to_login() {
  signupbox.classList.add("d-none");
  loginbox.classList.remove("d-none");
}
