import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo, toggleTodo, updateTodo } from "../features/todo/todoSlice";
import { LiaEdit } from "react-icons/lia";
import { MdDeleteForever } from "react-icons/md";
import { FaSave } from "react-icons/fa";

export default function TodoList() {
  // @ts-ignore
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [editInputText, setEditInputText] = useState("");
  const [editableTodo, setEditableTodo] = useState(null);

  const inputRef = useRef(null);

  function handleEditButtonClick(todo) {
    setEditableTodo(todo.id);
    setEditInputText(todo.text);
  }

  function handleSaveButtonClick(todo) {
    saveTodo(todo);
  }

  function submitOnEnter(e, todo) {
    if (e.key === "Enter") {
      saveTodo(todo);
    }
  }

  function handleRemoveTodoButtonClick(todo) {
    dispatch(removeTodo(todo.id));
  }

  function saveTodo(todo) {
    dispatch(updateTodo({ id: todo.id, newText: editInputText }));
    setEditableTodo(null);
  }

  useEffect(() => {
    if (editableTodo) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editableTodo]);

  return (
    <>
      {todos.length > 0 ? (
        <h2 className="text-white font-medium text-2xl mt-10">Current Todos</h2>
      ) : (
        <h2 className="text-white font-medium text-2xl mt-10">No existing todos...</h2>
      )}
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            className="mt-4 ml-auto mr-auto flex justify-between items-center bg-zinc-800 px-4 py-2 rounded max-w-lg"
            key={todo.id}
          >
            <div>
              {editableTodo === todo.id ? (
                <input
                  type="text"
                  className="bg-gray-800 basis-3/4 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  placeholder="Edit todo"
                  value={editInputText}
                  onChange={(e) => setEditInputText(e.target.value)}
                  onKeyDown={(e) => submitOnEnter(e, todo)}
                  ref={inputRef}
                />
              ) : (
                <div
                  onClick={() => dispatch(toggleTodo(todo.id))}
                  className={
                    todo.isCompleted
                      ? "text-white text-opacity-60 line-through"
                      : "text-white"
                  }
                >
                  {todo.text}
                </div>
              )}
            </div>
            <div className="flex items-center space-x-3">
              {editableTodo === todo.id ? (
                <button
                  onClick={() => handleSaveButtonClick(todo)}
                  className={
                    "text-white bg-green-700 border-0 py-2 px-4 focus:outline-none hover:bg-green-800 rounded text-md"
                  }
                >
                  <FaSave />
                </button>
              ) : (
                <button
                  onClick={() => handleEditButtonClick(todo)}
                  className={
                    "text-white bg-purple-700 border-0 py-2 px-4 focus:outline-none hover:bg-purple-800 rounded text-md"
                  }
                >
                  <LiaEdit />
                </button>
              )}

              <button
                onClick={() => handleRemoveTodoButtonClick(todo)}
                className="text-white bg-red-500 border-0 py-2 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
              >
                <MdDeleteForever />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
