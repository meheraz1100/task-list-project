//Define UI Element
let form = document.querySelector('#task_form');
let taskList = document.querySelector('ul');
let clearBtn = document.querySelector('#clear_task_btn');
let filter = document.querySelector('#task_filter');
let taskInput = document.querySelector('#new_task');
// console.log(taskInput.value);
// console.log(typeof(taskInput));


//define event listeners
form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTask);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTasks);
//define functions

//add task
function addTask(e){
    e.preventDefault();
    // console.log(taskInput.value);
    let a = '';
    if(taskInput.value === a){
        alert('Add a task');
    }else{
        //create li element
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + " "));

        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        li.appendChild(link);
        taskList.appendChild(li);
        
        storeTaskInLocalStorage(taskInput.value);
        
        
    }
    
    taskInput.value = '';
    console.log(taskInput.value);
}


//removeTAsk
function removeTask(e){
    if(e.target.hasAttribute('href')){
        if(confirm('Are You sure?')){
            let ele = e.target.parentElement;
            ele.remove();
            // console.log(e.target);
            removeFromLS(ele);
        }
    }
}

//clear task 
function clearTask(){
    //taskList.innerHTML = "";


    //faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
}

//filtertask 

function filterTask(e){
    let text = e.target.value.toLowerCase();

    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!= -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    })
}

//store in local storage

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        task = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    task.push(task);

    localStorage.setItem('tasks', JSON.stringify("tasks"));
}


//getTasks
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function tasks() {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(tasks + " "));
        
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        li.appendChild(link);
        taskList.appendChild(li);
    })
}


//remove task from local storage
function removeFromLS(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let li = taskItem;
    li.removeChild(li.lasChild); //<a></a>

    tasks.forEach((task, index) => {
        if(li.textContent.trim() === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}