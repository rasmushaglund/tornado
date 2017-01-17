import { Map } from 'immutable'
import Context from '../models/context'

const addContext = (data) => {
  return new Context({
    id: data.id,
    name: data.name,
    deleted: data.deleted
  })
}

const contexts = (state = Map(), action) => {
  switch (action.type) {
    case 'UPDATE_CONTEXT':
      return state.update(action.context.id, 
        c => action.context
      )
    case 'ADD_CONTEXT':
      return state.set(action.data.id, addContext(action.data))
    case 'DELETE_CONTEXT':
      return state.delete(action.context.id)
    case 'RECEIVE_CONTEXTS':
      return Map(action.contexts.map(
        (data, index) => [data.id, addContext(data)]
      ))    
    default:
      return state
  }
}

export default contexts
