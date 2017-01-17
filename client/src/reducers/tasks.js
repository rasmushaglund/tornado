import { Map } from 'immutable'
import Task from '../models/task'

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

const tasks = (state = Map(), action) => {
  switch (action.type) {
    case 'UPDATE_TASK':
      return state.update(action.task.id, 
        t => action.task
      )
    case 'ADD_TASK':
      return state.set(action.data.id, addTask(action.data))
    case 'DELETE_TASK':
      return state.delete(action.task.id)
    case 'RECEIVE_TASKS':
      return Map(action.tasks.map(
        (data, index) => [data.id, addTask(data)]
      ))
    default:
      return state
  }
}

export default tasks
