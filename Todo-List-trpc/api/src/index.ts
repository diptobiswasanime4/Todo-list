import { router, publicProcedure } from "./trpc";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import express from "express";
import cors from "cors";
import { z } from "zod";

const todoInputType = z.object({
  id: z.string(),
  desc: z.string(),
  completed: z.boolean(),
});

const todos = [
  {
    id: "1",
    desc: "Write Code",
    completed: false,
  },
];

const appRouter = router({
  getTodos: publicProcedure.query(() => {
    return todos;
  }),
  createTodo: publicProcedure.input(todoInputType).mutation(async (opts) => {
    const { id, desc, completed } = opts.input;
    todos.push({ id, desc, completed });
    return {
      msg: "Todo created",
      id,
    };
  }),
});

const app = express();

app.use(cors());
app.use("/trpc", createExpressMiddleware({ router: appRouter }));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}...`);
});

export type AppRouter = typeof appRouter;
