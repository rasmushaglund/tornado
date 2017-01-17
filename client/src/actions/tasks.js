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

  var data = {
    ...data,
    id: id,
    importance: parseInt(data.importance) || null,
    energy: parseInt(data.energy) || null
  }

  jsonFetch(
    data,
    'http://localhost:5000/tasks'
  )

  return {
    type: 'ADD_TASK',
    data: data
  }
}

export const updateTask = (task) => {
  task =  task.merge({
    importance: parseInt(task.importance) || null,
    energy: parseInt(task.energy) || null
  })

  jsonFetch(
    task,
    'http://localhost:5000/tasks',
    'PUT'
  )

  return {
    type: 'UPDATE_TASK',
    task: task
  }
}

export const softDeleteTask = (task) => { 
  return updateTask(task.merge({deleted: !task.deleted}))
}

export const deleteTask = (task) => {
  jsonFetch({id: task.id},
    'http://localhost:5000/tasks',
    'DELETE'
  )

  return {
    type: 'DELETE_TASK',
    task: task
  }
}

export const toggleTask = (task) => {
  return updateTask(task.merge({completed: !task.completed}))
}

