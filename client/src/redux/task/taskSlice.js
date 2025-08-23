import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    createTaskStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createTaskSuccess: (state, action) => {
      state.loading = false;
      state.tasks.push(action.payload);
    },
    createTaskFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { createTaskStart, createTaskSuccess, createTaskFailure } =
  taskSlice.actions;

export default taskSlice.reducer;

// Async thunk for creating a task
export const createTask = (taskData) => async (dispatch) => {
  try {
    dispatch(createTaskStart());

    const API = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");

    const res = await fetch(`${API}/api/task/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to create task");

    dispatch(createTaskSuccess(data));
  } catch (error) {
    dispatch(createTaskFailure(error.message));
  }
};
