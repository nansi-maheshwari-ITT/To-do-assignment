const inputBox = document.querySelector(".input-field input");
const addButton = document.querySelector(".input-field button");
const deleteAllButton = document.querySelector(".footer button");
const toDoList = document.querySelector(".to-do-list");
const completedTaskList = document.querySelector(".completed-task-list");
const pendingTask = document.querySelector(".footer span");
const updateButtton = document.querySelector(".save-button");
let taskListArray = JSON.parse(localStorage.getItem("Task list"));
let completeTaskList = JSON.parse(localStorage.getItem("Completed task"));
let updateIndex;
let Task;
inputBox.onkeyup=buttonTransition;
addButton.onclick=addTask;
updateButtton.onclick = updateTaskListArray;
 
function buttonTransition() {
  Task = inputBox.value;
  if (Task.trim() != 0) {
    addButton.classList.add("active");
  } else {
    addButton.classList.remove("active");
  }
}
function addTask() {
  addToTaskListArray();
  showListOfTasks();
  buttonTransition();
}
function addToTaskListArray(){
  taskListArray.push(Task);
  localStorage.setItem("Task list", JSON.stringify(taskListArray));
}

function showListOfTasks() {
  deleteAllButtonTransition();
  addNewListItem();
  showPendingTask();
}

function showPendingTask() {
  pendingTask.innerHTML = `You have ${taskListArray.length} pending task.`;
}

function addNewListItem() {
  let newLiTag = "";
  if (taskListArray.length == 0) {
    toDoList.innerHTML = newLiTag;
  }
  taskListArray.forEach((element, index) => {
    newLiTag += `<li><div class="complete-task-icon" onclick="markTaskCompleted(${index})"><i class="fa fa-check-square fa-border" aria-hidden="true"></i></div>  <div class="element-container">${element}</div><div class="side-icons"><div><button class="edit-icon" onclick="editTask(${index} )">Edit</button></div><div class="delete-icon" onclick="deleteTask(${index})" ><i class="fas fa-trash"></i></div></div></li>`;
    toDoList.innerHTML = newLiTag;
    inputBox.value = "";
  });
}

function deleteAllButtonTransition() {
  if (taskListArray.length > 0 || completeTaskList.length > 0) {
    deleteAllButton.classList.add("active");
  } else {
    deleteAllButton.classList.remove("active");
  }
}

function editTask(index) {
  updateButttonTransition();
 updateIndex = index;
  inputBox.value = taskListArray[index];
}

function updateButttonTransition(){
  addButton.style.display = "none";
  updateButtton.style.display = "block";
}

function updateTaskListArray(){
  addButtonTransition();
  taskListArray[updateIndex] = inputBox.value;
  localStorage.setItem("Task list", JSON.stringify(taskListArray));
  showListOfTasks();
}
function addButtonTransition(){
  addButton.style.display = "block";
  addButton.classList.remove("active");
  updateButtton.style.display = "none";
}

function deleteTask(index) {
  taskListArray.splice(index, 1);
  localStorage.setItem("Task list", JSON.stringify(taskListArray));
  showListOfTasks();
}

function markTaskCompleted(index) {
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
    newLiTag += `<li><div class="element-container">${element}</div><div class="complete-list-delete-icon" onclick="deleteCompletedTask(${index})" ><i class="fas fa-trash"></i></div></li>`;
    completedTaskList.innerHTML = newLiTag;
  });
}

function deleteCompletedTask(index) {
  completeTaskList.splice(index, 1);
  localStorage.setItem("Completed task", JSON.stringify(completeTaskList));
  showCompletedTask();
}

deleteAllButton.onclick = () => {
  deleteAllTask();
  showListOfTasks();
  showCompletedTask();
};

function deleteAllTask() {
  taskListArray = [];
  completeTaskList = [];
  localStorage.setItem("Task list", JSON.stringify(taskListArray));
  localStorage.setItem("Completed task", JSON.stringify(completeTaskList));
}
