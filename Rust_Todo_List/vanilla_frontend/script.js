let input = document.querySelector('input')
let addBtn = document.getElementById("add")

addBtn.addEventListener("click", e => {
    post_todos()
})

let todos = []

async function get_todos() {
    try {
        let resp = await fetch("http://127.0.0.1:3000/todos");
        todos = await resp.json();
        console.log(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

async function post_todos() {
    let todo_body = input.value;

    console.log(todo_body);

    let response = await fetch("http://127.0.0.1:3000/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: todo_body,
        }),
    });
}

async function delete_todos() {
    let response = await fetch("http://127.0.0.1:3000/todos", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: todo_body,
        }),
    });
}

get_todos();

function update_todos(todo) {
    let todo_body = document.createElement("p")
    todo_body.innerText = todo.title


}