import React from 'react'

const Button = ({ country, setShowCountries }) => {
  const handleClick = () => {
    setShowCountries([country])
  }

  return (
    <button onClick={handleClick}>
      Show
    </button>
  )
}

export default Button
