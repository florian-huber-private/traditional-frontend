import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category, MessageResponse } from '../../types';
import { fetchCategories, createCategory, updateCategory, deleteCategory, CategoryResponse } from './categoriesThunks';

interface CategoriesState {
  categories: Category[];
  isLoading: boolean;
}

const initialState: CategoriesState = {
  categories: [],
  isLoading: false,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action: PayloadAction<CategoryResponse>) => {
        state.isLoading = false;
        state.categories.push(action.payload.category);
      })
      .addCase(createCategory.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action: PayloadAction<CategoryResponse>) => {
        state.isLoading = false;
        const index = state.categories.findIndex(category => category.id === action.payload.category.id);
        if (index !== -1) {
          state.categories[index] = action.payload.category;
        }
      })
      .addCase(updateCategory.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<MessageResponse>) => {
        state.isLoading = false;
        state.categories = state.categories.filter(category => category.id !== action.payload.id);
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const categoriesActions = categoriesSlice.actions;

export default categoriesSlice.reducer;