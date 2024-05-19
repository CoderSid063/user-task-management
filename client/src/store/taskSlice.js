// src/features/dataSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { tasks } from "../assets/data";

const taskSlice = createSlice({
  name: "tasks",
  initialState: tasks,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    removeTask: (state, action) => {
      return state.filter((item) => item._id !== action.payload);
    },
    updateTask: (state, action) => {
      const index = state.findIndex((item) => item._id === action.payload._id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const taskActions = taskSlice.actions;
export default taskSlice;
