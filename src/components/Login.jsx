import { useState } from "react";
import { useUserLoggedIn } from "../contexts/users";
import { useNoti, useNotiDispatch } from "../contexts/notification";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: handleLogin } = useUserLoggedIn();
  const dispatch = useNotiDispatch();

  const login = (event) => {
    event.preventDefault();
    handleLogin({ username, password });
    dispatch("log in successful", 3000);
    setUsername("");
    setPassword("");
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
