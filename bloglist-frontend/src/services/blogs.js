import axios from 'axios'

const baseUrl = '/api/blogs'
let token = ''
const setToken = (value) => {
  token = { headers: { Authorization: `Bearer ${value}` } }
}
const getAll = async () => {
  try {
    const request = await axios.get(baseUrl)
    return request.data
  } catch (error) {
    console.error(error)
    return error.response
  }
}
const createBlog = async (blog) => {
  try {
    const request = await axios.post(baseUrl, blog, token)
    return request.data
  } catch (error) {
    return error.response
  }
}

const updateBlog = async (id, info) => {
  try {
    const request = await axios.put(`${baseUrl}/${id}`, info, token)
    return request.data
  } catch (error) {
    return error.response
  }
}
const deleteBlog = async (id) => {
  try {
    const request = await axios.delete(`${baseUrl}/${id}`, token)
    return request.status
  } catch (error) {
    return error.response
  }
}

const fixList = (request) => {
  const errors = Object.keys(request.data.errors)
  const errorLength = errors.length
  let errorFix = ''

  errors.forEach((error, x) => {
    const errorcopy = error.split('')
    errorcopy[0] = errorcopy[0].toUpperCase()
    if (errorLength - 1 === x && x !== 0) {
      errorFix = `${errorFix} and ${errorcopy.join('')}`
    } else if (x === 0) {
      errorFix = errorcopy.join('')
    } else {
      errorFix = `${errorFix}, ${errorcopy.join('')}`
    }
    if (errorLength - 1 === 0) {
      return `The field have a error ${errorcopy.join('')}`
    }
  })
  return `This fields have a error ${errorFix}`
}

export { getAll, createBlog, setToken, fixList, updateBlog, deleteBlog }
