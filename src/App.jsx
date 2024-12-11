import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import login from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPass] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await login({username, password})

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPass('')

    } catch(exception) {
      console.log(exception)
      
    }

  }

  const handleUser = (event) => {
    setUsername(event.target.value)
  }

  const handlePass = (event) => {
    setPass(event.target.value)   
  }

  const handleLogout =() => {
    window.localStorage.clear()
    setUser(null)
    console.log(user)    
  }

  if (user === null) {
    return (
      <>
        <h2>Log in to application</h2>
        <Login handleLogin={handleLogin} username={username}
        password={password} handleUser={handleUser} handlePass={handlePass}/>
      </>
    )
  }

  return (
    <>
      <h2>Blogs</h2>
      <p>{user.name} logged in
        <button type='button' onClick={handleLogout}>log out</button>
      </p>
      
      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}

export default App