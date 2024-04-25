import { useEffect, useState } from 'react'
import loginService from '../services/login'
import Toast from './Toast'

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const handleSubmit = async (event) => {
    try {
      event.preventDefault()
      console.log({ username, password })
      const user = await loginService.login({ username, password })
      setUser(user)
      setMessage({
        style: 'success',
        message: `welcome ${user.name}`,
      })
      setTimeout(() => {
        setMessage(null)
      }, 3000)
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
      {showForm && (
        <>
          <h1>Login</h1>
          <form>
            <div>
              <label htmlFor="username">User name :</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password :</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" onClick={handleSubmit}>
              Login
            </button>
          </form>
        </>
      )}
      {message && <Toast content={message} />}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'cancel' : 'login'}
      </button>
    </div>
  )
}

export default LoginForm
