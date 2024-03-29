// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Functions
function addTodo(event) {
    event.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // Add todo to local storage
    saveLocalTodos(todoInput.value + "|false");

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
    //Delete Todo
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;

        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    } 

    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        console.log("Children"+todo.children[0].innerText)
        todo.classList.toggle("completed");
        if (todo.classList.contains("completed")) {
            removeLocalTodos(todo.children[0].innerText.split("|")[0] + "|false");
            saveLocalTodos(todo.children[0].innerText.split("|")[0] + "|true");
        } else {
            removeLocalTodos(todo.children[0].innerText.split("|")[0] + "|true");
            saveLocalTodos(todo.children[0].innerText.split("|")[0] + "|false");
        }
        
        
    }

}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    // Check if todos are already stored in local storage
    let todos;
    if (localStorage.getItem('todos') === null ) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null ) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
    
        const newTodo = document.createElement('li');
        newTodo.innerText = todo.split("|")[0];
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
    
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
    
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        console.log(todo);
        if (todo.split("|")[1] === "true") {
            todoDiv.classList.add("completed");
        }
    
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null ) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    console.log(todos)
    console.log(todo)
    console.log(todos.indexOf(todo[0]))
    const todoIndex = todo;
    todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem('todos', JSON.stringify(todos));
}