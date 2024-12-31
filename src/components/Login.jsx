import { useState } from "react";
import { useUserLoggedInMutation } from "../reducers/userReducer";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userLoggedIn] = useUserLoggedInMutation();

  const login = async (event) => {
    event.preventDefault();
    await userLoggedIn({ username, password });
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
