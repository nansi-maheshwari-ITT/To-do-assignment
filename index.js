const inputBox = document.querySelector(".input-field input");
const addButton = document.querySelector(".input-field button");
const deleteAllButton = document.querySelector(".footer button");
const toDoList = document.querySelector(".to-do-list");
const completedTaskList = document.querySelector(".completed-task-list");
const pendingTask = document.querySelector(".footer span");
const saveButton = document.querySelector(".save-button");
var taskListArray;
var completeTaskList;
var updateindex;

if (localStorage.getItem("Task list")) {
    taskListArray = JSON.parse(localStorage.getItem("Task list"));
}
else {
    taskListArray = JSON.parse("[]");
}

if (localStorage.getItem("Completed task")) {
    completeTaskList = JSON.parse(localStorage.getItem("Completed task"));
}
else {
    completeTaskList = JSON.parse("[]");
}


let userEnteredTask;
inputBox.onkeyup = () => {
    userEnteredTask = inputBox.value;
    if (userEnteredTask.trim() != 0) {
        addButton.classList.add("active");
    }
    else {
        addButton.classList.remove("active");
    }
}


addButton.onclick = () => {
    taskListArray.push(userEnteredTask);
    localStorage.setItem("Task list", JSON.stringify(taskListArray));
    showListOfTasks();
    addButton.classList.remove("active");
}

function showListOfTasks() {

    if (taskListArray.length > 0 || completeTaskList.length > 0) {
        deleteAllButton.classList.add("active");
    } else {
        deleteAllButton.classList.remove("active");
    }

    let newLiTag = "";
    if (taskListArray.length == 0) {
        toDoList.innerHTML = newLiTag;
    }
    taskListArray.forEach((element, index) => {
        newLiTag += `<li><span class="complete-task-icon" onclick="completeTask(${index})"><i class="fa fa-check-square fa-border" aria-hidden="true"></i></span>  ${element}<div class="side-icons"><button class="edit-icon" onclick="editTask(${index} )">Edit</button><span class="delete-icon" onclick="deleteTask(${index})" ><i class="fas fa-trash"></i></span></div></li>`;
        toDoList.innerHTML = newLiTag;
        inputBox.value = "";

    });
    pendingTask.innerHTML = `You have ${taskListArray.length} pending task.`
}

function editTask(index) {
    addButton.style.display = "none";
    saveButton.style.display = "block";
    updateindex = index;
    inputBox.value = taskListArray[index];

}


saveButton.onclick = () => {
    addButton.style.display = "block";
    addButton.classList.remove("active");
    saveButton.style.display = "none";

    taskListArray[updateindex] = inputBox.value;
    localStorage.setItem("Task list", JSON.stringify(taskListArray));
    showListOfTasks();

}

function deleteTask(index) {
    taskListArray.splice(index, 1);
    localStorage.setItem("Task list", JSON.stringify(taskListArray));
    showListOfTasks();
}



function completeTask(index) {
    completeTaskList.push(taskListArray[index]);
    localStorage.setItem("Completed task", JSON.stringify(completeTaskList));
    showCompletedTask();
    deleteTask(index);

}

function showCompletedTask() {
    if (completeTaskList.length == 0) {
        completedTaskList.innerHTML = "";
    }

    newLiTag = `<h1>Completed Task</h1>`;
    completeTaskList.forEach((element, index) => {
        newLiTag += `<li class="completed-task"> ${element}<div class="side-icons"><span class="delete-icon" onclick="deleteCompletedTask(${index})"><i class="fas fa-trash"></i></span></div></li>`;
        completedTaskList.innerHTML = newLiTag;
    });
}

function deleteCompletedTask(index) {
    completeTaskList.splice(index, 1);
    localStorage.setItem("Completed task", JSON.stringify(completeTaskList));
    showCompletedTask();
}


deleteAllButton.onclick = () => {
    taskListArray = [];
    completeTaskList = [];
    localStorage.setItem("Task list", JSON.stringify(taskListArray));
    localStorage.setItem("Completed task", JSON.stringify(completeTaskList));
    showListOfTasks();
    showCompletedTask();
}

