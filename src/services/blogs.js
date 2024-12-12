import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newObject => {
  const auth = {
    headers: {Authorization: token}
  }
  
  const response = await axios.post(baseUrl, newObject, auth)  
  return response.data
}

export default { getAll, create, setToken }