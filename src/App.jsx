import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Blogform from "./components/Blogform";

import blogService from "./services/blogs";
import login from "./services/login";

import { useNoti, useNotiDispatch } from "./contexts/notification";
import { useBlogContext } from "./contexts/blogs";

const App = () => {
  const [user, setUser] = useState(null);
  const notiDispatch = useNotiDispatch();
  const noti = useNoti();
  const { blogs, isLoading, isError } = useBlogContext();
  const blogRef = useRef();

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  if (isLoading) {
    return "loading...";
  }
  if (isError) {
    return "error";
  }

  const handleLogin = async (loginCred) => {
    try {
      const user = await login(loginCred);

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);

      setUser(user);
      notiDispatch("login successful", 3000);
    } catch (exception) {
      console.log(exception);
      notiDispatch("invalid username or password", 3000);
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
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

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
      <Notification message={noti} />

      {user === null ? loginForm() : blogForm()}
    </>
  );
};

export default App;
