import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";

export default function AddTodo() {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    if (!todo) {
      return;
    }
    dispatch(addTodo(todo));
    setTodo("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-x-3 mt-12 max-w-lg mr-auto ml-auto flex items-center justify-center"
    >
      <input
        type="text"
        className="bg-gray-800 basis-3/4 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        autoFocus
      />
      <button
        type="submit"
        className="text-white bg-indigo-500 basis-1/4 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        Add Todo
      </button>
    </form>
  );
}
