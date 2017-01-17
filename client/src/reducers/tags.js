import { Map } from 'immutable'
import Tag from '../models/tag'

const addTag = (data) => {
  return new Tag({
    id: data.id,
    name: data.name,
    deleted: data.deleted
  })
}

const tags = (state = Map(), action) => {
  switch (action.type) {
    case 'UPDATE_TAG':
      return state.update(action.tag.id, 
        t => action.tag
      )
    case 'ADD_TAG':
      return state.set(action.data.id, addTag(action.data))
    case 'DELETE_TAG':
      return state.delete(action.tag.id)
    case 'RECEIVE_TAGS':
      return Map(action.tags.map(
        (data, intex) => [data.id, addTag(data)]
      ))
    default:
      return state
  }
}

export default tags
