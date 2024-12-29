//using RTK query to handle data fetching
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/blogs" }),
  endpoints: (build) => ({
    blogList: build.query({
      query: () => ({ url: "/" }),
    }),
  }),
});

export const { useBlogListQuery } = blogApi;
