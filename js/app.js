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

//Set todos to localstorage
function setTodos() {
  localStorage.setItem('list', JSON.stringify(todos))


}

//show todos
function showTodos() {
  const todos = JSON.parse(localStorage.getItem('list'))

}


//show error

function showMessage(where, message) {
  document.getElementById(`${where}`).textContent = message
  setTimeout(() => {
    document.getElementById(`${where}`).textContent = ''

  }, 2500);

}

// Get Todos
formCreate.addEventListener('submit', (e) => {
  e.preventDefault()
  const todoText = formCreate['input-create'].value.trim()
  formCreate.reset()
  if (todoText.length) {
    todos.push({ text: todoText, time: '15:46, 05.03.2023', compleated: false })
    console.log(todos);
    setTodos()
  } else {
    showMessage('message-create', "Please, enter some text...")
  }
})