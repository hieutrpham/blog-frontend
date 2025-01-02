import { useMatch } from "react-router-dom";
import blogApi from "../reducers/blogReducer";
import LogOut from "../components/Logout";

const BlogView = () => {
  const { data: blogData = [] } = blogApi.useBlogListQuery();
  const [updateBlog] = blogApi.useUpdateBlogMutation();
  const [removeBlog] = blogApi.useDeleteBlogMutation();
  const match = useMatch("blogs/:id");

  const blogFound = match
    ? blogData.find((i) => i.id === match.params.id)
    : null;

  if (!blogFound) {
    return null;
  }

  const handleLikeClick = async () => {
    const likeBlog = {
      userId: blogFound.userId?.id,
      likes: !blogFound.likes ? 1 : blogFound.likes + 1,
      author: blogFound.author,
      title: blogFound.title,
      url: blogFound.url,
      id: blogFound.id,
    };

    await updateBlog(likeBlog);
  };

  const handleDelete = () => {
    if (window.confirm("do you want to delete this blogFound?")) {
      removeBlog(blogFound.id);
    }
  };

  return (
    <>
      <LogOut />
      <br />
      {blogFound.title}
      <br />
      {blogFound.url}
      <br />
      likes {blogFound.likes}
      <button onClick={handleLikeClick}>like</button>
      <br />
      {blogFound.userId?.name}
      <br />
      {blogFound?.userId?.username ===
      JSON.parse(localStorage.getItem("loggedUser"))?.username ? (
        <button style={{ color: "red" }} onClick={handleDelete}>
          delete
        </button>
      ) : null}
      <br />
    </>
  );
};

export default BlogView;
