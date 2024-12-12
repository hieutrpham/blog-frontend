import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import login from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPass] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)

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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await login({username, password})

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPass('')
      setMessage('login successful')

    } catch(exception) {
      console.log(exception)
      setMessage('invalid username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000);
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
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    const blog = {
      "title": title,
      "author": author,
      "url": url
    }
    try {
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))
      setAuthor('')
      setTitle('')
      setUrl('')
      setMessage('blog created')
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    } catch(exception) {
      console.log(exception)
      setMessage(exception)
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    }

  }

  if (user === null) {
    return (
      <>
        <Notification message={message}/>
        <h2>Log in to application</h2>
        <Login handleLogin={handleLogin} username={username}
        password={password} handleUser={handleUser} handlePass={handlePass}/>
      </>
    )
  }

  return (
    <>
      <Notification message={message}/>
      <h2>Blogs</h2>
      <p>{user.name} logged in
        <button type='button' onClick={handleLogout}>log out</button>
      </p>

      <h2>Create New</h2>
      title: <input value={title} onChange={({target}) => setTitle(target.value)}/> <br/>
      author: <input value={author} onChange={({target}) => setAuthor(target.value)}/> <br/>
      url: <input value={url} onChange={({target}) => setUrl(target.value)}/> <br/>
      <button type='button' onClick={handleCreate}>create</button>

      {blogs.map(blog =><Blog key={blog.id} blog={blog} />)}

    </>
  )
}

export default App