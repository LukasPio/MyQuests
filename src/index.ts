type Task = {
  name: string;
  taskDescription: string;
};

function newTask(): Task {
  // @ts-ignore
  const taskName: string = document.querySelector("#task-name").value;
  const taskDescription: string =
    // @ts-ignore
    document.querySelector("#task-description").value;

  const newTask: Task = {
    name: taskName,
    taskDescription: taskDescription,
  };

  if (!(newTask.name && newTask.taskDescription)) {
    alert("Two camps must be completed!");
    throw new Error("Two camps must be completed!");
  }

  document.querySelector("#task-description").textContent = "";
  document.querySelector("#task-name").textContent = "";
  alert("Tarefa adicionada!");
  localStorage.setItem("task" + localStorage.length, JSON.stringify(newTask));
  return newTask;
}

function appendNewTask(task: Task) {
  const taskList = document.querySelector(".tasks");

  const taskCard = document.createElement("span");
  taskCard.classList.add("task-card");

  const taskSeparator = document.createElement("section");
  taskSeparator.classList.add("task-secondary-camp");

  const taskTitle = document.createElement("h1");
  taskTitle.innerText = task.name.charAt(0).toUpperCase() + task.name.slice(1);
  taskTitle.classList.add("task-title");

  const taskDescription = document.createElement("p");
  taskDescription.innerText =
    task.taskDescription.charAt(0).toUpperCase() +
    task.taskDescription.slice(1);
  taskDescription.classList.add("task-description");

  const binImage = document.createElement("img");
  binImage.src = "./images/bin.png";
  binImage.classList.add("bin-icon");

  taskSeparator.append(taskTitle, taskDescription);
  taskCard.append(taskSeparator, binImage);
  taskList.append(taskCard);
}

function renderSavedTasks() {
  for (let i = 0; i < localStorage.length; i++) {
    const oneTask = JSON.parse(localStorage.getItem(localStorage.key(i)));
    appendNewTask(oneTask);
  }
}

function deleteTask() {
  if (confirm("Tem certeza que deseja excluir essa tarefa?")) {
    const task = this.parentNode;
    const nameTaskToDelte = task.querySelector("h1").textContent;
    document.querySelector(".tasks").removeChild(task);
    for (let i = 0; i < localStorage.length; i++) {
      let oneTask = JSON.parse(localStorage[localStorage.key(i)]);
      const formatedName =
        oneTask.name.charAt(0).toUpperCase() + oneTask.name.slice(1);
      if (nameTaskToDelte == formatedName) {
        localStorage.removeItem(localStorage.key(i));
      }
    }
  }
}

function safeDelete() {
  const allBin = document.querySelectorAll(".bin-icon");

  allBin.forEach((bin) => {
    bin.addEventListener("click", deleteTask);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderSavedTasks();
});

document.querySelector(".save-task").addEventListener("click", () => {
  const task: Task = newTask();
  appendNewTask(task);
  safeDelete();
});

setTimeout(() => {
  safeDelete();
}, 500);
