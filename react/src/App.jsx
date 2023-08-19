import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputVal, setInputVal] = useState("");

  function writeTodo(e) {
    setInputVal(e.target.value);
  }

  function addTodo() {
    if (inputVal != "") {
      setTodos((prevTodos) => [...prevTodos, inputVal]);
      setInputVal("");
    }
  }

  function delTodo(todoIndex) {
    setTodos((prevTodos) =>
      prevTodos.filter((prevTodo, prevTodoIndex) => {
        return prevTodoIndex != todoIndex;
      })
    );
  }

  return (
    <main>
      <h1>Todo List React</h1>
      <InputContainer
        inputVal={inputVal}
        writeTodo={writeTodo}
        addTodo={addTodo}
      ></InputContainer>
      <TodoContainer todos={todos} delTodo={delTodo}></TodoContainer>
    </main>
  );
}

function InputContainer({ inputVal, writeTodo, addTodo }) {
  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="Enter todo"
        value={inputVal}
        onChange={writeTodo}
      />
      <button onClick={addTodo}>+</button>
    </div>
  );
}

function TodoContainer({ todos, delTodo }) {
  return (
    <div className="container">
      {todos.map((todo, index) => {
        return (
          <Todo key={index} todo={todo} index={index} delTodo={delTodo}></Todo>
        );
      })}
    </div>
  );
}

function Todo({ todo, index, delTodo }) {
  return (
    <div className="todo">
      <p>{todo}</p>
      <div className="actions">
        <input type="checkbox" />
        <button onClick={() => delTodo(index)}>Delete</button>
      </div>
    </div>
  );
}

export default App;
