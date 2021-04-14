import React from 'react'
import '../styles/notification.css'
const Notification = ({ message, error }) => {
  return (
    <>
      {message ? (
        <div className={error ? 'error' : 'notification'}>
          <div>{message}</div>
        </div>
      ) : undefined}
    </>
  )
}

export default Notification
