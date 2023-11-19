import { selector } from "recoil";
import { editTodoState } from "../atoms/EditTodoState";

export const totalTodos = selector({
  key: "EditTodoState",
  get: ({ get }) => {
    const curTodo = get(editTodoState);

    return curTodo
  },
});
