import { useState } from "react"

const Blog = ({ blog }) => {

  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleClick = () => {
    alert('liked')
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