import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import login from './services/login'
import Blogform from './components/Blogform'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    title: '',
    author: '',
    url: ''
  })

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

  const handleInput = (event) => {
    const {name, value} = event.target
    
    setFormData((prevData) => ({
      ...prevData,
      [name] : value
    }))
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const username = formData.username
      const password = formData.password

      const user = await login({username, password})  

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setFormData((prevData) => ({
        ...prevData,
        username: '',
        password: ''
      }))
      setMessage('login successful')

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

  const handleCreate = async (event) => {
    event.preventDefault()
    const blog = {
      "title": formData.title,
      "author": formData.author,
      "url": formData.url
    }
    try {
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))

      setFormData((prevData) => ({
        ...prevData,
        title: '',
        author: '',
        url: ''
      }))

      setMessage('blog created')
    
      setTimeout(() => {
        setMessage(null)
      }, 5000);

      blogRef.current.toggleVisibility()
      
    } catch(exception) {
      console.log(exception)
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
        <Login handleLogin={handleLogin} username={formData.username}
        password={formData.password} handleUser={handleInput} handlePass={handleInput}/>
      </>
    )
  }

  const blogForm = () => {
    return (
      <>
        <h2>Blogs</h2>
        <p>{user.name} logged in
          <button type='button' onClick={handleLogout}>log out</button>
        </p>
        <Togglable buttonLabel='create blog' ref={blogRef}>
          <Blogform title={formData.title} author={formData.author} url={formData.url}
          handleAuthor={handleInput} handleTitle={handleInput}
          handleUrl={handleInput} handleClick={handleCreate}/>
        </Togglable>
        {blogs.map(blog =><Blog key={blog.id} blog={blog} />)}
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