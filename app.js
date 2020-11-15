const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection'); 
const clearBtn = document.querySelector('.clear-tasks'); 
const taskInput = document.querySelector('#task'); 
const filter = document.querySelector('#filter'); 

// Load event all listeners
loadEventListeners(); 

function loadEventListeners() {
    // DOM Load event 
    document.addEventListener('DOMContentLoaded', getTasks); 
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);  
    clearBtn.addEventListener('click', clearTasks); 
    filter.addEventListener('keyup', filterTasks); 
}

// Get tasks from LS
function getTasks() {
    let tasks; 
    if(localStorage.getItem('tasks') === null) {
        tasks = []; 
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks')); 
    }

    tasks.forEach(function(task) {
        //create li elemnt 
        const li = document.createElement('li'); 
        li.className = 'collection-item'; 
        li.appendChild(document.createTextNode(task));

        //create new link 
        const link = document.createElement('a'); 
        link.className = 'delete-item secondary-content'; 
        
        //add icon html 
        link.innerHTML = '<i class="fa fa-remove"><i>'; 
        li.appendChild(link); 

        //append li to ul 
        taskList.appendChild(li); 
    })
}

//Add task
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task'); 
    } else {
        //create li elemnt 
        const li = document.createElement('li'); 
        li.className = 'collection-item'; 
        li.appendChild(document.createTextNode(taskInput.value));

        //create new link 
        const link = document.createElement('a'); 
        link.className = 'delete-item secondary-content'; 
        
        //add icon html 
        link.innerHTML = '<i class="fa fa-remove"><i>'; 
        li.appendChild(link); 

        //append li to ul 
        taskList.appendChild(li); 

        // Store In LS
        storeTaskInLocalStorage(taskInput.value); 


        //clear input 
        taskInput.value = ''; 

        e.preventDefault(); 
    }
}

// Create function to store task in LS
function storeTaskInLocalStorage(task) {
    let tasks; 
    if(localStorage.getItem('tasks') === null) {
        tasks = []; 
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks')); 
    }

    tasks.push(task); 
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
}

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove(); 

            // Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement); 
        }
    }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks; 
    if(localStorage.getItem('tasks') === null) {
        tasks = []; 
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks')); 
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task) {
            tasks.splice(index, 1); 
        }
    }); 

    localStorage.setItem('tasks', JSON.stringify(tasks)); 
}

function clearTasks() {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild); 
    }

    // Clear from LS
    clearTasksfromLocalStorage(); 
}

// Clear tasks from LS
function clearTasksfromLocalStorage() {
    localStorage.clear(); 
}


function filterTasks(e) {
    const text = e.target.value.toLowerCase(); 

    document.querySelectorAll('.collection-item').forEach(
        function(task) {
            const item = task.firstChild.textContent; 
            if(item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block'; 
            } else {
                task.style.display = 'none'; 
            }
        }
    )
}
