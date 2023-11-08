const form = document.querySelector("form");
const taskInput = document.querySelector(".input-field");
const taskList = document.querySelector("ul");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (taskInput.value.trim() !== "") {
    const newTask = document.createElement("li");
    newTask.className = "task";
    newTask.innerHTML = `<input class="check-btn" type="checkbox"><span>${taskInput.value}</span><button class="delete-btn"><span class="material-symbols-outlined">delete</span></button>`;

    const deleteBtn = newTask.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function () {
      newTask.parentNode.removeChild(newTask);
    });

    taskList.appendChild(newTask);
    taskInput.value = "";
  }
});

document.querySelector(".task-list").addEventListener("change", function (event) {
    if (
      event.target.classList.contains("check-btn") &&
      event.target.type === "checkbox"
    ) {
      let listItem = event.target.nextElementSibling;
      switch (event.target.checked) {
        case true:
          listItem.style.textDecoration = "line-through";
          break;
        case false:
          listItem.style.textDecoration = "none";
          break;
      }
    }
  });
