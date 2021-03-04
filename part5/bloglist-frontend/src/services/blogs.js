import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
  console.log(token)
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const create = async (data) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.post(baseUrl, data, config)
  const response = await request
  return response.data
}

const update = async (id, blog) => {
  const request = axios.put(`${baseUrl}/${id}`, blog)
  const response = await request
  return response.data
}

const remove = async (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  const response = await request
  return response.data
}

export default { getAll, create, update, remove, setToken }