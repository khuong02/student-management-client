import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getDataList from "./getDataList";

export const getDataStudent = createAsyncThunk(
  "/student/getData",
  async (params, thunkApi) => {
    const res = await getDataList.getStudentsList();
    thunkApi.dispatch(setStudentsList(res.data));
    console.log(res);
    return res;
  }
);

const initialState = {
  studentsList: [],
  loading: false,
};

const student = createSlice({
  name: "student",
  initialState,
  reducers: {
    getDataPending(state) {
      state.loading = true;
    },
    setStudentsList(state, action) {
      state.loading = false;
      state.studentsList = action.payload;
    },
  },
  extraReducers: {
    [getDataStudent.pending]: (state) => {
      state.loading = true;
    },
    [getDataStudent.rejected]: (state, action) => {
      //   state.loading = false;
      //   state.err = action.error.message;
    },
    [getDataStudent.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.loading = false;
      state.studentsList = action.payload.data;
    },
  },
});

export const { getDataPending, setStudentsList } = student.actions;
export default student.reducer;
