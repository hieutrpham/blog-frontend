import { useState } from "react";
import { useCreateBlogMutation } from "../reducers/blogReducer";
import { actionNoti } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

const Blogform = () => {
  const [createBlog] = useCreateBlogMutation();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    url: "",
  });
  const dispatch = useDispatch();

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addBlog = async (event) => {
    event.preventDefault();
    await createBlog({
      title: formData.title,
      author: formData.author,
      url: formData.url,
    });

    dispatch(actionNoti("blog created", 3000));

    setFormData((prevData) => ({
      ...prevData,
      title: "",
      author: "",
      url: "",
    }));
  };

  return (
    <>
      <h2>Create New Blog</h2>
      <form onSubmit={addBlog}>
        title:{" "}
        <input name="title" value={formData.title} onChange={handleInput} />
        <br />
        author:{" "}
        <input name="author" value={formData.author} onChange={handleInput} />
        <br />
        url: <input name="url" value={formData.url} onChange={handleInput} />
        <br />
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default Blogform;
