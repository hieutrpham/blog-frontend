import { useState } from "react";
import userApi from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userLoggedIn] = userApi.useUserLoggedInMutation();
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    await userLoggedIn({ username, password });
    navigate("/blogs");
  };

  return (
    <form onSubmit={login}>
      username
      <input
        name="username"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
      <br />
      password
      <input
        name="password"
        type="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <br />
      <button type="submit">login</button>
    </form>
  );
};

export default Login;
