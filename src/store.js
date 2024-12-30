import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import { blogApi } from "./reducers/blogReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: (gDM) => gDM().concat(blogApi.middleware),
});

const state = store.getState();
// console.log(state.blogApi);

export default store;
