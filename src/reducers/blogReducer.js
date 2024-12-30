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
        // console.log(newBlog);
        return {
          url: "/",
          headers: getAuthConfig().headers,
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
          headers: getAuthConfig().headers,
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
          headers: getAuthConfig().headers,
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
