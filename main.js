const toDoBox = document.querySelector("#todo-box");
const input = toDoBox.querySelector("input");
const addBtn = toDoBox.querySelector(".add-btn");
const addBtnIcon = toDoBox.querySelector(".add-button-icon");
const notCompletedList = toDoBox.querySelector(".not-completed");
const completedList = toDoBox.querySelector(".completed");

addBtn.addEventListener("click", addToList);

let list = [];
let currentId = 1;

function addToList() {
  if (input.value) {
    const todo = {
      id: currentId,
      title: input.value,
      completed: false,
    };

    list.push(todo);

    currentId++;
    input.value = "";
    renderList();
  } else {
    alert("Please add task");
  }
}

function renderList() {
  renderCompletedList();
  renderNotCompletedList();
}

function deleteTask(id) {
  list = list.filter(function (element) {
    return element.id !== id;
  });
  renderList();
}

function renderCompletedList() {
  completedList.innerText = "";

  const cList = list.filter(function (element) {
    return element.completed;
  });

  cList.forEach(function (todo) {
    const element = document.createElement("li");
    // 1.task element
    const taskEl = document.createElement("div");
    taskEl.className = "task";
    taskEl.innerText = todo.id + ". " + todo.title;

    // 2.actions element
    const actionEl = document.createElement("div");
    actionEl.className = "actions";

    // 4.delete element
    const deleteEl = document.createElement("div");
    deleteEl.className = "fas fa-trash";
    deleteEl.addEventListener("click", function () {
      deleteTask(todo.id);
    });

    // append to actions
    actionEl.appendChild(deleteEl);

    // append to element (li)
    element.appendChild(taskEl);
    element.appendChild(actionEl);

    // appent to list (ul)
    completedList.appendChild(element);
  });
}

function renderNotCompletedList() {
  notCompletedList.innerText = "";

  const ncList = list.filter(function (element) {
    return !element.completed;
  });

  ncList.forEach(function (todo) {
    const element = document.createElement("li");
    // 1.task element
    const taskEl = document.createElement("div");
    taskEl.className = "task";
    taskEl.innerText = todo.id + ". " + todo.title;

    // 2.actions element
    const actionEl = document.createElement("div");
    actionEl.className = "actions";

    // 3.complete element
    const completeEl = document.createElement("div");
    completeEl.className = "fas fa-check";
    completeEl.addEventListener("click", function () {
      complete(todo.id);
    });

    // 4.delete element
    const deleteEl = document.createElement("div");
    deleteEl.className = "fas fa-trash";
    deleteEl.addEventListener("click", function () {
      deleteTask(todo.id);
    });

    // append to actions
    actionEl.appendChild(completeEl);
    actionEl.appendChild(deleteEl);

    // append to element (li)
    element.appendChild(taskEl);
    element.appendChild(actionEl);

    // appent to list (ul)
    notCompletedList.appendChild(element);
  });
}

function complete(id) {
  list.map(function (element) {
    if (element.id === id) {
      return (element.completed = true);
    }
  });
  renderList();
}

/*
function deleteTask(id) {
  const index = list.findIndex(function (element) {
    console.log("elementId", element.id, "id", id);
    return element.id === id;
  });
  console.log(index);

  if (index !== -1) {
    list.splice(index, 1);
    renderList();
  }
}*/
