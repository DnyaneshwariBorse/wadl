function toggleForm() {
  let form = document.getElementById("formContainer");
  form.style.display = form.style.display === "none" ? "flex" : "none";
}

// 1. Fetch initial tasks (Simulated API)
function fetchData() {
  let xhr = new XMLHttpRequest();
  // Using todos endpoint instead of users
  xhr.open("GET", "https://jsonplaceholder.typicode.com/todos?_limit=5");
  xhr.send();

  xhr.onload = function () {
    let tasks = JSON.parse(xhr.responseText).map((t) => ({
      id: t.id,
      title: t.title,
      dept: "General",
      completed: t.completed,
    }));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayData();
  };
}

// 2. Display Data in Table
function displayData() {
  let tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task, index) => {
    tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td style="${task.completed ? "text-decoration: line-through; color: gray;" : ""}">${task.title}</td>
                <td><span class="dept-tag">${task.dept}</span></td>
                <td>${task.completed ? "✓ Done" : "⏳ Pending"}</td>
                <td>
                    <button onclick="toggleStatus(${index})" style="cursor:pointer">Toggle</button>
                    <button onclick="deleteTask(${index})" style="cursor:pointer; color:red">Delete</button>
                </td>
            </tr>
        `;
  });
}

// 3. Add New Task (POST)
document.getElementById("submitBtn").addEventListener("click", function () {
  let title = document.getElementById("taskTitle").value;
  let dept = document.getElementById("taskDept").value || "General";

  let newTask = { title, dept, completed: false };

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "https://jsonplaceholder.typicode.com/todos");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(newTask));

  xhr.onload = function () {
    if (xhr.status === 201) {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.unshift(newTask);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayData();
      document.getElementById("taskTitle").value = "";
      toggleForm();
    }
  };
});

// 4. Delete Task
function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayData();
}

// 5. Update Task Status
function toggleStatus(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayData();
}

// Initial load
fetchData();
