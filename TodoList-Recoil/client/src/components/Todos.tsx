import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { todoState } from "../state/atoms/TodoState";
import {editState} from "../state/atoms/EditState"
import Todo from "./Todo";
import InputBox from "./InputBox";
import {editTodoState} from "../state/atoms/EditTodoState"

function Todos() {
  const [todos, setTodos] = useRecoilState(todoState);
  const [editMode, setEditMode] = useRecoilState(editState)
  const [editTodo, setEditTodo]  = useRecoilState(editTodoState)


  function updateTodo() {
    const index = todos.findIndex(todo => todo.id == editTodo.id)

    const updatedTodos = [...todos]

    updatedTodos[index] = editTodo

    setTodos(updatedTodos)

    console.log(todos);
    

    setEditMode(false)
  }
  

  if (editMode) {
    return (
      <div className="flex flex-col gap-4">
        <div className="">
        <label className="text-xl pr-4">Edit Todo:</label>
        <input className="text-xl shadow-md" type="text" placeholder="Edit Todo" value={editTodo.name} onChange={e => setEditTodo({...editTodo, name: e.target.value})} />
      </div>
      <div className="">
        <label className="text-xl pr-4">Edit Completed:</label>
        <input className="text-xl shadow-md" type="checkbox" checked={editTodo.completed} onChange={e => setEditTodo({...editTodo, completed: e.target.checked})} />
      </div>
      <button onClick={updateTodo} className="text-xl bg-green-600 text-white hover:bg-green-500 py-1 rounded-full">Submit</button>
      </div>
    )
  }

  return (
    <div className="">
      <InputBox/>
      <div className="flex flex-col gap-2 pt-4">
        {todos.map((todo) => {
          return (
            <Todo
              key={todo.id}
              name={todo.name}
              completed={todo.completed}
              id={todo.id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Todos;
