import { Map } from 'immutable'
import Task from '../models/task'
var _ = require("underscore");

const initialState = Map()

const addTask = (data) => {
  return new Task({
    id: data.id,
    completed: data.completed,
    name: data.name,
    description: data.description,
    lists: data.lists,
    tags: data.tags,
    contexts: data.contexts,
    importance: data.importance,
    deadline: data.deadline,
    time: data.time,
    energy: data.energy,
    deleted: data.deleted
  })
}

// TODO kan vi skippa att bara mappa? kan vi inte bara ta ...state, ...action? vill ju inte andra id
// TODO switch istallet?

const task = (state, action) => {
  switch (action.type) {
    case "UPDATE_TASK":
      return new Task({
        ...state,
        name: action.name,
        description: action.description,
        lists: action.lists,
        completed: action.completed,
        tags: action.tags,
        contexts: action.contexts,
        importance: action.importance,
        deadline: action.deadline,
        time: action.time,
        deleted: action.deleted,
        energy: action.energy
      })
    default:
      console.log('Invalid task action')
  }
}

const tasks = (state = initialState, action) => {
  if (_.contains(['UPDATE_TASK'], action.type)) {
    return state.update(action.id, 
      t => task(state[action.id], action)
    )
  } else if (action.type === 'ADD_TASK') {
    return state.set(action.id, addTask(action))
  } else if (_.contains(['DELETE_TASK'], action)) {
    return state.delete(action.id)
  } else if (action.type === 'RECEIVE_TASKS') {
    return Map(action.tasks.map(
      (data, index) => [data.id, addTask(data)]
    ))
  } else {
    return state
  }
}

export default tasks
