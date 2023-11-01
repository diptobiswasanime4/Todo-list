import { useState } from "react";
import { AppRouter } from "../../api/dist/index";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
    }),
  ],
});

function App() {
  const [inputTodo, setInputTodo] = useState("");

  async function getGreet() {
    console.log(1);

    const resp = await trpc.greet.query((req) => {
      return req.msg;
    });
    console.log(resp);
  }

  return (
    <div className="">
      <div className="">Todo List TRPC</div>
      <div className="">
        <input
          type="text"
          placeholder="Enter Todo"
          value={inputTodo}
          onChange={(e) => setInputTodo(e.target.value)}
        />
        <button onClick={getGreet}>Add</button>
        <button>Clear</button>
      </div>
    </div>
  );
}

export default App;
