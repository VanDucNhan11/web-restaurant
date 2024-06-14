import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
  success: null, 
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null; // Đặt lại success khi bắt đầu đăng nhập
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      state.success = null; // Đặt lại success khi đăng nhập thành công
    },
    signInError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = null; // Đặt lại success khi xảy ra lỗi
    },
    signInClear: (state) => {
      state.success = null; // Xóa thông báo thành công
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
      state.success = null; // Xóa thông báo thành công khi đăng xuất
    },
    updateProfileStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = null; // Đặt lại success khi bắt đầu cập nhật hồ sơ
    },
    updateProfileSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      state.success = "Cập nhật hồ sơ thành công."; // Thiết lập thông báo thành công
    },
    updateProfileError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = null; // Đặt lại success khi xảy ra lỗi khi cập nhật hồ sơ
    },
  }
});

export const { signInStart, signInSuccess, signInError, signInClear, logoutUser, updateProfileStart, updateProfileSuccess, updateProfileError } = userSlice.actions;
export default userSlice.reducer;
