import { jsonFetch } from '../util'

const uuidV4 = require('uuid/v4')

export const receiveTasks = (json) => ({
  type: 'RECEIVE_TASKS',
  tasks: json.tasks
})

export const fetchTasks = () => (dispatch) => {
  return fetch('http://localhost:5000/tasks')
    .then(response => response.json())
    .then(json => dispatch(receiveTasks(json)))
}

export const addTask = (taskData) => {
  const id = uuidV4()

  var task = Object.assign(taskData, {
    id: id,
    importance: parseInt(taskData.importance) || null,
    energy: parseInt(taskData.energy) || null
  })

  jsonFetch(
    task,
    'http://localhost:5000/tasks'
  )

  return {
    type: 'ADD_TASK',
    ...task
  }
}

export const updateTask = (taskData) => {
  var task =  Object.assign(taskData, { 
    importance: parseInt(taskData.importance) || null,
    energy: parseInt(taskData.energy) || null
  })

  jsonFetch(
    task,
    'http://localhost:5000/tasks',
    'PUT'
  )

  return {
    type: 'UPDATE_TASK',
    ...task
  }
}

export const softDeleteTask = (task, deleted = true) => { 
  return updateTask(Object.assign(task, {deleted: deleted}))
}

export const deleteTask = (task) => {
  jsonFetch({
      id: task.id
    },
    'http://localhost:5000/tasks',
    'DELETE'
  )

  return {
    type: 'DELETE_TASK',
    id
  }
}

export const toggleTask = (task, completed) => {
  return updateTask(Object.assign(task, {completed: completed}))
}

