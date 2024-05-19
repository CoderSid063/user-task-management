import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    isSidebarOpen: false,
  },
  reducers: {
    setTokens: (state) => {
      state.isAuthenticated = true;
    },
    clearTokens: (state) => {
      state.isAuthenticated = false;
    },
    setOpenSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
