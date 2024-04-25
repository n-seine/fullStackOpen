import { useEffect, useState } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const BlogsList = ({ blogs, setBlogs }) => {
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
        ))}
    </div>
  )
}

BlogsList.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
}

export default BlogsList
