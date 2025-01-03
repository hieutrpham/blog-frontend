import { useMatch } from "react-router-dom";
import blogApi from "../reducers/blogReducer";
import LogOut from "../components/Logout";
import { useState } from "react";

const BlogView = () => {
  const { data: blogData = [] } = blogApi.useBlogListQuery();
  const [updateBlog] = blogApi.useUpdateBlogMutation();
  const [removeBlog] = blogApi.useDeleteBlogMutation();
  const [commentBlog] = blogApi.useCommentBlogMutation();
  const [comment, setComment] = useState("");
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

  const handleComment = (e) => {
    e.preventDefault();
    const newBlog = {
      id: blogFound.id,
      title: blogFound.title,
      author: blogFound.author,
      url: blogFound.url,
      likes: blogFound.likes,
      userId: blogFound.user,
      comments: comment,
    };
    commentBlog(newBlog);
  };

  const handleOnChange = (e) => {
    setComment(e.target.value);
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
      comments
      <form onSubmit={handleComment}>
        <input type="text" value={comment} onChange={handleOnChange} />
        <button type="submit">submit comment</button>
      </form>
      {blogFound.comments.map((c, index) => (
        <li key={index}>{c}</li>
      ))}
    </>
  );
};

export default BlogView;
