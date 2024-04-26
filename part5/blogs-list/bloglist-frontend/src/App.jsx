import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogsList from './components/BlogsList'
import LoggedInUserInfo from './components/LoggedInUserInfo'
import CreateBlog from './components/CreateBlog'
import Toast from './components/Toast'

const App = () => {
  useEffect(() => {
    const persistentUser = window.localStorage.getItem('loggedIn-user')
    if (persistentUser) {
      setUser(JSON.parse(persistentUser))
    } else {
      setUser(null)
    }
  }, [])
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)

  return (
    <>
      {message && <Toast content={message} />}

      {user ? (
        <>
          <LoggedInUserInfo user={user} setUser={setUser} />
          <CreateBlog setBlogs={setBlogs} />
          <BlogsList blogs={blogs} setBlogs={setBlogs} user={user} />
        </>
      ) : (
        <>
          <LoginForm
            setUser={setUser}
            user={user}
            message={message}
            setMessage={setMessage}
          />
          <BlogsList blogs={blogs} setBlogs={setBlogs} user={null} />
        </>
      )}
    </>
  )
}

export default App
