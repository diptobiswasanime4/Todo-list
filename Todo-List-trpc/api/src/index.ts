import { router } from "./trpc";
import { z } from "zod";

const todoInputType = z.object({
  title: z.string(),
  description: z.string(),
});

const appRouter = router({
  // ...
});

export type AppRouter = typeof appRouter;
