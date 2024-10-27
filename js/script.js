const taskList = document.getElementById("task-list");
const taskInput = document.getElementById("new-task");
const submit = document.getElementById("submit");
const error = document.getElementById("error");
const count = document.getElementById("counter");
const all = document.getElementById("all");
const completed = document.getElementById("completed");
const active = document.getElementById("active");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks("all");

function renderTasks(filter = "all") {
  taskList.innerHTML = "";

  let visibleTasks = [];
  if (filter === "all") {
    visibleTasks = tasks;
  }

  if (filter === "active") {
    tasks.forEach((task, _) => {
      if (!task.completed) {
        visibleTasks.push(task);
      }
    });
  }

  if (filter === "completed") {
    tasks.forEach((task, _) => {
      if (task.completed) {
        visibleTasks.push(task);
      }
    });
  }

  visibleTasks.forEach((task, index) => {
    const li = document.createElement("li");
    let checkedValue = "";
    if (task.completed) {
      checkedValue = "checked";
    }

    li.innerHTML = `
            <input type="checkbox" id="cbox-${index}" class="cbox-completed" data-index="${index}" ${checkedValue}/>
            <label for="cbox-${index}">  ${task.text} </label>
            <i class="material-icons" data-index="${index}">delete</i>
            `;

    li.className = "";
    if (task.completed) {
      li.className = "completed";
    }

    /// <button class="toggle-task" data-index="${index}">Done</button>
    taskList.appendChild(li);
  });
  counter();
}

submit.addEventListener("click", function (event) {
  event.preventDefault();

  const newTask = taskInput.value;

  if (newTask === "" || newTask.length < 2) {
    error.textContent =
      "Invalid input. Empty input or length less than 3 not allowed";
      taskInput.classList.add("error");
    return;
  }

  tasks.push({ text: newTask, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  error.textContent = "";
  taskInput.value = "";
  /// taskInput.classList.remove("error")

  renderTasks();
});

taskList.addEventListener("click", function (event) {
    if (event.target.classList.contains("material-icons")) {
        const index = event.target.getAttribute("data-index");
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }

  if (event.target.classList.contains("cbox-completed")) {
    const index = event.target.getAttribute("data-index");
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }
});

function counter() {
  let numItems = 0;
  tasks.forEach((task, _) => {
    if (!task.completed) {
      numItems++;
    }
  });

  count.textContent = `${numItems} tasks remaining to be done.`;
}

all.addEventListener("click", function () {
  renderTasks("all");
});

active.addEventListener("click", function () {
  renderTasks("active");
});

completed.addEventListener("click", function () {
   renderTasks("completed");
 });

