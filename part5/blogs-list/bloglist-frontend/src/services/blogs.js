import axios from 'axios'
const baseUrl = '/api/blogs'

const setToken = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedIn-user')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    const token = 'Bearer ' + user.token
    return token
  } else {
    return null
  }
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const token = setToken()
  console.log('token', token)
  const response = await axios.post(baseUrl, newObject, {
    headers: {
      Authorization: token,
    },
  })
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const remove = async (id) => {
  const token = setToken()
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: token,
    },
  })
  return response.data
}

export default { setToken, getAll, create, update, remove }
