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
  subject: [],
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
      state.subject = action.payload;
    },
  },
  extraReducers: {
    [callApiSubject.pending]: (state) => {
      state.loading = true;
    },
    [callApiSubject.rejected]: (state, action) => {
      state.loading = false;
      state.subject = action.payload;
    },
    [callApiSubject.fulfilled]: (state, action) => {
      state.loading = false;
      state.subject = action.payload;
    },
  },
});

export const { subjectPending, setSubject } = subject.actions;
export default subject.reducer;
