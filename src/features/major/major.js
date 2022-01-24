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
  majors: [],
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
      state.majors = action.payload;
    },
    updateMajor(state, action) {
      state.loading = false;
      const index = state.majors.findIndex(
        (obj) => obj.majorCode === action.payload.majorCode
      );
      state.majors[index] = { ...state.majors[index], ...action.payload };
    },
  },
  extraReducers: {
    [callApiMajor.pending]: (state) => {
      state.loading = true;
    },
    [callApiMajor.rejected]: (state, action) => {
      state.loading = false;
      state.majors = action.payload;
    },
    [callApiMajor.fulfilled]: (state, action) => {
      state.loading = false;
      state.majors = action.payload;
    },
  },
});

export const { majorPending, setMajor, updateMajor } = major.actions;
export default major.reducer;
