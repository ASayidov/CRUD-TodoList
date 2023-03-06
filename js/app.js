const formCreate = document.getElementById("form-create");
const formEdit = document.getElementById("form-edit");
const listGroupTodo = document.getElementById("list-group-todo");
// const messageCreate = document.getElementById('message-create')
const time = document.getElementById("time");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
/* time elements */
const fullDay = document.getElementById("full-day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");
const closeEl = document.getElementById("close");
// const todoList =document.getElementById('todolist')

let editItemId;

// chek
let todos = JSON.parse(localStorage.getItem("list"))
  ? JSON.parse(localStorage.getItem("list"))
  : [];

if (todos.length) showTodos();

//Set todos to localstorage
function setTodos() {
  localStorage.setItem("list", JSON.stringify(todos));
}

//time
function getTime() {
  const now = new Date();
  const date = now.getDate() <= 9 ? "0" + now.getDate() : now.getDate();
  const month = now.getMonth() + 1 <= 9 ? "0" + now.getMonth() : now.getMonth();
  const year = now.getFullYear();
  const hours = now.getHours() <= 9 ? "0" + now.getHours() : now.getHours();
  const minut =
    now.getMinutes() <= 9 ? "0" + now.getMinutes() : now.getMinutes();
  const sekund =
    now.getSeconds() <= 9 ? "0" + now.getSeconds() : now.getSeconds();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = now.getMonth();
  fullDay.textContent = `${date}.${monthNames[monthName]}.${year}`;
  hourEl.textContent = hours;
  minuteEl.textContent = minut;
  secondEl.textContent = sekund;

  return `${date}.${month}.${year} ${hours}:${minut}`;
}
setInterval(getTime, 1000);

//show todos
function showTodos() {
  const todos = JSON.parse(localStorage.getItem("list"));
  listGroupTodo.innerHTML = "";
  todos.forEach((item, i) => {
    listGroupTodo.innerHTML += `<li ondblclick="setCompleted(${i})" class="list-group-item d-flex justify-content-between align-items-between
      ${item.completed == true ? "completed" : ""}">
  ${item.text}
  <div class="todo-icons">
  <span class="opacity-50 me-2">${item.time}</span>
  <img onclick="editTodo(${i})"  src="img/edit.svg" alt="edit icon" width="25" height="25">
  <img onclick="deleteTodo(${i})" src="img/delete.svg" alt="delete icon" width="25" height="25">
  </div> </li>`;
  });
}

//show error

function showMessage(where, message) {
  document.getElementById(`${where}`).textContent = message;
  setTimeout(() => {
    document.getElementById(`${where}`).textContent = "";
  }, 2500);
}

/* */

// Get Todos
formCreate.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = formCreate["input-create"].value.trim();
  formCreate.reset();
  if (todoText.length) {
    todos.push({ text: todoText, time: getTime(), completed: false });
    console.log(todos);
    setTodos();
    showTodos();
  } else {
    showMessage("message-create", "Please, enter some text...");
  }
});

//delete todo
function deleteTodo(id) {
  const deletedTodos = todos.filter((item, i) => {
    return i !== id;
  });
  todos = deletedTodos;
  setTodos();
  showTodos();
}

// setCompleted
function setCompleted(id) {
  const completedTodos = todos.map((item, i) => {
    if (id == i) {
      return { ...item, completed: item.completed == true ? false : true };
    } else {
      return { ...item };
    }
  });
  todos = completedTodos;
  setTodos();
  showTodos();
}

//edit form
formEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = formEdit["input-edit"].value.trim();
  formEdit.reset();
  if (todoText.length) {
    todos.splice(editItemId, 1, {
      text: todoText,
      time: getTime(),
      completed: false,
    });
    console.log(todos);
    setTodos();
    showTodos();
    close();
  } else {
    showMessage("message-edit", "Please, enter some text...");
  }
});
//edit todo
function editTodo(id) {
  open();
  editItemId = id;
}

overlay.addEventListener("click", close);
closeEl.addEventListener("click", close);
document.addEventListener("keydown", (e) => {
  if (e.keyCode == 27 || e.keyCode == 40) {
    close();
  }
  console.log(e);
});

function open() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

function close() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}
