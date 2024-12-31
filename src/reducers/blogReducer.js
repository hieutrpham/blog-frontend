import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/blogs",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Blogs"],
  endpoints: (build) => ({
    //fetch all blogs
    blogList: build.query({
      query: () => ({ url: "/" }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Blogs", id })),
              { type: "Blogs", id: "LIST" },
            ]
          : [],
    }),

    getBlog: build.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Blogs", id }],
    }),

    createBlog: build.mutation({
      query(newBlog) {
        return {
          url: "/",
          method: "POST",
          body: newBlog,
        };
      },
      invalidatesTags: [{ type: "Blogs", id: "LIST" }],
    }),

    updateBlog: build.mutation({
      query(newBlog) {
        const { id, ...body } = newBlog;
        return {
          url: `${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Blogs", id }],
    }),

    deleteBlog: build.mutation({
      query(id) {
        return {
          url: `${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "Blogs", id }],
    }),
  }),
});

export const {
  useBlogListQuery,
  useGetBlogQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
