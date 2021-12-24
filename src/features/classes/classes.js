import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getDataClasses from "./getDataClasses";

export const callApiClasses = createAsyncThunk(
  "classes/getDataClasses",
  async (params, thunkApi) => {
    const res = await getDataClasses.getClasses();
    console.log(res);
    return res;
  }
);

const initialState = {
  classes: [],
  loading: false,
};

const classes = createSlice({
  name: "classes",
  initialState,
  reducers: {
    classesPending(state) {
      state.loading = true;
    },
    setClasses(state, action) {
      state.loading = false;
      state.classes = action.payload;
    },
  },
  extraReducers: {
    [callApiClasses.pending]: (state) => {
      state.loading = true;
    },
    [callApiClasses.rejected]: (state, action) => {
      state.loading = false;
      state.classes = action.payload;
    },
    [callApiClasses.fulfilled]: (state, action) => {
      console.log(action);
      state.loading = false;
      state.classes = action.payload;
    },
  },
});

export const { classesPending, setClasses } = classes.actions;
export default classes.reducer;
