import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  account: null,
  error: "",
  loading: false,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    loginPending(state) {
      state.loading = true;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.error = action.payload.msg;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.token = action.payload.accessToken;
      state.account = action.payload.account;
    },
    logoutSuccess(state) {
      state.loading = false;
      state.token = null;
      state.account = null;
    },
  },
});

const { actions, reducer } = auth;

export const {
  setToken,
  loginPending,
  loginFailed,
  loginSuccess,
  logoutSuccess,
} = actions;

export default reducer;
