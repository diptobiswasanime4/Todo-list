import React, {useState} from "react";
import { todoState } from "../state/atoms/TodoState";
import { useSetRecoilState, useRecoilState } from "recoil";
import {editState} from "../state/atoms/EditState"
import {editTodoState} from "../state/atoms/EditTodoState"

function Todo({ name, completed, id }) {
  const setTodos = useSetRecoilState(todoState);
  const [editMode, setEditMode] = useRecoilState(editState)
  const [editTodo, setEditTodo] = useRecoilState(editTodoState)
 
  function deleteTodo() {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id != id);
    });
  }

  function editTodoMode() {
    setEditTodo({id: id, completed: completed, name: name})

    setEditMode(true)
  }

  return (
    <div className="bg-orange-500 p-2 text-xl rounded-md text-white flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <input type="checkbox" checked={completed} readOnly />
        <div className="">{name}</div>
      </div>
      <div className="flex gap-2 items-center">
        <button
          onClick={deleteTodo}
          className="bg-red-700 hover:bg-red-600 rounded-md text-white px-2 text-xl"
        >
          Delete
        </button>
        <button onClick={editTodoMode} className="bg-green-600 hover:bg-green-500 rounded-md text-white px-2 text-xl">
          Edit
        </button>
      </div>
    </div>
  );
}

export default Todo;
