import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Button from './components/Button'
import Statistics from './components/Statistics'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button
        name={"good"} 
        value={good}
        setState={setGood}
      />
      <Button
        name={"neutral"} 
        value={neutral}
        setState={setNeutral}
      />
      <Button
        name={"bad"} 
        value={bad}
        setState={setBad}
      />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)