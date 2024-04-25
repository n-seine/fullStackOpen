import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogsList from './components/BlogsList'
import LoggedInUserInfo from './components/LoggedInUserInfo'
import CreateBlog from './components/CreateBlog'

const App = () => {
  const persistentUser = window.localStorage.getItem('loggedIn-user')
  const [user, setUser] = useState(persistentUser)
  const [blogs, setBlogs] = useState([])

  return (
    <>
      {user ? (
        <>
          <LoggedInUserInfo user={user} setUser={setUser} />
          <CreateBlog setBlogs={setBlogs} />
          <BlogsList blogs={blogs} setBlogs={setBlogs} user={user} />
        </>
      ) : (
        <LoginForm setUser={setUser} />
      )}
    </>
  )
}

export default App
