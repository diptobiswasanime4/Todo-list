const inputTodo = document.getElementById("input-todo");
const addTodo = document.getElementById("add-todo");
const todoContainer = document.querySelector(".container");

addTodo.addEventListener("click", (e) => {
  if (inputTodo.value != "") {
    displayTodo(inputTodo.value);
    inputTodo.value = "";
  }
});

function displayTodo(todoValue) {
  let todoWrapper = document.createElement("div");

  todoWrapper.innerHTML = `
  <div class="todo bg-white flex items-center justify-between mx-8 my-2 px-4 py-4 text-lg rounded">
  <p>${inputTodo.value}</p>
  <div class="actions">
  <input type="checkbox" class="mx-4">
  <button class="delete-btn bg-red-500 text-white py-1 px-2 rounded">Delete</button>
  </div>
  </div>
  `;
  let deleteBtn = todoWrapper.querySelector(".delete-btn");

  deleteBtn.addEventListener("click", function delTodo() {
    todoWrapper.remove();
  });

  todoContainer.appendChild(todoWrapper);
}
