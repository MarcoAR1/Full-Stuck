import React, { useEffect, useState } from 'react'
import Bloger from './components/Bloger'
import FormLogin from './components/FormLogin'
import Notification from './components/Notification'
import { setToken } from './services/blogs'
const App = () => {
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(['', false])

  const handleMessageNotification = (mess, error = false) => {
    setMessage([mess, error])

    setTimeout(() => {
      setMessage(['', false])
    }, 2000)
  }

  useEffect(() => {
    const userInfo = window.localStorage.getItem('login')

    if (userInfo) {
      setUser(JSON.parse(userInfo))
      setToken(JSON.parse(userInfo).token)
    }
  }, [])

  return (
    <div>
      <Notification message={message[0]} error={message[1]} />

      {user ? (
        <Bloger
          usuario={user}
          handleChangeUser={setUser}
          handleNotification={handleMessageNotification}
        />
      ) : (
        <FormLogin
          handleChangeUser={setUser}
          handleNotification={handleMessageNotification}
        />
      )}
    </div>
  )
}

export default App
