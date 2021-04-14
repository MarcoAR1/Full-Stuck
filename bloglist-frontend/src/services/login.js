import axios from 'axios'

const login = async (username, password) => {
  try {
    const reqlogin = await axios.post('/api/login', { username, password })
    return reqlogin.data
  } catch (error) {
    return error.response
  }
}

export default login
