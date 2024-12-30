import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Blogform from "./components/Blogform";

import { actionNoti } from "./reducers/notificationReducer";
import { useDispatch } from "react-redux";
import { useBlogListQuery } from "./reducers/blogReducer";
import { setToken } from "./reducers/blogReducer";

import login from "./services/login";

const App = () => {
  const { data: blogData = [] } = useBlogListQuery();
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  const blogRef = useRef();

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  const handleLogin = async (loginCred) => {
    try {
      const user = await login(loginCred);

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setToken(user.token);

      setUser(user);

      dispatch(actionNoti("login successful", 3000));
    } catch (exception) {
      console.log(exception);
      dispatch(actionNoti("invalid username or password", 3000));
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const loginForm = () => {
    return (
      <>
        <h2>Log in to application</h2>
        <Login handleLogin={handleLogin} />
      </>
    );
  };

  const blogForm = () => {
    const sortedBlogs = [...blogData].sort((a, b) => b.likes - a.likes);

    return (
      <>
        <h2>Blogs</h2>
        <p>
          {user.name} logged in
          <button type="button" onClick={handleLogout}>
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

      {user === null ? loginForm() : blogForm()}
    </>
  );
};

export default App;
