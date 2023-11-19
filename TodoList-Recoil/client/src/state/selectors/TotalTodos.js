import { selector } from "recoil";
import { todoState } from "../atoms/TodoState";

export const totalTodos = selector({
  key: "totalTodos",
  get: ({ get }) => {
    const todos = get(todoState);

    return todos.length;
  },
});
