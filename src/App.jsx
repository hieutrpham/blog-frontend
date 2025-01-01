import { useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Blogform from "./components/Blogform";

import { useAuth } from "./contexts/auth";
import { useNoti } from "./contexts/notification";
import { useBlogContext } from "./contexts/blogs";

const App = () => {
  const noti = useNoti();
  const { state: stateAuth, dispatch: dispatchAuth } = useAuth();
  const { blogs, isLoading, isError } = useBlogContext();
  const blogRef = useRef();

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatchAuth({
        type: "LOGIN",
        payload: {
          username: user.username,
          name: user.name,
          token: user.token,
        },
      });
    }
  }, []);

  if (isLoading) {
    return "loading...";
  }
  if (isError) {
    return "error";
  }

  const loginForm = () => {
    return (
      <>
        <h2>Log in to application</h2>
        <Login />
      </>
    );
  };

  const blogForm = () => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

    return (
      <>
        <h2>Blogs</h2>
        <p>
          {stateAuth.name} logged in
          <button
            type="button"
            onClick={() => dispatchAuth({ type: "LOGOUT" })}
          >
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

      {!stateAuth.name ? loginForm() : blogForm()}
    </>
  );
};

export default App;
