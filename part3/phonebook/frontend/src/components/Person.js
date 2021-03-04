import React from 'react'

const Person = ({ person, deletePerson }) => {
  return (
    <p key={person.name}>
      {person.name} {person.number} &nbsp;
      <button onClick={() => deletePerson(person.id)}>delete</button>
    </p>
  )
}

export default Person
