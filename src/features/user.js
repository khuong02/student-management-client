import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../api/userApi";
import { setToken } from "./auth";

export const getInfo = createAsyncThunk(
  "/user/getInfo",
  async (params, thunkApi) => {
    const res = await userApi.getUser();
    thunkApi.dispatch(setToken(res.token));
    return res;
  }
);

const initialState = {
  currentUser: {},
  loading: false,
  err: "",
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [getInfo.pending]: (state) => {
      state.loading = true;
    },
    [getInfo.rejected]: (state, action) => {
      state.loading = false;
      state.err = action.error.message;
    },
    [getInfo.fulfilled]: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload.res.user;
    },
  },
});

const { reducer } = user;

export default reducer;
