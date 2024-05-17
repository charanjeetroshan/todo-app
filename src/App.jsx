import React from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="text-center p-8">
      <h1 className="text-4xl font-bold text-white">Todos App</h1>
      <AddTodo />
      <TodoList />
    </div>
  );
}

export default App;
