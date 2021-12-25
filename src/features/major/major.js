import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getDataMajor from "./getDataMajor";

export const callApiMajor = createAsyncThunk(
  "major/getDataMajor",
  async (params, thunkApi) => {
    const res = await getDataMajor.getMajor();
    return res;
  }
);

const initialState = {
  major: [],
  loading: false,
};

const major = createSlice({
  name: "major",
  initialState,
  reducers: {
    majorPending(state) {
      state.loading = true;
    },
    setMajor(state, action) {
      state.loading = false;
      state.major = action.payload;
    },
  },
  extraReducers: {
    [callApiMajor.pending]: (state) => {
      state.loading = true;
    },
    [callApiMajor.rejected]: (state, action) => {
      state.loading = false;
      state.major = action.payload;
    },
    [callApiMajor.fulfilled]: (state, action) => {
      state.loading = false;
      state.major = action.payload;
    },
  },
});

export const { majorPending, setMajor } = major.actions;
export default major.reducer;
