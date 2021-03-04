import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AncedoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const filteredAnecdotes = anecdotes.filter((ancedote) => {
    if (ancedote.content.toLowerCase().includes(filter)) {
      return ancedote
    } else {
      return null
    }
  })

  const vote = (anecdote) => {
    dispatch(incrementVote(anecdote))
    dispatch(setNotification(`you voted on '${anecdote.content}'`, 3))
  }
  
  return (
    <div>
      {filteredAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AncedoteList