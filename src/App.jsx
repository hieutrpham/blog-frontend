import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./components/Blog";
import Login from "./components/Login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Blogform from "./components/Blogform";
import UsersView from "./views/users";

import { useBlogListQuery } from "./reducers/blogReducer";
import { setCredentials } from "./reducers/authReducer";

import { Routes, Route } from "react-router-dom";
import LogOut from "./components/Logout";

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
        <LogOut />
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
      <h2>Blogs</h2>

      <Routes>
        <Route
          path="/"
          element={userData.name === null ? loginForm() : blogForm()}
        />
        <Route path="/users/*" element={<UsersView />} />
      </Routes>
    </>
  );
};

export default App;
