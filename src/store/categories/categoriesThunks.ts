import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Category, MessageResponse } from '../../types';

const BASE_URL = 'http://127.0.0.1:5000/categories';

axios.defaults.withCredentials = true;

export const fetchCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>(
  'categories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Category[]>(`${BASE_URL}/`);
      return response.data;
    } catch (error) {
      let message = 'Fetching categories failed';
      if (axios.isAxiosError(error) && error.response) {
        message = error.response.data.error || message;
      }
      return rejectWithValue(message);
    }
});

export type CategoryResponse = {
  message: string; 
  category: Category;
}

export const createCategory = createAsyncThunk<
  CategoryResponse,
  { name: string },
  { rejectValue: string }
>(
  'categories/create',
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await axios.post<CategoryResponse>(`${BASE_URL}/`, categoryData);
      return response.data;
    } catch (error) {
      let message = 'Creating category failed';
      if (axios.isAxiosError(error) && error.response) {
        message = error.response.data.error || message;
      }
      return rejectWithValue(message);
    }
});

export const updateCategory = createAsyncThunk<
  CategoryResponse,
  { categoryId: number, name: string },
  { rejectValue: string }
>(
  'categories/update',
  async ({ categoryId, name }, { rejectWithValue }) => {
    try {
      const response = await axios.put<CategoryResponse>(`${BASE_URL}/${categoryId}`, { name });
      return response.data;
    } catch (error) {
      let message = 'Updating category failed';
      if (axios.isAxiosError(error) && error.response) {
        message = error.response.data.error || message;
      }
      return rejectWithValue(message);
    }
});

export const deleteCategory = createAsyncThunk<
  MessageResponse,
  number,
  { rejectValue: string }
>(
  'categories/delete',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.delete<MessageResponse>(`${BASE_URL}/${categoryId}`);
      response.data.id = categoryId
      return response.data;
    } catch (error) {
      let message = 'Deleting category failed';
      if (axios.isAxiosError(error) && error.response) {
        message = error.response.data.error || message;
      }
      return rejectWithValue(message);
    }
});