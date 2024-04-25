import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs }) => {
  const [show, setShow] = useState(false)
  const user = JSON.parse(window.localStorage.getItem('loggedIn-user'))
  const showDelete = blog.user && blog.user.username === user.username && show
  const handleLikes = async (blog) => {
    console.log(blog)
    console.log(user)
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
      user,
    }
    console.log(newBlog)
    await blogService.update(blog.id, newBlog)
    setBlogs(await blogService.getAll())
  }
  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      setBlogs(await blogService.getAll())
    }
  }

  return (
    <div>
      <h3>{blog.title}</h3>
      <button onClick={() => setShow(!show)}>
        {show ? 'hide details' : 'view details'}
      </button>
      {show && (
        <div>
          <p>{blog.author}</p>
          <p>{blog.url}</p>
          {blog.user && <p>added by {blog.user.name}</p>}
          <p>
            {blog.likes} likes{' '}
            <button onClick={() => handleLikes(blog)}>like</button>
          </p>
        </div>
      )}
      {showDelete && (
        <button onClick={() => handleDelete(blog)}>remove blog</button>
      )}
      <hr />
    </div>
  )
}

export default Blog
