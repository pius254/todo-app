import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import ToDoList from "./TodoList";

const todosInitialState = {
  todos: [
    { id: 1, text: "finishing writing hooks chapter" },
    { id: 2, text: "play with kids" },
    { id: 3, text: "read bible" },
  ],
};

function todosReducer(state, action) {
  switch (action.type) {
    case "add":
      const newToDo = { id: uuidv4(), text: action.payload };
      // add new todo onto array
      const addedToDos = [...state.todos, newToDo];
      // spread our state and assign todos
      return { ...state, todos: addedToDos };
    case "delete":
      const filteredTodoState = state.todos.filter(
        (todo) => todo.id !== action.payload.id
      );
      return { ...state, todos: filteredTodoState };
    default:
      return todosInitialState;
  }
}

export const TodosContext = React.createContext();

function App() {
  const [state, dispatch] = useReducer(todosReducer, todosInitialState);
  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <ToDoList />
    </TodosContext.Provider>
  );
}

export default App;
