import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasks/tasksSlice'
import categoriesReducer from './categories/categoriesSlice'
import userReducer from './user/userSlice'
import { toastMiddleware } from '../middleware/toastMiddleware';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    categories: categoriesReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(toastMiddleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
