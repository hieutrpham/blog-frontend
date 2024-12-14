const Login = ({username, password, handleUser, handlePass, handleLogin}) => {
    return (
        <form onSubmit={handleLogin}>
            username<input name="username" value={username} onChange={handleUser}/>
            <br/>
            password<input name="password" type='password' value={password} onChange={handlePass}/>
            <br/>
            <button type="submit">login</button>
        </form>
    )
}

export default Login