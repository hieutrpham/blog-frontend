import { useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Blogform from "./components/Blogform";

import { useDispatch, useSelector } from "react-redux";
import { useBlogListQuery } from "./reducers/blogReducer";
import { setCredentials } from "./reducers/authReducer";

import { logout } from "./reducers/authReducer";

const App = () => {
  const { data: blogData = [] } = useBlogListQuery();
  const userData = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const blogRef = useRef();

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch(setCredentials(user));
    }
  }, [dispatch]);

  const loginForm = () => {
    return (
      <>
        <h2>Log in to application</h2>
        <Login />
      </>
    );
  };

  const blogForm = () => {
    const sortedBlogs = [...blogData].sort((a, b) => b.likes - a.likes);

    return (
      <>
        <h2>Blogs</h2>
        <p>
          {userData.name} logged in
          <button type="button" onClick={() => dispatch(logout())}>
            log out
          </button>
        </p>
        <Togglable buttonLabel="create blog" ref={blogRef}>
          <Blogform />
        </Togglable>

        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </>
    );
  };

  return (
    <>
      <Notification />
      {userData.name === null ? loginForm() : blogForm()}
    </>
  );
};

export default App;
