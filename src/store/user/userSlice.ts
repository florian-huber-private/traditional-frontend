import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserResponse } from '../../types';
import { loginUser, logoutUser, registerUser, fetchUserProfile, updateUserProfile, updateUserPassword, deleteUserProfile } from './userThunks';

interface UserState {
  user: User | undefined;
  isLoading: boolean;
}

const initialState: UserState = {
  user: undefined,
  isLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<UserResponse>) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = undefined;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = undefined;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<UserResponse>) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUserProfile.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUserPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUserPassword.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserProfile.fulfilled, (state) => {
        state.isLoading = false;
        state.user = undefined;
      })
      .addCase(deleteUserProfile.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
