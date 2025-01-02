import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "./authReducer";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Login"],
  endpoints: (build) => ({
    userLoggedIn: build.mutation({
      query(credentials) {
        return { url: "/login", method: "POST", body: credentials };
      },

      async onQueryStarted(credentials, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              username: data.username,
              name: data.name,
              token: data.token,
            })
          );
        } catch (error) {
          console.log("login error", error);
        }
      },
    }),

    getUsers: build.query({
      query: () => ({ url: "/users", method: "GET" }),
    }),
  }),
});

export default userApi;
