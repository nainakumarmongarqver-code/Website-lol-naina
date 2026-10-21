const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskText = input.value.trim();
    if (taskText === "") return alert("Please enter a task!");

    createTaskElement(taskText);
    saveTasks();
    input.value = "";
}

function createTaskElement(text) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${text}</span>
        <button class="delete-btn">Delete</button>
    `;

    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        saveTasks();
    });

    todoList.appendChild(li);
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('li span').forEach(span => {
        tasks.push(span.innerText);
    });
    localStorage.setItem('myTodoList', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('myTodoList') || "[]");
    savedTasks.forEach(taskText => createTaskElement(taskText));
}

addBtn.addEventListener('click', addTask);
input.addEventListener('keypress', (e) => { if (e.key === 'Enter') addTask(); });