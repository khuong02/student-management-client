import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getDataList from "./getDataList";

export const getDataTeacher = createAsyncThunk(
  "/teacher/getData",
  async (params, thunkApi) => {
    const res = await getDataList.getTeachersList(params);
    thunkApi.dispatch(setTeachersList(res.data));
    return res;
  }
);

const initialState = {
  teachersList: [],
  loading: false,
};

const teacher = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    teachersListPending(state) {
      state.loading = true;
    },
    setTeachersList(state, action) {
      state.loading = false;
      state.teachersList = action.payload;
    },
    updateTeacher(state, action) {
      state.loading = false;
      const index = state.teachersList.findIndex(
        (obj) => obj.uuid === action.payload.uuid
      );
      state.teachersList[index] = {
        ...state.teachersList[index],
        ...action.payload,
      };
    },
  },
  extraReducers: {
    [getDataTeacher.pending]: (state) => {
      state.loading = true;
    },
    [getDataTeacher.rejected]: (state, action) => {
      state.loading = false;
      state.err = action.error.message;
    },
    [getDataTeacher.fulfilled]: (state, action) => {
      state.loading = false;
      state.teachersList = action.payload;
    },
  },
});

export const { teachersListPending, setTeachersList, updateTeacher } =
  teacher.actions;
export default teacher.reducer;
