// TODO: change this when mock is removed
let nextTaskId = 6
let nextListId = 3
let nextViewId = 3

export const addTask = (text) => ({
  type: 'ADD_TASK',
  id: nextTaskId++,
  text
})

export const updateTask = (id, text) => ({
  type: 'UPDATE_TASK',
  id: id,
  text
})

export const addList = (text) => ({
  type: 'ADD_LIST',
  id: nextListId++,
  text
})

export const addView = (text, filter) => ({
  type: 'ADD_VIEW',
  id: nextViewId++,
  text,
  filter
})

export const toggleDeleteTask = (id, deleted) => ({
  type: 'TOGGLE_DELETE_TASK',
  id,
  deleted
})

export const toggleTask = (id, completed) => ({
  type: 'TOGGLE_TASK',
  id,
  completed
})

export const toggleUpdateView = () => ({
  type: 'TOGGLE_EDIT_VIEW',
})

export const toggleUpdateTask = (task) => ({
  type: 'TOGGLE_EDIT_TASK',
  task
})

export const toggleUpdateList = () => ({
  type: 'TOGGLE_EDIT_LIST',
})
