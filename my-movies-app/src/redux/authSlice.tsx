import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("current_user") || "null"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;

      localStorage.setItem("current_user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.currentUser = null;

      localStorage.removeItem("current_user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
