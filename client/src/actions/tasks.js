import { jsonFetch } from '../util'
import { sendMessage } from './ui'

const uuidV4 = require('uuid/v4')

export const receiveTasks = (tasks) => ({
  type: 'RECEIVE_TASKS',
  tasks: tasks
})

export const fetchTasks = () => (dispatch) => {
  return fetch('http://localhost:5000/tasks')
    .then(response => response.json())
    .then(json => dispatch(receiveTasks(json)))
}

export const addTask = (data) => (dispatch) => {
  const id = uuidV4()

  var taskData = {
    ...data,
    id: id,
    importance: parseInt(data.importance) || null,
    energy: parseInt(data.energy) || null
  }

  jsonFetch(
    taskData,
    'http://localhost:5000/tasks'
  ).then(response => {
    if (response.ok) {
      dispatch(sendMessage("Added task " + taskData.name))
    } else {
      dispatch(sendMessage("Failed adding task " + taskData.name))
    }
  })

  dispatch({
    type: 'ADD_TASK',
    data: taskData
  })

  return data
}

export const updateTask = (task) => (dispatch) => {
  let newTask =  task.merge({
    importance: parseInt(task.importance) || null,
    energy: parseInt(task.energy) || null
  })

  jsonFetch(
    newTask,
    'http://localhost:5000/tasks',
    'PUT'
  ).then(response => {
    if (response.ok) {
      dispatch(sendMessage("Updated task " + newTask.name))
    } else {
      dispatch(sendMessage("Failed to update task " + newTask.name))
    }
  })

  dispatch({
    type: 'UPDATE_TASK',
    task: newTask
  })
}

export const softDeleteTask = (task) => { 
  return updateTask(task.merge({deleted: !task.deleted}))
}

export const deleteTask = (task) => (dispatch) => {
  jsonFetch({id: task.id},
    'http://localhost:5000/tasks',
    'DELETE'
  ).then(response => {
    if (response.ok) {
      dispatch(sendMessage("Deleted task " + task.name))
    } else {
      dispatch(sendMessage("Failed deleting task " + task.name))
    }
  })

  dispatch({
    type: 'DELETE_TASK',
    task: task
  })
}

export const toggleTask = (task) => {
  return updateTask(task.merge({completed: !task.completed}))
}

