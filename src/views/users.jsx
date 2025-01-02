import userApi from "../reducers/userReducer";
import LogOut from "../components/Logout";
import { Routes, Route, Link, useMatch } from "react-router-dom";

const UserBlogs = () => {
  const { data: userData = [] } = userApi.useGetUsersQuery();
  const match = useMatch("users/:id");
  const userBlog = match
    ? userData.find((i) => i.id === match.params.id)
    : null;

  if (!userBlog) {
    return null;
  }

  return (
    <div>
      <LogOut />
      <h2>{userBlog.username}'s Blogs</h2>
      <ul>
        {userBlog.blog.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

const UserDetails = () => {
  const { data: userData = [] } = userApi.useGetUsersQuery();
  return (
    <>
      <LogOut />
      <table>
        <thead>
          <tr>
            <th>username</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id} style={{ textAlign: "center" }}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blog.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const UsersView = () => {
  const { data: userData = [] } = userApi.useGetUsersQuery();

  return (
    <>
      <Routes>
        <Route path="/" element={<UserDetails />} />
        <Route path="/:id" element={<UserBlogs />} />
      </Routes>
    </>
  );
};

export default UsersView;
