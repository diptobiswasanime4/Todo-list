import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      desc
      completed
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($desc: String!) {
    addTodo(desc: $desc) {
      id
      desc
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

function TodoList() {
  const [todoText, setTodoText] = useState("");
  const { data, refetch } = useQuery(GET_TODOS);
  const [addTodo] = useMutation(ADD_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);

  async function handleAddTodo(e) {
    await addTodo({
      variables: {
        desc: todoText,
      },
    });
    setTodoText("");
    refetch();
  }

  async function handleDeleteTodo(id) {
    await deleteTodo({
      variables: { id },
    });
    refetch();
  }

  return (
    <div className="flex flex-col items-center gap-8 pt-8 pb-32 bg-purple-200">
      <div className="text-2xl">Todo List GraphQL</div>
      <div className="flex gap-2">
        <input
          className="text-xl rounded-md shadow-md"
          type="text"
          placeholder="Enter Todo"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 text-lg rounded-md"
        >
          Add
        </button>
        <button className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 text-lg rounded-md">
          Clear
        </button>
      </div>
      <div className="flex flex-col gap-4 w-5/6">
        {data &&
          data.todos.map((todo, index) => {
            return (
              <div
                key={index}
                className="bg-violet-600 rounded-md p-2 flex justify-between items-center shadow-md"
              >
                <div className="flex gap-2">
                  <input type="checkbox" value={todo.completed} readOnly />
                  <div className="text-white text-lg">{todo.desc}</div>
                </div>
                <div className="flex gap-2">
                  <button className="bg-green-600 hover:bg-green-500 text-white px-1 text-lg rounded-md">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="bg-red-600 hover:bg-red-500 text-white px-1 text-lg rounded-md"
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

export default TodoList;
