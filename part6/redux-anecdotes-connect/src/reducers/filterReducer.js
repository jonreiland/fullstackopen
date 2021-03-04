const initialState = ''

export const setFilter = (content) => {
  return {
    type: 'SET_FILTER',
    data: content
  }
}

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.data
    case 'REMOVE_FILTER':
      return ''
    default: return state
  }
}

export default filterReducer