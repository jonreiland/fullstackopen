import React, { useState } from 'react'
import { connect } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = async (anecdote) => {
    props.incrementVote(anecdote)
    props.setNotification(`you voted on '${anecdote.content}'`, 3)
  }
  
  return (
    <div>
      {props.anecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
  const filteredAnecdotes = state.anecdotes.filter((anecdote) => {
    if (anecdote.content.toLowerCase().includes(state.filter.toLowerCase())) {
      return anecdote
    } else {
      return null
    }
  })
  return {
    anecdotes: filteredAnecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  incrementVote,
  setNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdoteList