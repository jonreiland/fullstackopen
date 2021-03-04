import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AncedoteForm from './components/AnecdoteForm'
import AncedoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'


const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>anecdotes</h2>
      <Notification />
      <Filter />
      <AncedoteList />
      <h2>create new</h2>
      <AncedoteForm />
    </div>
  )
}

export default App