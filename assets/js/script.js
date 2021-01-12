var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

//function for collecting data from the task-form
var taskFormHandler = function(event)
    {
        event.preventDefault();

        var taskNameInput = document.querySelector("input[name= 'task-name']").value;
        var taskTypeInput = document.querySelector("select[name= 'task-type']").value;

        if (!taskNameInput || !taskTypeInput)
            {
                alert("You need to fill out the task form!");
                return false;
            }

        //package up data as an object
        var taskDataObj = 
            {
                name: taskNameInput,
                type: taskTypeInput
            };

        //send it as an argument to createTaskEl
        creatTaskEl(taskDataObj);
        
        formEl.reset();
    }
    
    //function for turning task-form data into printable html elements
    var creatTaskEl = function(taskDataObj)
        {
            //create list item
            var listItemEl = document.createElement("li");
            listItemEl.className = "task-item";

            //create div to hold task info and add to list item
            var taskInfoEl = document.createElement("div");
            taskInfoEl.className = "task-info";

            //add html content to div
            taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
            listItemEl.appendChild(taskInfoEl);

            //add entire list item to list
            tasksToDoEl.appendChild(listItemEl);
        }
    
    
    
    
    
    
    //function call for creating list items in task section from #task-form
    formEl.addEventListener("submit", taskFormHandler);