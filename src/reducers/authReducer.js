import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { username: null, name: null, token: null },
  reducers: {
    setCredentials(state, action) {
      const { username, name, token } = action.payload;
      state.username = username;
      state.name = name;
      state.token = token;
      localStorage.setItem("loggedUser", JSON.stringify(action.payload));
    },
    logout(state) {
      state.username = null;
      state.name = null;
      state.token = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
