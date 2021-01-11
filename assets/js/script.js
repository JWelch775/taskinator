var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

//function for adding list items to the task section
var createTaskHandler = function(event)
    {
        event.preventDefault();

        var listItemEl = document.createElement("li");
        listItemEl.className = "task-item";
        listItemEl.textContent = "This is a new task.";
        tasksToDoEl.appendChild(listItemEl);
    };
    
    
    
    
    
    
    
    
    //function call for creating list items in task section from #task-form
    formEl.addEventListener("submit", createTaskHandler);