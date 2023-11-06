function newTask() {
    // @ts-ignore
    var taskName = document.querySelector("#task-name").value;
    var taskDescription = 
    // @ts-ignore
    document.querySelector("#task-description").value;
    var newTask = {
        name: taskName,
        taskDescription: taskDescription,
    };
    if (!(newTask.name && newTask.taskDescription)) {
        alert("Two camps must be completed!");
        throw new Error("Two camps must be completed!");
    }
    // @ts-ignore
    document.querySelector("#task-description").value = "";
    // @ts-ignore
    document.querySelector("#task-name").value = "";
    alert("Tarefa adicionada!");
    localStorage.setItem("task" + localStorage.length, JSON.stringify(newTask));
    return newTask;
}
function appendNewTask(task) {
    var taskList = document.querySelector(".tasks");
    var taskCard = document.createElement("span");
    taskCard.classList.add("task-card");
    var taskSeparator = document.createElement("section");
    taskSeparator.classList.add("task-secondary-camp");
    var taskTitle = document.createElement("h1");
    taskTitle.innerText = task.name.charAt(0).toUpperCase() + task.name.slice(1);
    taskTitle.classList.add("task-title");
    var taskDescription = document.createElement("p");
    taskDescription.innerText =
        task.taskDescription.charAt(0).toUpperCase() +
            task.taskDescription.slice(1);
    taskDescription.classList.add("task-description");
    var binImage = document.createElement("img");
    binImage.src = "./images/bin.png";
    binImage.classList.add("bin-icon");
    taskSeparator.append(taskTitle, taskDescription);
    taskCard.append(taskSeparator, binImage);
    taskList.append(taskCard);
}
function renderSavedTasks() {
    for (var i = 0; i < localStorage.length; i++) {
        var oneTask = JSON.parse(localStorage.getItem(localStorage.key(i)));
        appendNewTask(oneTask);
    }
}
function deleteTask() {
    if (confirm("Tem certeza que deseja excluir essa tarefa?")) {
        var task = this.parentNode;
        var nameTaskToDelte = task.querySelector("h1").textContent;
        document.querySelector(".tasks").removeChild(task);
        for (var i = 0; i < localStorage.length; i++) {
            var oneTask = JSON.parse(localStorage[localStorage.key(i)]);
            var formatedName = oneTask.name.charAt(0).toUpperCase() + oneTask.name.slice(1);
            if (nameTaskToDelte == formatedName) {
                localStorage.removeItem(localStorage.key(i));
            }
        }
    }
}
function safeDelete() {
    var allBin = document.querySelectorAll(".bin-icon");
    allBin.forEach(function (bin) {
        bin.addEventListener("click", deleteTask);
    });
}
document.addEventListener("DOMContentLoaded", function () {
    renderSavedTasks();
});
document.querySelector(".save-task").addEventListener("click", function () {
    var task = newTask();
    appendNewTask(task);
    safeDelete();
});
setTimeout(function () {
    safeDelete();
}, 500);
