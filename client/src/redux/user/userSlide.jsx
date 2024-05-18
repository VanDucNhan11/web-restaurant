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
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInError: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
    // Action để đăng xuất người dùng
    logoutUser: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
  }
});

export const { signInStart, signInSuccess, signInError, logoutUser } = userSlice.actions;
export default userSlice.reducer;
