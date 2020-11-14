const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection'); 
const clearBtn = document.querySelector('.clear-tasks'); 
const taskInput = document.querySelector('#task'); 
const filter = document.querySelector('#filter'); 

// Load event all listeners
loadEventListeners(); 

function loadEventListeners() {
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);  
    clearBtn.addEventListener('click', clearTasks); 
    filter.addEventListener('keyup', filterTasks); 
}

//Add task
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task'); 
    } else {
        //create li elemnt 

        const li = document.createElement('li'); 
        li.className = 'collection-item'; 
        li.appendChild(document.createTextNode(taskInput.value))

        //create new link 
        const link = document.createElement('a'); 
        link.className = 'delete-item secondary-content'; 
        
        //add icon html 
        link.innerHTML = '<i class="fa fa-remove"><i>'; 
        li.appendChild(link); 

        //append li to ul 
        taskList.appendChild(li); 

        //clear input 
        taskInput.value = ''; 

        e.preventDefault(); 
    }
}

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove(); 
        }
    }
}

function clearTasks() {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild); 
    }
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