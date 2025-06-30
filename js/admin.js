document.addEventListener("DOMContentLoaded", function () {
  loadFaculty();
  loadStudents();
  loadFeedbacks();
});

function loadFaculty() {
  fetch("php_files/fetch_faculty.php")
    .then((res) => res.json())
    .then((data) => {
      buildFacultyAccordion(data.users);
      facilty_count(data.count);
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
    .catch((err) => console.error("Fetch error:", err));
}

function loadStudents() {
  fetch("php_files/fetch_students.php")
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.students);
      buildStudentsAccordion(data.students);
      students_count(data.count);
      const select = document.getElementById("studentOption");
      if (Array.isArray(data.students) && data.students.length > 0) {
        data.students.forEach((name) => {
          const option = document.createElement("option");
          option.value = name.username;
          option.textContent = name.full_name;
          select.appendChild(option);
        });
      } else {
        const option = document.createElement("option");
        option.disabled = true;
        option.textContent = "No student found";
        select.appendChild(option);
      }
    })
    .catch((err) => console.error("fetch error:", err));
}
function loadFeedbacks() {
  fetch("php_files/fetch_All_feedbacks.php", {})
    .then((res) => res.json())
    .then((rows) => {
      buildfeedback(rows.users);
      feedbacks_count(rows.count);
    })
    .catch((err) => console.error("error:".err));
}

function buildStudentsAccordion(users) {
  const wrap = document.getElementById("accordionstudent");
  wrap.innerHTML = "";

  users.forEach((user, index) => {
    const collapseId = `collapse-${index}`;
    const headingId = `heading-${index}`;
    const displayName = user.full_name || user.username || `User ${index + 1}`;
    const imagePath = user.image
      ? `uploads/${user.image}`
      : "uploads/default.png";
    const item = document.createElement("div");
    item.className = "accordion-item mb-2";

    item.innerHTML = `
      <h2 class="accordion-header d-flex" id="${headingId}">
        <button class="accordion-button collapsed flex-grow-1"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#${collapseId}"
                aria-expanded="false"
                aria-controls="${collapseId}">
          ${displayName}
        </button>
        <button type="button" class="s_cut btn btn-link px-2" title="Remove" data-id="${
          user.id
        }">
          <i class="fa-solid fa-xmark fs-5"></i>
        </button>
      </h2>

      <div id="${collapseId}" class="accordion-collapse collapse"
           aria-labelledby="${headingId}" data-bs-parent="#userAccordion">
        <div class="accordion-body d-flex gap-3 row">
          <img src="${imagePath}" alt="${displayName}" class="rounded col-8 col-md-4" width="80" height="80" style="object-fit: cover;">
          <div class="col-8 col-md-8">
            <strong>Email:</strong> ${user.email || "N/A"}<br>
            <strong>Contact:</strong> ${user.contact || "N/A"}<br>
            <strong>Gender:</strong> ${user.gender || "N/A"}<br>
            <strong>DOB:</strong> ${user.DOB || "N/A"}<br>
            <strong>Created At:</strong> ${user.created_at || "N/A"}<br>
            <strong>Description:</strong> ${user.description || "Not Provided"}
          </div>
        </div>
      </div>
    `;

    wrap.appendChild(item);
  });
}

function buildFacultyAccordion(rows) {
  const wrap = document.getElementById("accordionfaculty");
  wrap.innerHTML = "";

  rows.forEach((row) => {
    const collapseId = `collapse-${row.id}`;
    const headingId = `heading-${row.id}`;

    const item = document.createElement("div");
    item.className = "accordion-item mb-2";

    item.innerHTML = `
      <h2 class="accordion-header d-flex" id="${headingId}">
        <button class="accordion-button collapsed flex-grow-1 text-capitalize"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#${collapseId}"
                aria-expanded="false"
                aria-controls="${collapseId}">
          ${row.f_name}
        </button>

        <!-- ❌ Cut button -->
        <button type="button" class="cut btn btn-link px-2"
                title="Remove" data-id="${row.id}">
          <i class="fa-solid fa-xmark fs-5"></i>
        </button>
      </h2>

      <div id="${collapseId}" class="accordion-collapse collapse"
           aria-labelledby="${headingId}" data-bs-parent="#facultyAccordion">
        <div class="accordion-body">
          <strong>${row.f_description}</strong><br>
          Contact : <a href="tel:${row.contact}">${row.contact}</a><br>
          Added   : ${row.added_at}
        </div>
      </div>
    `;
    wrap.appendChild(item);
  });
}
function buildfeedback(rows) {
  const tableBody = document.querySelector("#feedbackTable tbody");
  tableBody.innerHTML = "";

  rows.forEach((item) => {
    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${item.username}</td>
    <td>${item.faculty_name}</td>
    <td>
      <button class="btn btn-sm btn-primary" onclick="handleAction('${item.id}')">
        View
      </button>
    </td>
  `;

    tableBody.appendChild(row);
  });
}
function handleAction(id) {
  const myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
  myModal.show();

  document.querySelector(".modal-title").innerText = "Loading...";
  document.querySelector(".modal-body").innerHTML = "Fetching details...";

  fetch("php_files/fetch_feedback.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "id=" + encodeURIComponent(id),
  })
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(
        ".modal-title"
      ).innerText = `${data.users.username} - ${data.users.faculty_name}`;
      let rate = ["very poor", "poor", "Average", "good", "excellent"];
      let [Q1, Q2, Q3, Q4, Q5, Q6] = data.users.QR.split("");

      document.querySelector(".modal-body").innerHTML = `
        <p><strong>1. How clearly does the teacher explain the
                          subject?</strong><br>${rate[Q1]}</p>
        <p><strong>2. How effectively does the teacher generate interest
                          in the subject?</strong> <br>${rate[Q2]}</p>
        <p><strong>3. How relevant and updated is the course
                          content?</strong> <br>${rate[Q3]}</p>
        <p><strong>4. How well-equipped are the classrooms and
                          laboratories?</strong> <br>${rate[Q4]}</p>
        <p><strong>5. How punctual is the teacher in attending
                          classes?</strong> <br>${rate[Q5]}</p>
        <p><strong>6. How well does the teacher use examples or case
                          studies to explain concepts?</strong><br> ${rate[Q6]}</p>
        <p><strong>7. What improvements would you like to suggest for
                          the institution?</strong> <br>${data.users.Q7}</p>
        <p><strong>8. Any specific comments or appreciation for
                          faculty member?</strong> <br>${data.users.Q8}</p>
        <p>(${data.users.date} - ${data.users.time})</p>
      `;
    })
    .catch((err) => {
      console.error("Error loading feedback:", err);
      document.querySelector(".modal-title").innerText = "Error";
      document.querySelector(".modal-body").innerText =
        "Failed to load feedback.";
    });
}
function facilty_count(count) {
  let f_count = count.toString().padStart(2, "0");
  document.getElementById("facultyCount").innerText = f_count;
}
function students_count(count) {
  let s_count = count.toString().padStart(2, "0");
  document.getElementById("studentCount").innerText = s_count;
}
function feedbacks_count(count) {
  let fb_count = count.toString().padStart(2, "0");
  document.getElementById("feedbackCount").innerText = fb_count;
}

document.addEventListener("click", (e) => {
  const cutBtn = e.target.closest(".cut");
  if (!cutBtn) return;

  const id = cutBtn.dataset.id;
  const item = cutBtn.closest(".accordion-item");

  fetch("php_files/del_faculty.php", {
    method: "POST",
    body: new URLSearchParams({ id: id }),
  })
    .then((res) => res.text())
    .then((data) => {
      console.log(data);
      if (item) item.remove(); 
    })
    .catch((err) => {
      console.error("Delete error:", err);
      alert("Something went wrong.");
    });
});
document.addEventListener("click", (e) => {
  const cutBtn = e.target.closest(".s_cut");
  if (!cutBtn) return;

  const id = cutBtn.dataset.id;
  const item = cutBtn.closest(".accordion-item");

  fetch("php_files/del_student.php", {
    method: "POST",
    body: new URLSearchParams({ id: id }),
  })
    .then((res) => res.text())
    .then((data) => {
      console.log(data);
      if (item) item.remove(); 
    })
    .catch((err) => {
      console.error("Delete error:", err);
      alert("Something went wrong.");
    });
});
function add_faculty() {
  let f_name = document.getElementById("f_name").value;
  let f_description = document.getElementById("f_description").value;
  let f_contact = document.getElementById("f_contact").value;

  let formdata = new FormData();
  formdata.append("f_name", f_name);
  formdata.append("f_description", f_description);
  formdata.append("f_contact", f_contact);

  fetch("php_files/add_faculty.php", {
    method: "POST",
    body: formdata,
  })
    .then((res) => res.text())
    .then((data) => {
      alert(data);
      loadFaculty();
      document.getElementById("f_name").value = "";
      document.getElementById("f_description").value = "";
      document.getElementById("f_contact").value = "";
    });
}
function apply_filter() {
  const faculty = document.getElementById("facultyOption").value;
  const student = document.getElementById("studentOption").value;

  const formdata = new FormData();

  if (student && student !== "Select") {
    formdata.append("student", student);
  }
  if (faculty && faculty !== "Select") {
    formdata.append("faculty", faculty);
  }

  fetch("php_files/get_feedback.php", {
    method: "POST",
    body: formdata,
  })
    .then((res) => res.json())
    .then((data) => {
      buildfeedback(data);
    })
    .catch((err) => console.log("error:", err));
}
