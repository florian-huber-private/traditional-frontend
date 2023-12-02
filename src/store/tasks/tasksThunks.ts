import { createAsyncThunk } from "@reduxjs/toolkit";
import { MessageResponse, Task, TaskResponse } from "../../types";
import axios from "axios";

const BASE_URL = 'http://127.0.0.1:5000/tasks';

axios.defaults.withCredentials = true;

export const fetchAllTasks = createAsyncThunk<
  Task[],
  void,
  { rejectValue: string }
>(
  'tasks/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Task[]>(`${BASE_URL}/`);
      return response.data;
    } catch (error) {
      let message = 'Fetching tasks failed';
      if (axios.isAxiosError(error) && error.response) {
        message = error.response.data.error || message;
      }
      return rejectWithValue(message);
    }
});

export const createTask = createAsyncThunk<
  TaskResponse,
  Omit<Task, 'id' | 'user_id' | 'creation_date'>,
  { rejectValue: string }
>(
  'tasks/create',
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await axios.post<TaskResponse>(`${BASE_URL}/`, taskData);
      return response.data;
    } catch (error) {
      let message = 'Creating task failed';
      if (axios.isAxiosError(error) && error.response) {
        message = error.response.data.error || message;
      }
      return rejectWithValue(message);
    }
});

export const updateTask = createAsyncThunk<
  TaskResponse,
  { taskId: number, updateData: Omit<Task, 'id' | 'user_id' | 'creation_date'> },
  { rejectValue: string }
>(
  'tasks/update',
  async ({ taskId, updateData }, { rejectWithValue }) => {
    try {
      const response = await axios.put<TaskResponse>(`${BASE_URL}/${taskId}`, updateData);
      return response.data;
    } catch (error) {
      let message = 'Updating task failed';
      if (axios.isAxiosError(error) && error.response) {
        message = error.response.data.error || message;
      }
      return rejectWithValue(message);
    }
});

export const deleteTask = createAsyncThunk<
  MessageResponse,
  number,
  { rejectValue: string }
>(
  'tasks/delete',
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await axios.delete<MessageResponse>(`${BASE_URL}/${taskId}`);
      response.data.id = taskId;
      return response.data;
    } catch (error) {
      let message = 'Deleting task failed';
      if (axios.isAxiosError(error) && error.response) {
        message = error.response.data.error || message;
      }
      return rejectWithValue(message);
    }
});
