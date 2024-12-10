const Login = ({username, password, handleUser, handlePass, handleLogin}) => {
    return (
        <form onSubmit={handleLogin}>
            username<input value={username} onChange={handleUser}/>
            <br/>
            password<input value={password} onChange={handlePass}/>
            <br/>
            <button type="submit">login</button>
        </form>
    )
}

export default Login