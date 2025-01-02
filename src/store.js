import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import { blogApi } from "./reducers/blogReducer";
import userApi from "./reducers/userReducer";
import authReducer from "./reducers/authReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    auth: authReducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (gDM) => gDM().concat(blogApi.middleware, userApi.middleware),
});

const state = store.getState();
// console.log(current(store));

// store.dispatch(
//   userApi.endpoints.userLoggedIn.initiate({
//     username: "test",
//     password: "test",
//   })
// );

export default store;
