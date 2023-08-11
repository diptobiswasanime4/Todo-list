import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([
    "Write JavaScript",
    "Write Python",
    "Write SQL",
  ]);
  const [inputVal, setInputVal] = useState("");

  function addTodo() {
    setTodos((prevTodos) => [...prevTodos, inputVal]);
    setInputVal("");
  }

  function writeTodo(e) {
    setInputVal(e.target.value);
  }

  function delTodo(index) {
    setTodos((prevTodos) =>
      prevTodos.filter((_, todoIndex) => {
        return todoIndex != index;
      })
    );
  }
  return (
    <main>
      <h1>Todo List Vanilla</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter todo"
          onChange={writeTodo}
          value={inputVal}
        />
        <button onClick={addTodo}>+</button>
      </div>
      <div className="container">
        {todos.map((todo, index) => {
          return (
            <div className="todo" key={index}>
              <p>{todo}</p>
              <div className="actions">
                <input type="checkbox" />
                <button onClick={() => delTodo(index)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default App;
