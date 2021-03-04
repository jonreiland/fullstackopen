import React from 'react'

const ErrorMessage = ({ message }) => {
  const errorMessageStyle = {
    color: 'red',
    fontStyle: 'italic',
    fontSize: 24
  }

  if (message === null) {
    return null
  }

  return (
    <div style={errorMessageStyle} className='error'>
      {message}
    </div>
  )
}

export default ErrorMessage
