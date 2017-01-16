import { Map } from 'immutable'
import Tag from '../models/tag'
var _ = require("underscore");

const initialState = Map()

const addTag = (data) => {
  return new Tag({
    id: data.id,
    name: data.name,
    deleted: data.deleted
  })
}

const tag = (state, action) => {
  switch (action.type) {
    case "UPDATE_TAG":
      return new Tag({
        ...state,
        name: action.name
      })
    case "TOGGLE_DELETE_TAG":
      return new Tag({
        ...state,
        deleted: action.deleted === undefined || action.deleted
      })
    default:
      console.error('Invalid tag action')
  }
}

const tags = (state = initialState, action) => {
  if (_.contains(['UPDATE_TAG', 'TOGGLE_DELETE_TAG'], action)) {
    return state.update(action.id, 
      t => tag(state[action.id], action)
    )
  } else if (action.type === 'ADD_TAG') {
    return state.set(action.id, addTag(action))
  } else if (action.type === 'DELETE_TAG') {
    return state.delete(action.id)
  } else if (action.type === 'RECEIVE_TAGS') {
    return Map(action.tags.map(
      (data, intex) => [data.id, addTag(data)]
    ))
  } else {
    return state
  }
}

export default tags
