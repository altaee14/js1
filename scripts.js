const pushBtn = document.querySelector('.accept-btn');
const tasksContainer = document.querySelector('.tasks');
const textArea = document.querySelector('.textarea');
const addBtn = document.querySelector('.button-add');
const emptyPage = document.querySelector('.empty');
const taskPage = document.querySelector('.tasks');
const newTaskPage = document.querySelector('.new');
const deleteBtn = document.querySelector('.button_delete');
let checkboxBtn = document.querySelector('.done_checked');

let task = {
    id: 0,
    taskText: "",
    status: 0,
};


addBtn.addEventListener('click', clickAddBtn);
document.querySelector('.accept-btn').addEventListener('click', addNewTask);
document.querySelector('.back-btn').addEventListener('click', backToTasks);
deleteBtn.addEventListener('click', deleteTask());
checkboxBtn.addEventListener('change', checkedTask());

function clickAddBtn() {
    
    emptyPage.style.display = 'none';
    taskPage.style.display = 'none';
    addBtn.style.display = 'none';

    newTaskPage.style.display = 'block';
}

function addNewTask(){

    if (localStorage.length > 0){
        task.id = Date.now();
    }else task.id = Date.now();

    let text = document.querySelector('.textarea');
    let taskTextValue = text.value; 

    if (taskTextValue !== "") {
        task.taskText = taskTextValue; 
    } else {
        alert('Поле не может быть пустым!');
        return; 
    }

    localStorage.setItem('task-' + task.id, JSON.stringify(task));
    text.value = "";
    
    displayTasks();
} 


function displayTasks() {

    tasksContainer.innerHTML = '';

    if (localStorage.length === 0) {
        taskPage.style.display = 'none';
        emptyPage.style.display = 'block';
        newTaskPage.style.display = "none";
        addBtn.style.display = 'block';
    } else {
        taskPage.style.display = 'block';
        newTaskPage.style.display = "none";
        emptyPage.style.display = 'none'; // Если localStorage не пустой, скрываем emptyPage
        addBtn.style.display = 'block';
    }
    
    let tasks = [];
for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key.startsWith('task-')) {
        let task = JSON.parse(localStorage.getItem(key));
        tasks.push(task);
    }
}

for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');
    todoItem.innerHTML = `
        <label class="checkbox-container">
            <input type="checkbox" class="done_checked" ${task.status === 1 ? 'checked' : ''} onChange="checkedTask(${task.id})">
            <span class="checkmark"></span>
        </label>
        <p class="task-text task-${task.id}" style ="text-decoration: ${task.status === 1 ? 'line-through' : 'none'}">${task.taskText}</p>
        <button type="button" class="button_delete taskBtn-${task.id}" onclick="deleteTask(${task.id})" style="display: ${task.status === 1 ? 'block' : 'none'}">
            <img src="/imajes/crest2.svg" alt="">
        </button>
    `;
    tasksContainer.appendChild(todoItem);
    }
}

function deleteTask(id) {
    let keys = Object.keys(localStorage).filter(key => key.startsWith('task-'));
    let taskKey = keys.find(key => JSON.parse(localStorage.getItem(key)).id === id);
    if (taskKey) {
        localStorage.removeItem(taskKey);
        displayTasks();
    }
}

function backToTasks(){
    displayTasks();
    textArea.value = "";
}

function getTaskByID(id) {
    let keys = Object.keys(localStorage).filter(key => key.startsWith('task-'));
    let taskKey = keys.find(key => JSON.parse(localStorage.getItem(key)).id === id);
    return taskKey ? JSON.parse(localStorage.getItem(taskKey)) : null;
  }

function checkedTask(id) {
    let task = getTaskByID(id);

    let decoratedText = document.querySelector(`.task-${id}`);
    let displayBtn = document.querySelector(`.taskBtn-${id}`);
  
    if (task && task.status === 0) {
      task.status = 1;
      localStorage.setItem(`task-${task.id}`, JSON.stringify(task));
      
      decoratedText.style.textDecoration = 'line-through';
      displayBtn.style.display = 'block';
    }else if(task && task.status === 1) {
        task.status = 0;
        localStorage.setItem(`task-${task.id}`, JSON.stringify(task));

        decoratedText.style.textDecoration = 'none';
        displayBtn.style.display = 'none';

      }
    
  }


window.onload = function() {
    displayTasks();
}
