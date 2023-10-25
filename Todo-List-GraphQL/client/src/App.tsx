import { useState } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  gql,
} from "@apollo/client";
import "./App.css";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  // cache: new InMemoryCache(),
});

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      completed
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    addTodo(title: $title) {
      id
      title
      completed
    }
  }
`;

const TOGGLE_COMPLETED = gql`
  mutation ToggleCompleted($id: ID!) {
    toggleCompleted(id: $id) {
      id
      completed
    }
  }
`;

function App() {
  const [todoInput, setTodoInput] = useState("");
  const { loading } = useQuery(GET_TODOS);

  async function handleAddTodo(e) {
    e.preventDefault();
    if (todoInput !== "") {
      await addTodo({
        variables: { title: todoInput },
      });
      setTodoInput("");
      refetch();
    }
  }

  async function handleToggleCompleted(id: string) {
    await toggleCompleted({
      variables: { id },
    });
    refetch();
  }

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  return (
    <ApolloProvider client={client}>
      <div className="bg-blue-100 flex flex-col items-center gap-4 pt-8 pb-96">
        <div className="text-2xl">Todo List GraphQL</div>
        <input
          type="text"
          placeholder="Enter Todo"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
          className="border text-xl rounded shadow"
        />
        <button
          className="bg-green-600 hover:bg-green-500 px-3 py-1 text-white text-xl rounded-full"
          onClick={handleAddTodo}
        >
          Add
        </button>

        {/* <ul className="mt-4 w-64">
          {data.todos.map((todo: any) => (
            <li
              key={todo.id}
              className="flex justify-between items-center mt-2"
            >
              <span
                className={todo.completed ? "line-through" : ""}
                onClick={() => handleToggleCompleted(todo.id)}
              >
                {todo.title}
              </span>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleCompleted(todo.id)}
              />
            </li>
          ))}
        </ul> */}
      </div>
    </ApolloProvider>
  );
}

export default App;
