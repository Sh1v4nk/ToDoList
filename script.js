const form = document.querySelector("form");
const taskInput = document.querySelector(".input-field");
const taskList = document.querySelector("ul");

// Event listener for form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Check if the task input field is not empty
  if (taskInput.value.trim() !== "") {
    // Create a new task item
    const newTaskItem = document.createElement("li");
    newTaskItem.className = "task";
    newTaskItem.innerHTML = `
      <input class="check-btn" type="checkbox">
      <span>${taskInput.value}</span>
      <div class="right-style">
        <span class="task-done">&#10004 Completed</span>
        <button class="delete-btn"><span class="material-symbols-outlined">delete</span></button>
      </div>`;

    // Add event listener to delete button of the new task
    const deleteButton = newTaskItem.querySelector(".delete-btn");
    deleteButton.addEventListener("click", function () {
      newTaskItem.parentNode.removeChild(newTaskItem);
      saveTasks();
    });

    // Append the new task to the task list
    taskList.appendChild(newTaskItem);
    taskInput.value = ""; // Clear task input field

    saveTasks(); // Save tasks to local storage
  }
});

// Event listener for checkbox changes
document.querySelector(".task-list").addEventListener("change", function (event) {
  const target = event.target;

  // Check if the target is a checkbox
  if (target.classList.contains("check-btn") && target.type === "checkbox") {
    let listItem = target.closest(".task");
    let taskText = listItem.querySelector("span");
    let taskDone = listItem.querySelector(".task-done");

    // Update task text and completion status
    if (target.checked) {
      taskText.style.textDecoration = "line-through";
      taskDone.style.display = "block";
    } else {
      taskText.style.textDecoration = "none";
      taskDone.style.display = "none";
    }
    saveTasks(); // Save tasks to local storage
  }
});

// Function to add event listeners to delete buttons
function addDeleteEventListeners() {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const listItem = button.closest(".task");
      listItem.parentNode.removeChild(listItem);
      saveTasks(); // Save tasks to local storage
    });
  });
}

// Function to save tasks to local storage
function saveTasks() {
  window.localStorage.setItem("taskList", taskList.innerHTML);
}

// Function to load tasks from local storage
function loadTasks() {
  const savedTasks = window.localStorage.getItem("taskList");
  taskList.innerHTML = savedTasks;
  addDeleteEventListeners(); // Add delete event listeners to loaded tasks
}
loadTasks(); // Load tasks on page load