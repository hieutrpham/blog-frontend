import { useState } from "react";
import { useDispatch } from "react-redux";
import { actionNoti } from "../reducers/notificationReducer";

const Blogform = ({ createBlog }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    url: "",
  });

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
