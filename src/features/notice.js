import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  success: null,
  error: null,
};

const notice = createSlice({
  name: "notice",
  initialState,
  reducers: {
    noticeSuccess(state, action) {
      state.success = action.payload;
    },
    noticeFailed(state, action) {
      console.log(action);
      state.error = action.payload;
    },
  },
});

export const { noticeSuccess, noticeFailed } = notice.actions;
export default notice.reducer;
