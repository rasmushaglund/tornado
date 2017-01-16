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

export const addTask = (data) => {
  const id = uuidV4()

  var data = data.merge({
    id: id,
    importance: parseInt(taskData.importance) || null,
    energy: parseInt(taskData.energy) || null
  })

  jsonFetch(
    data,
    'http://localhost:5000/tasks'
  )

  return {
    type: 'ADD_TASK',
    data: task
  }
}

export const updateTask = (data) => {
  var data =  data.merge({
    importance: parseInt(taskData.importance) || null,
    energy: parseInt(taskData.energy) || null
  })

  jsonFetch(
    data,
    'http://localhost:5000/tasks',
    'PUT'
  )

  return {
    type: 'UPDATE_TASK',
    data: data
  }
}

export const softDeleteTask = (data) => { 
  return updateTask(data.merge({deleted: deleted}))
}

export const deleteTask = (data) => {
  jsonFetch(data,
    'http://localhost:5000/tasks',
    'DELETE'
  )

  return {
    type: 'DELETE_TASK',
    data: data
  }
}

export const toggleTask = (data) => {
  return updateTask(data)
}

