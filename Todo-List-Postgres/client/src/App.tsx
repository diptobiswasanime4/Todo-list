import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

function App() {
  const [inputTodo, setInputTodo] = useState("");
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const resp = axios.get("/todos").then((resp) => {
      setTodos(resp.data);
    });
  }, []);

  async function addTodo(e) {
    e.preventDefault();
  }
  async function editTodo(e, todo) {
    e.preventDefault();
  }
  async function DeleteTodo(e, todo) {
    e.preventDefault();
  }

  return (
    <div className="flex flex-col items-center gap-8 pt-8 pb-16 bg-blue-50">
      <div className="text-2xl">Todo List PostgreSQL</div>
      <div className="flex gap-2">
        <input
          className="text-xl rounded-lg shadow-md"
          type="text"
          placeholder="Enter Todo"
          value={inputTodo}
          onChange={(e) => setInputTodo(e.target.value)}
        />
        <button
          onClick={addTodo}
          className="text-lg bg-red-600 hover:bg-red-500 text-white py-1 px-2 rounded-xl"
        >
          Add
        </button>
        <button className="text-lg bg-gray-500 hover:bg-gray-400 text-white py-1 px-2 rounded-xl">
          Clear
        </button>
      </div>
      <div className="flex flex-col gap-2 border bg-blue-200 rounded-lg p-2 w-5/6">
        {todos.map((todo, index) => {
          return (
            <div
              className="flex items-center justify-between bg-blue-700 rounded-md p-2 text-white"
              key={index}
            >
              <div className="text-lg">{todo.todo_desc}</div>
              <div className="flex gap-2">
                <button
                  onClick={(e) => editTodo(e, todo)}
                  className="bg-green-600 hover:bg-green-500 text-white py-1 px-2 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => deleteTodo(e, todo)}
                  className="bg-red-600 hover:bg-red-500 text-white py-1 px-2 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
