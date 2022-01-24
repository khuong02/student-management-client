import {
  configureStore,
  //   getDefaultMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authSlice from "../features/auth";
import userSlice from "../features/user";
import noticeSlice from "../features/notice";
import studentSlice from "../features/dataListStudentAndTeacher/student";
import teacherSlice from "../features/dataListStudentAndTeacher/teacher";
import classesSlice from "../features/classes/classes";
import majorSlice from "../features/major/major";
import subjectSlice from "../features/subject/subject";
import assignmentSlice from "../features/assignment/assignment";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const reducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  notice: noticeSlice,
  students: studentSlice,
  teachers: teacherSlice,
  classes: classesSlice,
  majors: majorSlice,
  subjects: subjectSlice,
  assignment: assignmentSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  ],
});

export const persistor = persistStore(store);

export default store;
