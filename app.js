// Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const taskFilter = document.querySelector('#task-filter');
const cardAction = document.querySelector("#card-action");
const showTasks = document.querySelector("#show-hide");

// Load all event listeners
loadEventListeners();

// Load all event listeners function
function loadEventListeners() {
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    form.addEventListener('submit', actionCard);
    // Delete task
    taskList.addEventListener('click', deleteTask);
    // Delete all tasks
    clearBtn.addEventListener('click', deleteAllTasks);
    // Filter tasks
    filter.addEventListener('keyup', filterTasks);
}
// Get task
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        // Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'collection-item';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create new link element
        const link = document.createElement('a');
        // Add class
        link.className = 'delete-item secondary-content';
        // Add icon
        link.innerHTML = '<i class="fa fa-remove"></i>';
        // Append the link to li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);
    });
}

// Add task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    } else {

    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // Store task in local storage
    storeTaskInLocalStorage(taskInput.value);

    // Check if there is some task in task list
    actionCard();

    // Clear task input
    taskInput.value = '';
    e.preventDefault(); // prevent default form submit
    }
}

// Store task in local storage
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

// Delete task
function deleteTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        console.log('delete item');
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
        }
    }

    removeTaskFromLocalStorage(e.target.parentElement.parentElement);

    actionCard();
}

// Remove task from local storage
function removeTaskFromLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
       tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(taskLS, index) {
        if(task.textContent === taskLS ) {
            tasks.splice(index, 1);
        }
    });   

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Delete all tasks
function deleteAllTasks() {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    /* or
    taskList.innerHTML = '';
    */
    // while method is faster than innerHTML method - documentation: https://jsperf.com/innerhtml-vs-removechild

    // Delete all tasks from local storage
    removeAllTasksFromLocalStorage();

    actionCard();
}

// Remove all tasks from local storage

function removeAllTasksFromLocalStorage() {
    localStorage.clear();
}

// Filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        };

        // if (task.firstChild == null) {
        //     taskFilter.style.display = "none";
        // };
    });
}

// Not displaying action card when there is no tasks
function actionCard() {
    const ul = document.querySelector('.collection');
    var list = ul.hasChildNodes();
    if (list) {
        showTasks.style.display = "block";
    } else {
        showTasks.innerHTML = "<p>The task list is empty.</p>";
    }
}

// Save tasks in local storage
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
