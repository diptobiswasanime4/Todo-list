import { router, publicProcedure } from "./trpc";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import express from "express";
import cors from "cors";
// import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";

const todoInputType = z.object({
  id: z.string(),
  desc: z.string(),
  completed: z.boolean(),
});

const appRouter = router({
  greet: publicProcedure.query(() => {
    return {
      msg: "Hello World",
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
// const server = createHTTPServer({
//   router: appRouter,
// });

// server.listen(3000);

export type AppRouter = typeof appRouter;
