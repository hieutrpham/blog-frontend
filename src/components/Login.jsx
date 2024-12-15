import { useState } from "react"

const Login = ({handleLogin}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = (event) => {
        event.preventDefault()
        handleLogin({username, password})
        setUsername('')
        setPassword('')
    }

    return (
        <form onSubmit={login}>
            username<input name="username" value={username} onChange={({target}) => setUsername(target.value)}/>
            <br/>
            password<input name="password" type='password' value={password} onChange={({target}) => setPassword(target.value)}/>
            <br/>
            <button type="submit">login</button>
        </form>
    )
}

export default Login