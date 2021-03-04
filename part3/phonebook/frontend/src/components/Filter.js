import React from 'react'

const Filter = ({ newSearch, setNewSearch, search }) => {
  const handleSearch = (event) => {
    setNewSearch(event.target.value)
    search(event.target.value)
  }

  return (
    <p>
      filter shown with{' '}
      <input name='search' value={newSearch} onChange={handleSearch} />
    </p>
  )
}

export default Filter
