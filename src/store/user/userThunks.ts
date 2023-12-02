import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { LoginCredentials, UserResponse, MessageResponse, RegisterCredentials, User } from '../../types';

const AUTH_BASE_URL = "http://127.0.0.1:5000/auth";
const USER_BASE_URL = 'http://127.0.0.1:5000/user';

axios.defaults.withCredentials = true;

export const loginUser = createAsyncThunk<
  UserResponse,
  LoginCredentials,
  { rejectValue: string }
>(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post<UserResponse>(`${AUTH_BASE_URL}/login`, userData);
      return response.data;
    } catch (error) {
      let message = 'Login failed';
      if (axios.isAxiosError(error) && error.response) {
        message = error.response.data.error || message;
      }
      return rejectWithValue(message);
    }
});

export const registerUser = createAsyncThunk<
  MessageResponse,
  RegisterCredentials,
  { rejectValue: string }
>(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post<MessageResponse>(`${AUTH_BASE_URL}/register`, userData);
      return response.data;
    } catch (error) {
      let message = 'Registration failed';
      if (axios.isAxiosError(error) && error.response) {
        message = error.response.data.error || message;
      }
      return rejectWithValue(message);
    }
});

export const logoutUser = createAsyncThunk<
  MessageResponse,
  void,
  { rejectValue: string }
>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post<MessageResponse>(`${AUTH_BASE_URL}/logout`);
      return response.data;
    } catch (error) {
      let message = 'Logout failed';
      if (axios.isAxiosError(error) && error.response) {
        message = error.response.data.error || message;
      }
      return rejectWithValue(message);
    }
});

export const fetchUserProfile = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<User>(`${USER_BASE_URL}/profile`);
      return response.data;
    } catch (error) {
      let message = 'Fetching user profile failed';
      if (axios.isAxiosError(error) && error.response) {
        message = error.response.data.error || message;
      }
      return rejectWithValue(message);
    }
});

export const updateUserProfile = createAsyncThunk<
  UserResponse,
  {username: string, email: string},
  { rejectValue: string }
>(
  'user/updateProfile',
  async (updateData, { rejectWithValue }) => {
    try {
      const response = await axios.put<UserResponse>(`${USER_BASE_URL}/profile/update`, updateData);
      return response.data;
    } catch (error) {
      let message = 'Updating user profile failed';
      if (axios.isAxiosError(error) && error.response) {
        message = error.response.data.error || message;
      }
      return rejectWithValue(message);
    }
});

export const updateUserPassword = createAsyncThunk<
  MessageResponse,
  { old_password: string; new_password: string },
  { rejectValue: string }
>(
  'user/updatePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await axios.put<MessageResponse>(`${USER_BASE_URL}/profile/update/password`, passwordData);
      return response.data;
    } catch (error) {
      let message = 'Updating user password failed';
      if (axios.isAxiosError(error) && error.response) {
        message = error.response.data.error || message;
      }
      return rejectWithValue(message);
    }
});

export const deleteUserProfile = createAsyncThunk<
  MessageResponse,
  void,
  { rejectValue: string }
>(
  'user/deleteProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete<MessageResponse>(`${USER_BASE_URL}/profile/delete`);
      return response.data;
    } catch (error) {
      let message = 'Deleting user profile failed';
      if (axios.isAxiosError(error) && error.response) {
        message = error.response.data.error || message;
      }
      return rejectWithValue(message);
    }
});