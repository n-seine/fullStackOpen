import { useState } from 'react'
import blogService from '../services/blogs'
import Button from './Button'
const Blog = ({ blog, setBlogs }) => {
  const [show, setShow] = useState(false)
  const user = JSON.parse(window.localStorage.getItem('loggedIn-user')) || null
  const showDelete =
    user && blog.user && blog.user.username === user.username && show
  const handleLikes = async (blog) => {
    console.log(blog)
    console.log(user)
    const newBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user._id,
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
      <h3 data-testid="blog-title">{blog.title}</h3>
      <p>{blog.author}</p>
      <button onClick={() => setShow(!show)}>
        {show ? 'hide details' : 'view details'}
      </button>
      {show && (
        <div>
          <p>{blog.url}</p>
          {blog.user && <p>added by {blog.user.name}</p>}
          <p data-testid="likes">
            {blog.likes} likes
            <Button
              data-testid="like-button"
              handleClick={async () => handleLikes(blog)}
              blog={blog}
            >
              like
            </Button>
          </p>
        </div>
      )}
      {showDelete && (
        <Button handleClick={handleDelete} blog={blog}>
          remove
        </Button>
      )}
      <hr />
    </div>
  )
}

export default Blog
