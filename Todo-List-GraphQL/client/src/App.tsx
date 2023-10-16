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
  cache: new InMemoryCache(),
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

function App() {
  const [todoInput, setTodoInput] = useState("");

  return (
    <div className="bg-blue-100 flex flex-col items-center gap-4 pt-8 pb-96">
      <div className="text-2xl">Todo List GraphQL</div>
      <input
        type="text"
        placeholder="Enter Todo"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
        className="border text-xl rounded-md shadow"
      />
      <button className="bg-green-600 hover:bg-green-500 px-3 py-1 text-white text-xl rounded-full">
        Add
      </button>
    </div>
  );
}

export default App;
