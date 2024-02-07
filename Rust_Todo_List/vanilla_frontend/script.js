let input = document.querySelector("input");
let addBtn = document.getElementById("add");
let delBtn = document.querySelectorAll(".delete");

let todos = [];

get_todos();

addBtn.addEventListener("click", (e) => {
  if (input.value != "") {
    post_todo();
  }
});

async function get_todos() {
  try {
    let resp = await fetch("http://127.0.0.1:3000/todos");
    todos = await resp.json();
    for (let i = 0; i < todos.length; i++) {
      render_todo(todos[i]);
    }
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
}

function render_todo(t) {
  let todo = document.createElement("div");
  todo.classList.add("todo");

  let text = document.createElement("p");
  text.innerText = t.title;

  let dBtn = document.createElement("button");
  dBtn.classList.add("delete");
  dBtn.innerText = "Delete";

  dBtn.addEventListener("click", () => {
    delete_todo(t.id);
  });

  todo.appendChild(text);
  todo.appendChild(dBtn);

  document.querySelector("body").appendChild(todo);
}

async function post_todo() {
  try {
    let todo_body = input.value;

    let resp = await fetch("http://127.0.0.1:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: todo_body,
      }),
    });
    location.reload();
  } catch (error) {
    console.error("Error posting todo:", error);
  }
}

async function delete_todo(id) {
  try {
    let resp = await fetch(`http://127.0.0.1:3000/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    location.reload();
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
}
