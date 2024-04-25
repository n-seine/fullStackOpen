import React from 'react'

const LoggedInUserInfo = ({ user, setUser }) => {
  const handleLogOut = () => {
    window.localStorage.removeItem('loggedIn-user')
    setUser(null)
  }
  return (
    <p>
      Hello {user.name} ! You are now connected !
      <button onClick={handleLogOut}>Logout</button>
    </p>
  )
}

export default LoggedInUserInfo
