// TODO: change this when mock is removed
let nextTaskId = 6
let nextListId = 3
let nextViewId = 3
let nextContextId = 3

export const addTask = (text, lists, contexts, tags) => ({
  type: 'ADD_TASK',
  id: nextTaskId++,
  text,
  lists,
  contexts,
  tags
})

export const updateTask = (id, text, lists, contexts, tags) => ({
  type: 'UPDATE_TASK',
  id: id,
  text,
  lists,
  contexts,
  tags
})

export const softDeleteTask = (id, deleted = true) => ({
  type: 'SOFT_DELETE_TASK',
  id,
  deleted
})

export const deleteTask = (id) => ({
  type: 'DELETE_TASK',
  id
})

export const toggleTask = (id, completed) => ({
  type: 'TOGGLE_TASK',
  id,
  completed
})

export const toggleUpdateTask = (task) => ({
  type: 'TOGGLE_EDIT_TASK',
  task
})




export const addList = (text) => ({
  type: 'ADD_LIST',
  id: nextListId++,
  text
})

export const updateList = (id, text) => ({
  type: 'UPDATE_LIST',
  id: id,
  text
})

export const softDeleteList = (id, deleted = true) => ({
  type: 'SOFT_DELETE_LIST',
  id,
  deleted
})

export const deleteList = (id) => ({
  type: 'DELETE_LIST',
  id
})

export const toggleUpdateList = (list) => ({
  type: 'TOGGLE_EDIT_LIST',
  list
})




export const addContext = (text) => ({
  type: 'ADD_CONTEXT',
  id: nextListId++,
  text
})

export const updateContext = (id, text) => ({
  type: 'UPDATE_CONTEXT',
  id: id,
  text
})

export const softDeleteContext = (id, deleted = true) => ({
  type: 'SOFT_DELETE_CONTEXT',
  id,
  deleted
})

export const deleteContext = (id) => ({
  type: 'DELETE_CONTEXT',
  id
})

export const toggleUpdateContext = (list) => ({
  type: 'TOGGLE_EDIT_CONTEXT',
  list
})





export const addView = (text, filter) => ({
  type: 'ADD_VIEW',
  id: nextViewId++,
  text,
  filter
})

export const updateView = (id, text, filter) => ({
  type: 'UPDATE_VIEW',
  id: id,
  text,
  filter
})

export const softDeleteView = (id, deleted = true) => ({
  type: 'SOFT_DELETE_VIEW',
  id,
  deleted
})

export const deleteView = (id) => ({
  type: 'DELETE_VIEW',
  id
})

export const toggleUpdateView = (view) => ({
  type: 'TOGGLE_EDIT_VIEW',
  view
})
