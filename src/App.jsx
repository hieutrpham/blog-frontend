import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blogform from './components/Blogform'

import blogService from './services/blogs'
import login from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogRef = useRef()

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
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (loginCred) => {
    
    try {
      const user = await login(loginCred)  

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)

      setMessage('login successful')
      setTimeout(() => {
        setMessage(null)
      }, 5000);

    } catch(exception) {
      console.log(exception)
      setMessage('invalid username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }
  }

  const handleLogout =() => {
    window.localStorage.clear()
    setUser(null)
  }

  const createBlog = async (blogObject) => {

    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))

      setMessage('blog created')
    
      setTimeout(() => {
        setMessage(null)
      }, 5000);

      blogRef.current.toggleVisibility()

    } catch(exception) {
      setMessage(exception)
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }

  }

  const loginForm = () => {
    return (
      <>
        <h2>Log in to application</h2>
        <Login handleLogin={handleLogin}/>
      </>
    )
  }

  const blogForm = () => {
    const sortedBlogs = [...blogs].sort((a,b) => b.likes - a.likes)

    return (
      <>
        <h2>Blogs</h2>
        <p>{user.name} logged in
          <button type='button' onClick={handleLogout}>log out</button>
        </p>
        <Togglable buttonLabel='create blog' ref={blogRef}>
          <Blogform createBlog={createBlog}/>
        </Togglable>
        
        {sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </>
    )}

  return (
    <>
      <Notification message={message}/>

      {user === null ? loginForm() : blogForm()}
    </>
  )
}

export default App