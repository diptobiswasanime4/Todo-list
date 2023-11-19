import { selector } from "recoil";
import { editState } from "../atoms/EditState";

export const curEditState = selector({
  key: "curEditState",
  get: ({ get }) => {
    const editMode = get(editState);

    return editMode;
  },
});
