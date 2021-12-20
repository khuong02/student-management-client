import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  account: null,
  error: false,
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
      state.error = false;
    },
    loginFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.token = action.payload.accessToken;
      state.account = action.payload.account;
      state.error = false;
    },
    logoutSuccess(state) {
      state.loading = false;
      state.token = null;
      state.account = null;
      state.error = false;
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
