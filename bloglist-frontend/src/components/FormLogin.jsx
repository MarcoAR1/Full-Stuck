import React, { useState } from 'react'
import { setToken } from '../services/blogs'
import login from '../services/login'
import PropTypes from 'prop-types'

const FormLogin = ({ handleChangeUser, handleNotification }) => {
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    const user = await login(username, password)
    if (user.status) {
      handleNotification(user.data.message, true)
    } else {
      window.localStorage.setItem('login', JSON.stringify(user))
      handleChangeUser(user)
      setToken(user.token)
    }
  }
  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            placeholder="Username"
            onChange={({ target }) => {
              setUsername(target.value)
            }}
            value={username}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            onChange={({ target }) => {
              setPassword(target.value)
            }}
            value={password}
          />
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>
    </>
  )
}
FormLogin.prototype = {
  handleChangeUser: PropTypes.func.isRequired,
  handleNotification: PropTypes.func.isRequired,
}

export default FormLogin
