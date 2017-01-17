import { Map } from 'immutable'
import View from '../models/view'

const addView = (data) => {
  return new View({
    id: data.id,
    name: data.name,
    filter: data.filter,
    deleted: data.deleted
  })
}

const views = (state = Map(), action) => {
  switch (action.type) {
    case 'UPDATE_VIEW':
      return state.update(action.view.id, 
        v => action.view
      )
    case 'ADD_VIEW':
      return state.set(action.data.id, addView(action.data))
    case 'DELETE_VIEW':
      return state.delete(action.view.id)
    case 'RECEIVE_VIEWS':
      return Map(action.views.map(
        (data, index) => [data.id, addView(data)]
      ))
    default:
      return state
  }
}

export default views
