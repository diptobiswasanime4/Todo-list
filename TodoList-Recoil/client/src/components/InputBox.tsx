import React, {useState} from 'react'
import {useRecoilState} from "recoil"
import { todoState } from "../state/atoms/TodoState";
import { v4 } from "uuid";

function InputBox() {
    const [todos, setTodos] = useRecoilState(todoState);
    const [inputText, setInputText] = useState("");
    function addTodo() {
        setTodos((prevTodos) => [
          ...prevTodos,
          { id: v4(), name: inputText, completed: false },
        ]);
      }
    
      function clearTodo() {
        setTodos([]);
      }
  return (
    <div className="flex gap-2">
        <input
          className="text-xl"
          type="text"
          placeholder="Enter Todo"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          onClick={addTodo}
          className="bg-green-600 hover:bg-green-500 rounded-md text-white py-1 px-3 text-xl"
        >
          Add
        </button>
        <button
          onClick={clearTodo}
          className="bg-gray-500 hover:bg-gray-400 rounded-md text-white py-1 px-3 text-xl"
        >
          Clear
        </button>
      </div>
  )
}

export default InputBox