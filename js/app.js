const formCreate = document.getElementById('form-create')
const formEdit = document.getElementById('form-edit')
const listGroupTodo = document.getElementById('list-group-todo')
// const messageCreate = document.getElementById('message-create')
const time = document.getElementById('time')
const modal = document.getElementById('modal')
const overlay = document.getElementById('overlay')
/* time elements */
const fullDay = document.getElementById('full-day')
const hourEl = document.getElementById('hour')
const minuteEl = document.getElementById('minute')
const secondEl = document.getElementById('second')
const closeEl = document.getElementById('close')

// chek
let todos = JSON.parse(localStorage.getItem("list")) ? JSON.parse(localStorage.getItem("list")) : [];

if (todos.length) showTodos()


//Set todos to localstorage
function setTodos() {
  localStorage.setItem('list', JSON.stringify(todos))
}

//time
function getTime() {
  const now = new Date()
  const date = now.getDate()
  const month = now.getMonth() + 1
  const year = now.getFullYear()
  const hours = now.getHours()
  const minut = now.getMinutes()

  return `${date <= 9 ? '0' + date : date}.${month <= 9 ? '0' + month : month}.${year} ${hours <= 9 ? '0' + hours : hours}:${minut <= 9 ? '0' + minut : minut}`


}


//show todos
function showTodos() {
  const todos = JSON.parse(localStorage.getItem('list'))
  listGroupTodo.innerHTML = ""
  todos.forEach((item, i) => {
    listGroupTodo.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-between">
  ${item.text}
  <div class="todo-icons">
    <span class="opacity-50 me-2">${getTime()}</span>
    <img src="img/edit.svg" alt="edit icon" width="25" height="25">
      <img src="img/delete.svg" alt="delete icon" width="25" height="25">

      </div>
    </li>` })
}


//show error

function showMessage(where, message) {
  document.getElementById(`${where}`).textContent = message
  setTimeout(() => {
    document.getElementById(`${where}`).textContent = ''

  }, 2500);
}

/* */

// Get Todos
formCreate.addEventListener('submit', (e) => {
  e.preventDefault()
  const todoText = formCreate['input-create'].value.trim()
  formCreate.reset()
  if (todoText.length) {
    todos.push({ text: todoText, time: '15:46, 05.03.2023', compleated: false })
    console.log(todos);
    setTodos()
    showTodos()
  } else {
    showMessage('message-create', "Please, enter some text...")
  }
})