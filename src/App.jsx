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
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    const blog = {
      "title": title,
      "author": author,
      "url": url
    }
    const newBlog = await blogService.create(blog)
    setBlogs(blogs.concat(newBlog))
    setAuthor('')
    setTitle('')
    setUrl('')
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