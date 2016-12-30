// TODO: change this when mock is removed
let nextTaskId = 6
let nextListId = 3
let nextViewId = 3
let nextContextId = 3

export const receiveTasks = (json) => ({
  type: 'RECEIVE_TASKS',
  tasks: json.tasks
})

export const fetchTasks = () => (dispatch) => {
  return fetch('http://localhost:5000/tasks')
    .then(response => response.json())
    .then(json => dispatch(receiveTasks(json)))
}

export const addTask = (name, lists, contexts, tags) => ({
  type: 'ADD_TASK',
  id: nextTaskId++,
  name,
  lists,
  contexts,
  tags
})

export const updateTask = (id, name, lists, contexts, tags) => ({
  type: 'UPDATE_TASK',
  id: id,
  name,
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




export const addList = (name) => ({
  type: 'ADD_LIST',
  id: nextListId++,
  name
})

export const updateList = (id, name) => ({
  type: 'UPDATE_LIST',
  id: id,
  name
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




export const addContext = (name) => ({
  type: 'ADD_CONTEXT',
  id: nextContextId++,
  name
})

export const updateContext = (id, name) => ({
  type: 'UPDATE_CONTEXT',
  id: id,
  name
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





export const addView = (name, filter) => ({
  type: 'ADD_VIEW',
  id: nextViewId++,
  name,
  filter
})

export const updateView = (id, name, filter) => ({
  type: 'UPDATE_VIEW',
  id: id,
  name,
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
