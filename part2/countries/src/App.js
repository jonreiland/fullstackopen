import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Country from './components/Country'
import Button from './components/Button'

const App = () => {
  const [countries, setCountries] = useState([])
  const [showCountries, setShowCountries] = useState(countries)
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data)
    })
  }, [])

  const handleInputChange = (event) => {
    setNewSearch(event.target.value)
    search(event.target.value)
  }

  const search = (value) => {
    if (value === '') {
      setShowCountries(countries)
    } else {
      setShowCountries(
        countries.filter((country) =>
          country.name.toLowerCase().includes(value.toLowerCase())
        )
      )
    }
  }

  const displaySearchResults = () => {
    if (showCountries.length > 10) {
      return (
        <p>Too many matches, specify another filter</p>
      )
    } else if (showCountries.length === 1) {
      return (
        <Country key={showCountries[0]} country={showCountries[0]} />
      )
    } else {
      return (
        <p>
          {showCountries.map((country) => {
            return (
              <p key={country.name}>
                {country.name}
                <Button key={country.name} country={country} setShowCountries={setShowCountries} />
              </p>
            )
          })}
        </p>
      )
    }
  }

  return (
    <div>
      <Filter newSearch={newSearch} handleInputChange={handleInputChange} />
      {displaySearchResults()}
    </div>
  )
}

export default App
