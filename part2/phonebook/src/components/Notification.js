import React from 'react'

const Notification = ({ message }) => {
  const notificationStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 24
  }

  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle} className='error'>
      {message}
    </div>
  )
}

export default Notification
