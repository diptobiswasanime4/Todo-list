import { atom } from "recoil";

export const todoState = atom({
  key: "TodoState",
  default: [],
});
