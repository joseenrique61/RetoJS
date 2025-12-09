const taskList = document.querySelector(".tasks__list");
const addTaskForm = document.querySelector(".tasks__form");
const taskInput = document.querySelector(".tasks__input");

let checkboxes = Array.from(document.querySelectorAll(".tasks__checkbox"));
let lastClicked;

function handleCheck(e) {
  const isChecked = this.checked;
  if (e.shiftKey && lastClicked) {
    const thisIndex = checkboxes.indexOf(e.target);
    const lastIndex = checkboxes.indexOf(lastClicked);
    checkboxes
      .slice(Math.min(thisIndex, lastIndex), Math.max(thisIndex, lastIndex))
      .forEach((element) => {
        element.checked = isChecked;
      });
  }

  lastClicked = e.target;
}

function createTask(taskText) {
  const taskId = `task${Date.now()}`;
  const taskItem = document.createElement("li");
  taskItem.className = "tasks__item";
  taskItem.innerHTML = `
    <input type="checkbox" id="${taskId}" class="tasks__checkbox">
    <label for="${taskId}" class="tasks__label">${taskText}</label>
    <button class="tasks__delete-button">Delete</button>
  `;

  const checkbox = taskItem.querySelector(".tasks__checkbox");
  checkbox.addEventListener("click", handleCheck);
  checkboxes.push(checkbox);
  if (!lastClicked) {
    lastClicked = checkbox;
  }

  const deleteButton = taskItem.querySelector(".tasks__delete-button");
  deleteButton.addEventListener("click", () => {
    const checkboxIndex = checkboxes.indexOf(checkbox);
    if (checkboxIndex > -1) {
      checkboxes.splice(checkboxIndex, 1);
    }
    taskItem.remove();
  });

  return taskItem;
}

addTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const newTask = createTask(taskText);
    taskList.appendChild(newTask);
    taskInput.value = "";
  }
});

checkboxes.forEach((element) => {
  element.addEventListener("click", handleCheck);
});

const deleteButtons = document.querySelectorAll(".tasks__delete-button");
deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const taskItem = button.closest(".tasks__item");
        const checkbox = taskItem.querySelector(".tasks__checkbox");
        const checkboxIndex = checkboxes.indexOf(checkbox);
        if (checkboxIndex > -1) {
            checkboxes.splice(checkboxIndex, 1);
        }
        taskItem.remove();
    });
});
