import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageResponse, Task, TaskResponse } from '../../types';
import { fetchAllTasks, createTask, updateTask, deleteTask } from './tasksThunks';

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
}

const initialState: TaskState = {
  tasks: [],
  isLoading: false,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchAllTasks.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<TaskResponse>) => {
        state.isLoading = false;
        state.tasks.push(action.payload.task);
      })
      .addCase(createTask.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<TaskResponse>) => {
        state.isLoading = false;
        const index = state.tasks.findIndex(task => task.id === action.payload.task.id);
        if (index !== -1) {
          state.tasks[index] = action.payload.task;
        }
      })
      .addCase(updateTask.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<MessageResponse>) => {
        state.isLoading = false;
        state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
      })
      .addCase(deleteTask.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const taskActions = tasksSlice.actions;

export default tasksSlice.reducer;
