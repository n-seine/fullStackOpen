import axios from 'axios'

const login = async (credentials) => {
  const baseUrl = 'api/login'
  const response = await axios.post(baseUrl, credentials)
  const user = response.data
  window.localStorage.setItem('loggedIn-user', JSON.stringify(user))
  return user
}

export default { login }
