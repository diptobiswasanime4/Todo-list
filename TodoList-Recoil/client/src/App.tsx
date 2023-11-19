import "./App.css";
import { useRecoilValue } from "recoil";
import { todoState } from "./state/atoms/TodoState";
import Todos from "./components/Todos";
import { totalTodos } from "./state/selectors/TotalTodos";
import {editState} from "./state/atoms/EditState"

function App() {
  const totalTodoState = useRecoilValue(totalTodos);
  const editMode = useRecoilValue(editState)
  
  return (
    <div className="flex flex-col items-center gap-4 pt-4 pb-16 bg-yellow-200">
      <div className="text-2xl">Todo List Recoil</div>
      <Todos />
      {!editMode && <div className="text-xl">Total todos: {totalTodoState}</div>}
    </div>
  );
}

export default App;
