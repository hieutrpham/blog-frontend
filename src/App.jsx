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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await login({username, password})

      console.log(Object.keys(user))
      
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
      <p>{user.name} logged in</p>
      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}

export default App