import { useState, useEffect, useRef, useContext } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Blogform from "./components/Blogform";

import blogService from "./services/blogs";
import login from "./services/login";

import { useNoti, useNotiDispatch } from "./contexts/notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const notiDispatch = useNotiDispatch();
  const noti = useNoti();

  const blogRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

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

  const createBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(newBlog));
      notiDispatch("blog created");
      blogRef.current.toggleVisibility();
    } catch (exception) {
      notiDispatch(exception);
    }
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
          <Blogform createBlog={createBlog} />
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
