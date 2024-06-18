document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const taskInput = document.querySelector(".input-field");
  const taskList = document.querySelector("ul.task-list");

  // Load tasks from local storage on page load
  loadTasks();

  // Event listener for form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (taskInput.value.trim() !== "") {
      addTask(taskInput.value);
      taskInput.value = ""; // Clear task input field
      saveTasks(); // Save tasks to local storage
    }
  });

  // Event listener for task list changes (checkboxes)
  taskList.addEventListener("change", function (event) {
    if (event.target.classList.contains("check-btn")) {
      toggleTaskCompletion(event.target);
      saveTasks(); // Save tasks to local storage
    }
  });

  // Function to add a new task to the task list
  function addTask(taskText) {
    const newTaskItem = document.createElement("li");
    newTaskItem.className = "task";
    newTaskItem.innerHTML = `
      <input class="check-btn" type="checkbox">
      <span>${taskText}</span>
      <div class="right-style">
        <span class="task-done">&#10004 Completed</span>
        <button class="delete-btn"><span class="material-symbols-outlined">delete</span></button>
      </div>`;
    
    newTaskItem.querySelector(".delete-btn").addEventListener("click", function () {
      newTaskItem.remove();
      saveTasks(); // Save tasks to local storage
    });

    taskList.appendChild(newTaskItem);
  }

  // Function to toggle task completion status
  function toggleTaskCompletion(checkbox) {
    const listItem = checkbox.closest(".task");
    const taskText = listItem.querySelector("span");
    const taskDone = listItem.querySelector(".task-done");

    if (checkbox.checked) {
      taskText.style.textDecoration = "line-through";
      taskDone.style.display = "block";
    } else {
      taskText.style.textDecoration = "none";
      taskDone.style.display = "none";
    }
  }

  // Function to save tasks to local storage
  function saveTasks() {
    window.localStorage.setItem("taskList", taskList.innerHTML);
  }

  // Function to load tasks from local storage
  function loadTasks() {
    const savedTasks = window.localStorage.getItem("taskList");
    if (savedTasks) {
      taskList.innerHTML = savedTasks;
      taskList.querySelectorAll(".delete-btn").forEach(function (button) {
        button.addEventListener("click", function () {
          button.closest(".task").remove();
          saveTasks(); // Save tasks to local storage
        });
      });
    }
  }
});
