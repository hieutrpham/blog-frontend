import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [likes, setLikes] = useState(blog.likes)
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  
  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleClick = async () => {
    const likeBlog =  {
      userId: blog.userId?.id,
      likes: !blog.likes ? 1 : blog.likes += 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    setLikes(likeBlog.likes)
    await blogService.update(blog.id, likeBlog)
  }

  const handleDelete = () => {
    if (window.confirm('do you want to delete this blog?')){
      blogService.remove(blog.id)
    }
  }

  return (
  <div style={blogStyle}>
    <div style={hideWhenVisible}>
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>show</button>
    </div>
    
    <div style={showWhenVisible}>
      {blog.title} {blog.author} 
      <br/> 
      {blog.url} 
      <br/>
      likes {likes}
      <button onClick={handleClick}>like</button>
      <br/>
      {blog.userId?.name}
      <br/>
      {blog?.userId?.username === JSON.parse(localStorage.getItem('loggedUser'))?.username ?
      <button style={{color: 'red'}} onClick={handleDelete}>delete</button> : null}
      <br/>
      <button onClick={() => setVisible(!visible)}>cancel</button>
    </div>
  </div>  
)}

export default Blog