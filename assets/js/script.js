var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var taskIdCounter = 0;

//function for collecting data from the task-form
var taskFormHandler = function(event)
    {
        event.preventDefault();

        var taskNameInput = document.querySelector("input[name= 'task-name']").value;
        var taskTypeInput = document.querySelector("select[name= 'task-type']").value;

        //confirming the input fields are filled out correctly
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

            //add task id as a custom attribute
            listItemEl.setAttribute("data-task-id", taskIdCounter);

            //create div to hold task info and add to list item
            var taskInfoEl = document.createElement("div");
            taskInfoEl.className = "task-info";

            //add html content to div
            taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
            listItemEl.appendChild(taskInfoEl);

            //adding edit delete and select options to tasks 
            var taskActionsEl = createTaskActions(taskIdCounter);
            listItemEl.append(taskActionsEl);

            //add entire list item to list
            tasksToDoEl.appendChild(listItemEl);

            //increase task counter for next unique id
            taskIdCounter++;
        }

    var createTaskActions = function(taskId)
        {
            var actionContainerEl = document.createElement("div");
            actionContainerEl.className = "task-actions";

            // create edit button 
            var editButtonEl = document.createElement("button");
            editButtonEl.textContent = "Edit";
            editButtonEl.className = "btn edit-btn";
            editButtonEl.setAttribute("data-task-id", taskId);

            actionContainerEl.appendChild(editButtonEl);

            //create delete button
            var deleteButtonEl = document.createElement("button");
            deleteButtonEl.textContent = "Delete";
            deleteButtonEl.className = "btn delete-btn";
            deleteButtonEl.setAttribute("data-task-id", taskId);

            actionContainerEl.appendChild(deleteButtonEl);

            //creates the select elements 
            var statusSelectEl = document.createElement("select");
            statusSelectEl.className = "select-status";
            statusSelectEl.setAttribute("name", "status-change");
            statusSelectEl.setAttribute("data-task-id", taskId);

            actionContainerEl.appendChild(statusSelectEl);

            var statusChoices = ["To do", "In Progress", "Completed"];

            for (var i = 0; i < statusChoices.length; i++) 
                {
                    //create option element
                    var statusOptionEl = document.createElement("option");
                    statusOptionEl.textContent = statusChoices[i];
                    statusOptionEl.setAttribute("value", statusChoices[i]);

                    //append to select
                    statusSelectEl.appendChild(statusOptionEl);
                }
            return actionContainerEl;
        }
    
    //function for getting data-task-id for delete button
    var taskButtonHandler = function(event)
        {
            console.log(event.target);

            if(event.target.matches(".delete-btn"))
                {
                    var taskId = event.target.getAttribute("data-task-id");
                    deleteTask(taskId);
                }
        };
    
    //function for deleting tasks
    var deleteTask = function(taskId)
        {
            var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
            taskSelected.remove();
        };


    //function call for creating list items in task section from #task-form on click or enter press
    formEl.addEventListener("submit", taskFormHandler);

    pageContentEl.addEventListener("click", taskButtonHandler);

