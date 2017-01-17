import { Map } from 'immutable'
import List from '../models/list'

const addList = (data) => {
  return new List({
    id: data.id,
    name: data.name,
    deleted: data.deleted
  })
}

const lists = (state = Map(), action) => {
  switch (action.type) {
    case 'UPDATE_LIST':
      return state.update(action.list.id, 
        l => action.list
      )
    case 'ADD_LIST':
      return state.set(action.data.id, addList(action.data))
    case 'DELETE_LIST':
      return state.delete(action.list.id)
    case 'RECEIVE_LISTS':
      return Map(action.lists.map(
        (data, index) => [data.id, addList(data)]
      ))
    default:
      return state
  }
}

export default lists
