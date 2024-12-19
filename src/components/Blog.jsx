import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog }) => {

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
      userId: blog.userId.id,
      likes: !blog.likes ? 1 : blog.likes += 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    await blogService.update(blog.id, likeBlog)
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
      likes {blog.likes}
      <button onClick={handleClick}>like</button>
      <br/>
      {blog.userId?.name}
      <button onClick={() => setVisible(!visible)}>cancel</button>
    </div>
  </div>  
)}

export default Blog