const inputTodo = document.getElementById("input-todo");
const addTodo = document.getElementById("add-todo");
const todoContainer = document.querySelector(".container");

fetch("http://localhost:3000/todos")
  .then((res) => res.json())
  .then((data) => console.log(data));

// addTodo.addEventListener("click", (e) => {
//   if (inputTodo.value != "") {
//     displayTodo(inputTodo.value);
//     inputTodo.value = "";
//   }
// });

// function displayTodo(todoValue) {
//   let todo = document.createElement("div");
//   todo.classList.add("todo");

//   let todoText = document.createElement("p");
//   todoText.innerText = todoValue;

//   let todoActions = document.createElement("div");
//   todoActions.classList.add("actions");

//   let checkbox = document.createElement("input");
//   checkbox.setAttribute("type", "checkbox");
//   let delBtn = document.createElement("button");
//   delBtn.innerText = "Delete";

//   delBtn.addEventListener("click", () => {
//     todoContainer.removeChild(todo);
//   });

//   todoActions.appendChild(checkbox);
//   todoActions.appendChild(delBtn);

//   todo.appendChild(todoText);
//   todo.appendChild(todoActions);

//   todoContainer.appendChild(todo);
// }
