import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getDataSubject from "./getDataSubject";

export const callApiSubject = createAsyncThunk(
  "subject/getDataSubject",
  async (params, thunkApi) => {
    const res = await getDataSubject.getSubject();
    return res;
  }
);

const initialState = {
  subjects: [],
  loading: false,
};

const subject = createSlice({
  name: "subject",
  initialState,
  reducers: {
    subjectPending(state) {
      state.loading = true;
    },
    setSubject(state, action) {
      state.loading = false;
      state.subjects = action.payload;
    },
    updateSubject(state, action) {
      state.loading = false;
      const index = state.subjects.findIndex(
        (obj) => obj.subjectCode === action.payload.subjectCode
      );
      state.subjects[index] = { ...state.subjects[index], ...action.payload };
    },
  },
  extraReducers: {
    [callApiSubject.pending]: (state) => {
      state.loading = true;
    },
    [callApiSubject.rejected]: (state, action) => {
      state.loading = false;
      state.subjects = action.payload;
    },
    [callApiSubject.fulfilled]: (state, action) => {
      state.loading = false;
      state.subjects = action.payload;
    },
  },
});

export const { subjectPending, setSubject, updateSubject } = subject.actions;
export default subject.reducer;
