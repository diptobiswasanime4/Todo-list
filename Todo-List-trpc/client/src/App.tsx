import { useState, useEffect } from "react";
import { createTRPCReact } from "@trpc/react-query";
import { AppRouter } from "../../api/dist/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";

const trpc = createTRPCReact<AppRouter>();

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [httpBatchLink({ url: "http://localhost:3000/trpc" })],
    })
  );
  const [inputTodo, setInputTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const todosQuery = trpc.useQuery(["getTodos"], {});

  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient}>
        <div className="bg-green-100 flex flex-col gap-8 pt-8 pb-32 items-center">
          <div className="text-2xl">Todo List TRPC</div>
          <div className="flex gap-2">
            <input
              className="text-xl rounded-md shadow-md"
              type="text"
              placeholder="Enter Todo"
              value={inputTodo}
              onChange={(e) => setInputTodo(e.target.value)}
            />
            <button className="bg-blue-600 hover:bg-blue-500 shadow-md px-2 py-1 text-lg rounded-md text-white">
              Add
            </button>
            <button className="bg-gray-500 hover:bg-gray-400 shadow-md px-2 py-1 text-lg rounded-md text-white">
              Clear
            </button>
          </div>
          <ul>
            {todosQuery.data?.map((todo) => (
              <li key={todo.id}>{todo.desc}</li> // 3. Display the todos
            ))}
          </ul>
        </div>
      </trpc.Provider>
    </QueryClientProvider>
  );
}

export default App;
