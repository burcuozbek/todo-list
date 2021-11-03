const input = document.querySelector("#input");
const list = document.querySelector(".list");
const clearAll = document.querySelector("#clear-all");
const searchInput = document.getElementById("search");
const form = document.getElementById("form");
const addBtn = document.getElementById("add-button");
const alertCont = document.querySelector(".alert-container");
addBtn.addEventListener("click", addTodo);
form.addEventListener("submit", addTodo);
list.addEventListener("click", removeTodo);
clearAll.addEventListener("click", removeAllTodos);
document.addEventListener("DOMContentLoaded", loadAllToUI);
searchInput.addEventListener("keyup", searchTodo);

function loadAllToUI() {
  let todos = getTodosFromStorage();
  todos.map((todo) => {
    addTodoToUI(todo);
  });
}

function addTodo(e) {
  if (input.value !== "") {
    const value = input.value.trim();
    setStorageData(value);
    addTodoToUI(value);
    showAlert("alert-success", "Added successfully!");
  } else {
    showAlert("alert-error", "Please write any word!");
  }
}

function addTodoToUI(value) {
  // Create List Element
  const liElement = document.createElement("li");
  const spanElement = document.createElement("span");
  const aElement = document.createElement("a");
  aElement.href = "#";
  aElement.id = "remove";
  aElement.textContent = " X";
  spanElement.innerHTML = value;
  liElement.className = "list-element";
  liElement.appendChild(spanElement);
  liElement.appendChild(aElement);

  list.appendChild(liElement);
  input.value = "";
}

function removeTodo(e) {
  if (e.target.id === "remove") {
    e.target.parentElement.remove();
    removeTodoFromStorage(e.target.parentElement.firstChild.textContent);
    showAlert("alert-success", "Todo removed successfully!");
  }
}

function removeAllTodos() {
  const listItems = document.querySelectorAll(".list-element");
  if (confirm("Are you sure?")) {
    listItems.forEach(function (li) {
      li.remove();
    });
    localStorage.removeItem("todos");
    showAlert("", "All todos are removed successfully!");
  }
}

function getTodosFromStorage() {
  let todos = [];
  if (localStorage.getItem("todos") === null) {
    localStorage.setItem("todos", JSON.stringify(todos));
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function setStorageData(value) {
  let storageData = getTodosFromStorage();
  storageData.push(value);
  localStorage.setItem("todos", JSON.stringify(storageData));
}

function removeTodoFromStorage(item) {
  let todosArray = getTodosFromStorage();
  todosArray.map(function (todo, index) {
    if (todo === item) {
      todosArray.splice(index, 1);
    }
    localStorage.setItem("todos", JSON.stringify(todosArray));
  });
}

function searchTodo(e) {
  const searchInput = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-element");
  listItems.forEach(function (li) {
    const todo = li.firstChild.textContent.toLowerCase();
    if (todo.indexOf(searchInput) === -1) {
      li.setAttribute("style", "display:none !important");
    } else {
      li.setAttribute("style", "display:block !important");
    }
  });
}
function showAlert(className, message) {
  const divElement = document.createElement("div");
  const pElement = document.createElement("p");
  divElement.className = `alert ${className}`;
  pElement.innerHTML = message;
  divElement.appendChild(pElement);
  alertCont.appendChild(divElement);
  setTimeout(function () {
    divElement.remove();
  }, 2000);
}
