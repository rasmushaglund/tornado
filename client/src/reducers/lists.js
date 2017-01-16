import { Map } from 'immutable'
import List from '../models/list'
var _ = require("underscore");

const initialState = Map()

const addList = (data) => {
  return new List({
    id: data.id,
    name: data.name,
    deleted: data.deleted
  })
}

const list = (state, action) => {
  switch (action.type) {
    case "UPDATE_LIST":
      return new List({
        ...state,
        name: action.name
      })
    case "SOFT_DELETE_LIST":
      return new List({
        ...state,
        deleted: action.deleted === undefined || action.deleted
      })
    default:
      console.error('Invalid list action')
  }
}

const lists = (state = initialState, action) => {
  if (_.contains(['UPDATE_LIST', 'SOFT_DELETE_LIST'], action.type)) {
    return state.update(action.id, 
      l => list(l, action)
    )
  } else if (action.type === 'ADD_LIST') {
    return state.set(action.id, addList(action))
  } else if (_.contains(['DELETE_LIST'], action.type)) {
    return state.delete(action.id)
  } else if (action.type === 'RECEIVE_LISTS') {
    return Map(action.lists.map(
      (data, index) => [data.id, addList(data)]
    ))
  } else {
    return state
  }
}

export default lists
