import React from 'react'

const Filter = ({ newSearch, handleInputChange }) => {
  return (
    <p>
      filter countries{' '}
      <input name='search' value={newSearch} onChange={handleInputChange} />
    </p>
  )
}

export default Filter
