let username = localStorage.getItem("username");
document.addEventListener("DOMContentLoaded", () => {
  alert(username);
  attachTabEvents_sb();
  attachTabEvents_oc();
  loadHomeData();
  loadFaculty();
});

function attachTabEvents_sb() {
  const map = [
    { id: "v-pills-home-tab-sb", fn: loadHomeData },
    { id: "v-pills-profile-tab-sb", fn: loadProfileForm },
  ];

  map.forEach(({ id, fn }) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("shown.bs.tab", fn);
    }
  });
}
function attachTabEvents_oc() {
  const map = [
    { id: "v-pills-home-tab-oc", fn: loadHomeData },
    { id: "v-pills-profile-tab-oc", fn: loadProfileForm },
  ];

  map.forEach(({ id, fn }) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("shown.bs.tab", fn);
    }
  });
}

function loadHomeData() {
  fetch("php_files/StudentData.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "username=" + encodeURIComponent(username),
  })
    .then((r) => r.json())
    .then((data) => {
      document.getElementById("student_name").innerText = data.full_name;
      document.getElementById("desc").innerText = data.description;
      const img_sb = document.getElementById("img_block_sb");
      const img_oc = document.getElementById("img_block_oc");
      if (img_sb && data.image) {
        img_sb.style.backgroundImage = `url('uploads/${data.image}')`;
        img_oc.style.backgroundImage = `url('uploads/${data.image}')`;
      } else {
        img_sb.style.backgroundImage = `url('uploads/images.png')`;
        img_oc.style.backgroundImage = `url('uploads/images.png')`;
      }
    })
    .catch(console.error);
}

function loadProfileForm() {
  fetch("php_files/StudentData.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "username=" + encodeURIComponent(username),
  })
    .then((r) => r.json())
    .then((data) => {
      document.getElementById("full_name").value = data.full_name;
      document.getElementById("email").value = data.email;
      document.getElementById("contact").value = data.contact;
      document.getElementById("dob").value = data.dob;
      document.getElementById("description").value = data.description;
      const genderVal = (data.gender || "").toLowerCase();
      const genderRadio = document.querySelector(
        `input[name="up_gender"][value="${genderVal}"]`
      );
      if (genderRadio) genderRadio.checked = true;

      if (data.image) {
        document.getElementById(
          "img_block_sb"
        ).style.backgroundImage = `url('uploads/${data.image}')`;
        document.getElementById(
          "img_block_oc"
        ).style.backgroundImage = `url('uploads/${data.image}')`;
      }
    })
    .catch(console.error);
}

function update_profile() {
  let full_name = document.getElementById("full_name").value;
  let email = document.getElementById("email").value;
  let contact = document.getElementById("contact").value;
  let formFileInput = document.getElementById("formFile");
  let formFile = formFileInput.files.length > 0 ? formFileInput.files[0] : null;
  let description = document.getElementById("description").value;
  let genderInput = document.querySelector('input[name="up_gender"]:checked');
  let gender = genderInput ? genderInput.value.charAt(0).toUpperCase() : "";
  let dob = document.getElementById("dob").value;
  let formdata = new FormData();
  formdata.append("full_name", full_name);
  formdata.append("username", username);
  formdata.append("email", email);
  formdata.append("contact", contact);
  formdata.append("formFile", formFile);
  formdata.append("description", description);
  formdata.append("gender", gender);
  formdata.append("dob", dob);
  fetch("php_files/update_user_detail.php", {
    method: "POST",
    body: formdata,
  })
    .then((res) => res.text())
    .then((data) => {
      alert(data);
      console.log(data);
      if (data.toLowerCase().includes("update success")) {
        if (formFile) {
          const newImageURL = "../uploads/" + formFile.name;
          document.getElementById(
            "img_block_oc"
          ).style.backgroundImage = `url('${newImageURL}')`;
          document.getElementById(
            "img_block_sb"
          ).style.backgroundImage = `url('${newImageURL}')`;
        }
      }
      document.getElementById("full_name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("contact").value = "";
      document.getElementById("formFile").value = "";
      document.getElementById("description").value = "";
      document.getElementById("dob").value = "";
      const genderInputs = document.querySelectorAll('input[name="up_gender"]');
      genderInputs.forEach((input) => (input.checked = false));
    });
}
function update_password() {
  let old_pass = document.getElementById("inputOldPassword").value;
  let new_pass = document.getElementById("inputNewPassword").value;
  let C_new_pass = document.getElementById("inputConNewPassword").value;
  let formdata = new FormData();
  formdata.append("username", username);
  formdata.append("old_pass", old_pass);
  formdata.append("new_pass", new_pass);
  formdata.append("C_new_pass", C_new_pass);
  if (!old_pass || !new_pass || !C_new_pass) {
    alert("Please fill all three password fields.");
    return;
  }
  fetch("php_files/update_user_password.php", {
    method: "POST",
    body: formdata,
  })
    .then((res) => res.text())
    .then((data) => {
      alert(data);
      document.getElementById("inputOldPassword").value = "";
      document.getElementById("inputNewPassword").value = "";
      document.getElementById("inputConNewPassword").value = "";
    });
}

function loadFaculty() {
  fetch("php_files/fetch_faculty.php")
    .then((res) => res.json())
    .then((data) => {
      const select = document.getElementById("facultyOption");
      if (Array.isArray(data.users) && data.users.length > 0) {
        data.users.forEach((name) => {
          const option = document.createElement("option");
          option.value = name.f_name;
          option.textContent = name.f_name;
          select.appendChild(option);
        });
      } else {
        const option = document.createElement("option");
        option.disabled = true;
        option.textContent = "No faculty found";
        select.appendChild(option);
      }
    })
    .catch((error) => {
      console.error("Error loading faculty:", error);
      const option = document.createElement("option");
      option.disabled = true;
      option.textContent = "Error loading faculty";
      select.appendChild(option);
    });
}
function set_feedback() {
  const selected_faculty = document.getElementById("facultyOption").value;
  const q1 = document.querySelector('input[name="q1"]:checked').value;
  const q2 = document.querySelector('input[name="q2"]:checked').value;
  const q3 = document.querySelector('input[name="q3"]:checked').value;
  const q4 = document.querySelector('input[name="q4"]:checked').value;
  const q5 = document.querySelector('input[name="q5"]:checked').value;
  const q6 = document.querySelector('input[name="q6"]:checked').value;
  const q7 = document.getElementById("suggestions").value;
  const q8 = document.getElementById("comments").value;
  const QR = q1 + q2 + q3 + q4 + q5 + q6;

  let formdata = new FormData();
  formdata.append("username", username);
  formdata.append("selected_faculty", selected_faculty);
  formdata.append("QR", QR);
  formdata.append("q7", q7);
  formdata.append("q8", q8);

  fetch("php_files/set_feedback.php", {
    method: "POST",
    body: formdata,
  })
    .then((res) => res.text())
    .then((data) => {
      alert(data);
      document.getElementById("facultyOption").selectedIndex = 0;

      // Clear radio buttons (q1 to q6)
      ["q1", "q2", "q3", "q4", "q5", "q6"].forEach((name) => {
        const selected = document.querySelector(
          `input[name="${name}"]:checked`
        );
        if (selected) selected.checked = false;
      });

      // Clear suggestions and comments
      document.getElementById("suggestions").value = "";
      document.getElementById("comments").value = "";
    });
}
