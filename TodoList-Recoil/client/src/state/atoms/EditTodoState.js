import { atom } from "recoil";

export const editTodoState = atom({
  key: "EditTodoState",
  default: {
    id: "",
    name: "",
    completed: false
  },
});
