const inputBox=document.querySelector(".input-field input");
const addButton=document.querySelector(".input-field button");
const deleteAllButton=document.querySelector(".footer button");
const toDoList=document.querySelector(".to-do-list");
const completedTaskList=document.querySelector(".completed-task-list");
const pendingTask=document.querySelector(".footer span");

var completeTaskList=[];

let userEnteredTask;
inputBox.onkeyup=()=>{
  userEnteredTask=inputBox.value;
   if(userEnteredTask.trim()!=0){
    addButton.classList.add("active");
   }
else{
        addButton.classList.remove("active");  
    }
}


addButton.onclick= ()=>{
    let getLocaltaskList=localStorage.getItem("Task list");
  


    if(getLocaltaskList==null){
        taskListArray=[];
    }
    else{
        taskListArray=JSON.parse(getLocaltaskList);
    }
    taskListArray.push(userEnteredTask);
    localStorage.setItem("Task list",JSON.stringify(taskListArray));
    showListOfTasks();
    
    addButton.classList.remove("active");  
}

function showListOfTasks(){

    let getLocaltaskList=localStorage.getItem("Task list");
    if(getLocaltaskList==null){
        taskListArray=[];
    }
    else{
        taskListArray=JSON.parse(getLocaltaskList);
    }

    if(taskListArray.length > 0 ||completeTask.length >0){ 
        deleteAllButton.classList.add("active"); 
      }else{
        deleteAllButton.classList.remove("active"); 
      }
     
      let newLiTag="";
      if(taskListArray.length==0){
        toDoList.innerHTML=newLiTag;
      }
      taskListArray.forEach((element,index) => {
        newLiTag+=`<li><span class="complete-task-icon" onclick="completeTask(${index})"><i class="fa fa-check-square fa-border" aria-hidden="true"></i></span>  ${element}<span class="delete-icon" onclick="deleteTask(${index})" ><i class="fas fa-trash"></i></span></li>`;
        toDoList.innerHTML=newLiTag;
        inputBox.value="";
    
      
      });
      pendingTask.innerHTML=`You have ${taskListArray.length} pending task.`
    }

 
    function deleteTask(index){
        let getLocaltaskList=localStorage.getItem("Task list");
        taskListArray=JSON.parse(getLocaltaskList);
        taskListArray.splice(index,1);
        localStorage.setItem("Task list", JSON.stringify(taskListArray));
        showListOfTasks();
      }  

      

function completeTask(index){
    let getLocaltaskList=localStorage.getItem("Task list");
        taskListArray=JSON.parse(getLocaltaskList);
       completeTaskList.push(taskListArray[index]);
       localStorage.setItem("Completed task",JSON.stringify(completeTaskList)); 
       showCompletedTask();
       deleteTask(index);
       
}

    function showCompletedTask(){
        let getCompletedItemList=localStorage.getItem("Completed task");
        completeTaskList=JSON.parse(getCompletedItemList);

        if(completeTaskList.length==0){
            completedTaskList.innerHTML="";
          }
       newLiTag=`<h1>Completed Task</h1>`;
       completeTaskList.forEach((element,index) => {
        newLiTag+=`<li class="completed-task"> ${element}<span class="delete-icon" onclick="deleteCompletedTask(${index})"><i class="fas fa-trash"></i></span></li>`;
        completedTaskList.innerHTML=newLiTag;    
      }); 
      
       
    }

    function deleteCompletedTask(index){
        let getCompletedItemList=localStorage.getItem("Completed task");
        completeTaskList=JSON.parse(getCompletedItemList);
        completeTaskList.splice(index,1);

        localStorage.setItem("Completed task", JSON.stringify(completeTaskList));
       showCompletedTask();
      }


    deleteAllButton.onclick=()=>{
        taskListArray=[];
        completeTaskList=[];
        localStorage.setItem("Task list",JSON.stringify(taskListArray));
        localStorage.setItem("Completed task",JSON.stringify(completeTaskList));
        showListOfTasks();
        showCompletedTask();
      }
    
