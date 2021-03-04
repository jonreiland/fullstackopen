import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Notification from './components/Notification'
import personsService from './services/persons'
import ErrorMessage from './components/ErrorMessage'

const App = () => {
  const [persons, setPersons] = useState([])
  const [showPersons, setShowPersons] = useState(persons)
  const [newSearch, setNewSearch] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    setShowPersons(persons)
  }, [persons])

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const found = persons.find((person) => person.name === newName)
    if (found) {
      if (window.confirm(`${found.name} is already added to the phonebook, replace the old number with a new one?`)) {
        const changedPerson = { ...found, number: event.target.number.value }
        personsService
          .update(changedPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
            setMessage(`${changedPerson.name}'s number has been updated`)
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
          .catch((error) => {
            console.log(error)
            setErrorMessage(`${changedPerson.name} has already been removed from the server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
          })
      }
    } else {
      personsService
        .create({ name: newName, number: newNumber })
        .then((response) => {
          setPersons(persons.concat(response.data))
          setMessage(`${response.data.name} was successfully added to the server`)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    }
  }

  const handleInputChange = (event) => {
    if (event.target.name === 'name') {
      setNewName(event.target.value)
    } else if (event.target.name === 'number') {
      setNewNumber(event.target.value)
    } else {
      setNewSearch(event.target.value)
      search(event.target.value)
    }
  }

  const deletePerson = (id) => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      personsService
        .deletePerson(id)
        .then(
          setPersons(persons.filter(person => person.id !== id))
        )
    }
  }

  const search = (value) => {
    if (value === '') {
      setShowPersons(persons)
    } else {
      setShowPersons(
        persons.filter((person) =>
          person.name.toLowerCase().includes(value.toLowerCase())
        )
      )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorMessage message={errorMessage} />
      <Notification message={message} />
      <Filter newSearch={newSearch} setNewSearch={setNewSearch} search={search} />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      {showPersons.map((person) => {
        return (
          <React.Fragment key={person.name}>
            <Person key={person.name} person={person} deletePerson={deletePerson} />
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default App
