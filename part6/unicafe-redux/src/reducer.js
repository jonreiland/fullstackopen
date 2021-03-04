const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const incrementedGood = state.good + 1
      const incrementedGoodState = { ...state, good: incrementedGood }
      return incrementedGoodState
    case 'OK':
      const incrementedOk = state.ok + 1
      const incrementedOkState = { ...state, ok: incrementedOk }
      return incrementedOkState
    case 'BAD':
      const incrementedBad = state.bad + 1
      const incrementedBadState = { ...state, bad: incrementedBad }
      return incrementedBadState
    case 'ZERO':
      const zeroedState = { good: 0, ok: 0, bad: 0 }
      return zeroedState
    default: return state
  }
  
}

export default counterReducer