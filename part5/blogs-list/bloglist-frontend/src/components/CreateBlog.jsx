import { useState } from 'react'
import axios from 'axios'
import blogsService from '../services/blogs'
import Toast from './Toast'

const CreateBlog = ({ setBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      const newBlog = {
        title,
        author,
        url,
      }
      console.log(newBlog)

      await blogsService.create(newBlog)
      setBlogs(await blogsService.getAll())
      setMessage({
        style: 'success',
        message: `a new blog ${title} by ${author} added`,
      })
      setTimeout(() => {
        setMessage(null)
      }, 3000)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      const error = exception.response.data.error
      setMessage({
        style: 'error',
        message: error,
      })
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }
  return (
    <div>
      <h2>Create new blog</h2>
      <form>
        <div>
          <label htmlFor="title">title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input
            type="text"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">Url</label>
          <input
            type="text"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>
          create
        </button>
      </form>
      {message && <Toast content={message} />}
    </div>
  )
}

export default CreateBlog
