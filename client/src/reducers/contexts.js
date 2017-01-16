import { Map } from 'immutable'
import Context from '../models/context'
var _ = require("underscore");

const initialState = Map()

const addContext = (data) => {
  return new Context({
    id: data.id,
    name: data.name,
    deleted: data.deleted
  })
}

const context = (state, action) => {
  switch (action.type) {
    case "UPDATE_CONTEXT":
      return new Context({
        ...state,
        name: action.name
      })
    case "TOGGLE_DELETE_CONTEXT":
      return new Context({
        ...state,
        deleted: action.deleted === undefined || action.deleted
      })
    default:
      console.error('Invalid context action')
  }
}

const contexts = (state = initialState, action) => {
  if (_.contains(['UPDATE_CONTEXT', 'TOGGLE_DELETE_CONTEXT'], action)) {
    return state.update(action.id, 
      c => context(c, action)
    )
  } else if (action.type === 'ADD_VIEW') {
    return state.set(action.id, addView(action))
  } else if (action.type === 'DELETE_VIEW') {
    return state.delete(action.id)
  } else if (action.type === 'RECEIVE_CONTEXTS') {
    return Map(action.contexts.map(
      (data, index) => [data.id, addContext(data)]
    ))    
  } else {
    return state
  }
}

export default contexts
