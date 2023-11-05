"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Todos() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editTodoInfo, setEditTodoInfo] = useState({
    id: "",
    desc: "",
    completed: false,
  });

  useEffect(() => {
    axios.get("/api/todos").then((resp) => {
      console.log(resp.data);
      setTodos(resp.data.todos);
    });
  }, []);

  async function addTodo(e) {
    const data = {
      desc: inputText,
    };
    const resp = await axios.post("/api/todos", data);
    console.log(resp);
  }

  async function clearTodos(e) {
    const resp = await axios.delete("/api/todos");
    console.log(resp);

    setTodos([]);
  }

  async function deleteTodo(e, todo) {
    const id = todo.id;
    console.log(id);

    const resp = await axios.delete(`/api/todos/${id}`);
    console.log(resp);
  }

  async function editTodo(e, todo) {
    setEditMode(true);
    setEditTodoInfo({
      id: todo.id,
      desc: todo.desc,
      completed: todo.completed,
    });
  }
  async function updateTodo(e) {
    const data = {
      desc: editTodoInfo.desc,
      completed: editTodoInfo.completed,
    };
    const resp = await axios.put(`/api/todos/${editTodoInfo.id}`, data);
    console.log(resp);
    setEditMode(false);
  }

  if (editMode) {
    return (
      <div className="flex flex-col items-center gap-8 pt-8 pb-32 bg-violet-200">
        <div className="text-2xl">Edit Todo</div>
        <div className="flex gap-4">
          <div className="text-lg">Edit Desc:</div>
          <input
            className="rounded-md shadow-md text-lg"
            type="text"
            placeholder="Write new desc"
            value={editTodoInfo.desc}
            onChange={(e) =>
              setEditTodoInfo({ ...editTodoInfo, desc: e.target.value })
            }
          />
        </div>
        <div className="flex gap-4">
          <div className="text-lg">Edit Completed: </div>
          <input
            type="checkbox"
            checked={editTodoInfo.completed}
            onChange={(e) =>
              setEditTodoInfo({
                ...editTodoInfo,
                completed: !editTodoInfo.completed,
              })
            }
          />
        </div>
        <button
          onClick={updateTodo}
          className="text-xl shadow-md bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-md"
        >
          Submit
        </button>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-8 pt-8 pb-32 bg-violet-200">
      <div className="text-2xl">Todo List Next</div>
      <div className="flex gap-2">
        <input
          className="text-xl rounded-md shadow-md"
          type="text"
          placeholder="Enter Todo"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          onClick={addTodo}
          className="text-xl shadow-md bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-md"
        >
          Add
        </button>
        <button
          onClick={clearTodos}
          className="text-xl shadow-md bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded-md"
        >
          Clear
        </button>
      </div>
      <div className="w-5/6 flex flex-col gap-2">
        {todos.map((todo, index) => {
          return (
            <div className="bg-violet-600 rounded-md p-2 text-white flex justify-between items-center shadow-lg">
              <div className="flex gap-2">
                <input type="checkbox" checked={todo.completed} readOnly />
                <div className="text-xl">{todo.desc}</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={(e) => editTodo(e, todo)}
                  className="text-lg shadow-md bg-green-600 hover:bg-green-500 text-white px-1 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => deleteTodo(e, todo)}
                  className="text-lg shadow-md bg-red-600 hover:bg-red-500 text-white px-1 rounded-md"
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
