const form = document.querySelector("form");
const taskInput = document.querySelector(".input-field");
const taskList = document.querySelector("ul");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (taskInput.value.trim() !== "") {
    const newTask = document.createElement("li");
    newTask.className = "task";
    newTask.innerHTML = `<input class="check-btn" type="checkbox">${taskInput.value}`;
    taskList.appendChild(newTask);
    taskInput.value = "";
  }
});
