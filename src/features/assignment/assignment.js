import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import getDataList from "./getData";

export const getDataAssignment = createAsyncThunk(
  "/assignment/getData",
  async (params, thunkApi) => {
    const res = await getDataList.getAssignmentList();
    // thunkApi.dispatch(setStudentsList(res.data));
    return res;
  }
);

const initialState = {
  assignmentList: [],
  loading: false,
  err: null,
};

const assignment = createSlice({
  name: "assignment",
  initialState,
  reducers: {},
  extraReducers: {
    [getDataAssignment.pending]: (state) => {
      state.loading = true;
    },
    [getDataAssignment.rejected]: (state, action) => {
      state.loading = false;
      state.err = action.error.message;
    },
    [getDataAssignment.fulfilled]: (state, action) => {
      state.loading = false;
      state.assignmentList = action.payload;
    },
  },
});

// export const {} = assignment.actions;
export default assignment.reducer;
