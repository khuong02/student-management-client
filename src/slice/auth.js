import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSlice(state, action) {
      console.log(action);
      state.token = action.payload.token;
    },
  },
});

const { actions, reducer } = auth;

export const { loginSlice } = actions;

export default reducer;
