import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = {
        ...action.payload.user,
        role: action.payload.role, // Lưu vai trò người dùng
      };
      state.loading = false;
      state.error = null;
    },
    signInError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    updateProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateProfileSuccess: (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        ...action.payload.updatedUser, // Thông tin người dùng được cập nhật
      };
      state.loading = false;
      state.error = null;
    },
    updateProfileError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
});

export const { signInStart, signInSuccess, signInError, logoutUser, updateProfileStart, updateProfileSuccess, updateProfileError } = userSlice.actions;
export default userSlice.reducer;
