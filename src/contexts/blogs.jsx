import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const baseUrl = "/api/blogs";

const getAuth = () => {
  const token = JSON.parse(localStorage.getItem("loggedUser")).token;
  return { headers: { Authorization: `Bearer ${token}` } };
};

const useBlogs = () =>
  useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axios.get(baseUrl);
      return res.data;
    },
  });

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newBlog) => {
      const res = await axios.post(baseUrl, newBlog, getAuth());
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(["blogs"]),
  });
};

export const useUpdateblog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedBlog) => {
      const res = await axios.put(
        `${baseUrl}/${updatedBlog.id}`,
        updatedBlog,
        getAuth()
      );
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(["blogs"]),
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`${baseUrl}/${id}`, getAuth());
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries(["blogs"]),
  });
};

const BlogContext = createContext();

export const BlogProvider = (props) => {
  const { data: blogs, isLoading, isError, refetch } = useBlogs();
  return (
    <BlogContext.Provider value={{ blogs, isLoading, isError, refetch }}>
      {props.children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => {
  return useContext(BlogContext);
};
