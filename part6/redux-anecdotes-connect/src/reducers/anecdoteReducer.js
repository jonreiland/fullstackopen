import anecdoteService from '../services/anecdotes'

const sortedByVotes = (anecdotes) => {
  const sortedanecdotes = anecdotes.sort((a, b) => {
    return b.votes - a.votes
  })
  return sortedanecdotes
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content: newAnecdote.content,
        id: newAnecdote.id,
        votes: newAnecdote.votes
      }
    })
  }
}

export const incrementVote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(
      anecdote.id, 
      { ...anecdote, votes: anecdote.votes + 1 }
    )
    dispatch({
      type: 'INCREMENT_VOTE',
      data: updatedAnecdote
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return sortedByVotes(action.data)
    case 'NEW_ANECDOTE':
      return sortedByVotes([ ...state, action.data ])
    case 'INCREMENT_VOTE':
      const updatedAnecdote = action.data
      return sortedByVotes(state.map(anecdote =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote 
      ))
    default: return state
  }
}

export default anecdoteReducer