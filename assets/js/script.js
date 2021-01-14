var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
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

        var isEdit = formEl.hasAttribute("data-task-id");
        
        //has data attribute, so get task id and call function to comeplete edit process
        if(isEdit)
            {
                var taskId = formEl.getAttribute("data-task-id");
                completeEditTask(taskNameInput, taskTypeInput, taskId);
            }

            //no data attribute, so create object as normal and pass to createTaskEl function
        else
            {
                var taskDataObj = 
                    {
                        name: taskNameInput,
                        type: taskTypeInput
                    };
            
        
                creatTaskEl(taskDataObj);
            }
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
            //get target element from event
            var targetEl = event.target;

            //edit button was clicked
            if(targetEl.matches(".edit-btn"))
                {
                    var taskId = targetEl.getAttribute("data-task-id");
                    editTask(taskId);
                }
            //delete button was clicked
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

    var editTask = function(taskId)
        {
            console.log("editing task #" + taskId);

            //get task list item element
            var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

            //get content from task name and type
            var taskName = taskSelected.querySelector("h3.task-name").textContent;
            console.log(taskName);

            var taskType = taskSelected.querySelector("span.task-type").textContent;
            console.log(taskType);

            document.querySelector("input[name='task-name']").value = taskName;
            document.querySelector("select[name='task-type']").value = taskType;

            document.querySelector("#save-task").textContent = "Save Task";
            formEl.setAttribute("data-task-id", taskId);
        };

    var completeEditTask = function(taskName, taskType, taskId)
        {
            //find the matching task list item
            var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

            //set new values
            taskSelected.querySelector("h3.task-name").textContent = taskName;
            taskSelected.querySelector("span.task-type").textContent = taskType;

            alert("Task Updated");

            formEl.removeAttribute("data-task-id");
            document.querySelector("#save-task").textContent = "Add Task";
        };

    var taskStatusChangeHandler = function(event)
        {
            console.log(event.target);
            console.log(event.target.getAttribute("data-task-id"));
            //get the task item's id
            var taskId = event.target.getAttribute("data-task-id");

            //get the currently selected option's value and convert to lowercase 
            var statusValue = event.target.value.toLowerCase();

            //find the parent task item element based on the id
            var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

            if(statusValue === "to do")
                {
                    tasksToDoEl.appendChild(taskSelected);
                }
            else if (statusValue === "in progress")
                {
                    tasksInProgressEl.appendChild(taskSelected);
                }
            else if (statusValue === "completed")
                {
                    tasksCompletedEl.appendChild(taskSelected);
                }

        }


    //function call for creating list items in task section from #task-form on click or enter press
    formEl.addEventListener("submit", taskFormHandler);
    //general click listerner 
    pageContentEl.addEventListener("click", taskButtonHandler);

    pageContentEl.addEventListener("change", taskStatusChangeHandler);

