import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let token = null;

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAuthConfig = () => ({
  headers: { Authorization: token },
});

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/blogs" }),
  tagTypes: ["Blogs"],
  endpoints: (build) => ({
    //fetch all blogs
    blogList: build.query({
      query: () => ({ url: "/", headers: getAuthConfig().headers }),
      providesTags: (result) =>
        result ? result.map(({ id }) => ({ type: "Blogs", id })) : [],
    }),

    createBlog: build.mutation({
      query(newBlog) {
        // console.log(newBlog);
        return {
          url: "/",
          headers: getAuthConfig().headers,
          method: "POST",
          body: newBlog,
        };
      },
      invalidatesTags: ["Blogs"],
    }),
  }),
});

export const { useBlogListQuery, useCreateBlogMutation } = blogApi;
