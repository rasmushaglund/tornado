import { Map } from 'immutable'
import View from '../models/view'
var _ = require("underscore");

const initialState = Map()

const addView = (data) => {
  return new View({
    id: data.id,
    name: data.name,
    filter: data.filter,
    deleted: data.deleted
  })
}

const view = (state, action) => {
  switch (action.type) {
    case "UPDATE_VIEW":
      return new View({
        ...state,
        name: action.name,
        filter: action.filte
      })
    case "SOFT_DELETE_VIEW":
      return new View({
        ...state,
        deleted: action.deleted === undefined || action.deleted
      })
    default:
      console.error('Invalid view action')
  }
}

const views = (state = initialState, action) => {
  if (_.contains(['UPDATE_VIEW', 'SOFT_DELETE_VIEW'], action.type)) {
    return state.update(action.id, 
      v => view(v, action)
    )
  } else if (action.type === 'ADD_VIEW') {
    return state.set(action.id, addView(action))
  } else if (_.contains(['DELETE_VIEW'], action.type)) {
    return state.delete(action.id)
  } else if (action.type === 'RECEIVE_VIEWS') {
    return Map(action.views.map(
      (data, index) => [data.id, addView(data)]
    ))
  } else {
    return state
  }
}

export default views
