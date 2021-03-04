import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  const [weather, setWeather] = useState()
  useEffect(() => {
    axios
      .get(
        'http://api.weatherstack.com/current?access_key=' +
          '9de6c5c0b4ecdae144e6ddc07d5a4d6c' +
          '&query=' +
          country.capital
      )
      .then((response) => {
        setWeather(response.data)
      })
  }, [country])

  const displayLanguages = (languages) => {
    return languages.map((language) => {
      return <li key={language.name}>{language.name}</li>
    })
  }

  const displayWeather = () => {
    if (weather) {
      return (
        <>
          <h2>Weather in {country.capital}</h2>
          <p><b>temperature: </b>{weather.current.temperature} Celsius</p>
          <img src={weather.current.weather_icons[0]} alt='weather' />
          <p><b>wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
        </>
      )
    } else {
      return <p>Loading weather...</p>
    }
  }

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>{displayLanguages(country.languages)}</ul>
      <img src={country.flag} alt={country.name} />
      {displayWeather()}
    </div>
  )
}

export default Country
