import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
        isCompleted: false,
      };
      state.todos.push(todo);

      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);

      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    toggleTodo: (state, action) => {
      const toggledTodo = state.todos.find((todo) => todo.id === action.payload);

      if (toggleTodo) {
        toggledTodo.isCompleted = !toggledTodo.isCompleted;
      }

      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    updateTodo: (state, action) => {
      const updatedTodo = state.todos.find((todo) => todo.id === action.payload.id);

      if (updatedTodo) {
        updatedTodo.text = action.payload.newText;
      }

      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
  },
});

export const { addTodo, removeTodo, toggleTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
