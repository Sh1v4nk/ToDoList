const form = document.querySelector("form");
const taskInput = document.querySelector(".input-field");
const taskList = document.querySelector("ul");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (taskInput.value.trim() !== "") {
    const newTask = document.createElement("li");
    newTask.className = "task";
    newTask.innerHTML = `<input class="check-btn" type="checkbox"><span>${taskInput.value}</span><span class="right-style"><span class="task-done">&#10004 Completed</span><button class="delete-btn"><span class="material-symbols-outlined">delete</span></button></span>`;

    const deleteBtn = newTask.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function () {
      newTask.parentNode.removeChild(newTask);
    });

    taskList.appendChild(newTask);
    taskInput.value = "";
  }
});

document.querySelector(".task-list").addEventListener("change", function (event) {
    const target = event.target;

    if (target.classList.contains("check-btn") && target.type === "checkbox") {
      let listItem = target.closest(".task");
      let taskText = listItem.querySelector("span:not(.right-style)");
      let taskDone = listItem.querySelector(".task-done");

      if (target.checked) {
        taskText.style.textDecoration = "line-through";
        taskDone.style.display = "block";
      } else {
        taskText.style.textDecoration = "none";
        taskDone.style.display = "none";
      }
    }
  });
