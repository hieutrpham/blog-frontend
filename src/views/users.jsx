// Users header
//username and number of blogs created for each user
import userApi from "../reducers/userReducer";
import LogOut from "../components/Logout";

const UsersView = () => {
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
              <td>{user.username}</td>
              <td>{user.blog.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersView;
