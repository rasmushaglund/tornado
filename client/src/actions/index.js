const uuidV4 = require('uuid/v4')

const jsonFetch = (data, url, method = 'POST') => {
  return fetch(url, {
    method: method, 
    body: JSON.stringify(data), 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}

export const receiveTasks = (json) => ({
  type: 'RECEIVE_TASKS',
  tasks: json.tasks
})

export const fetchTasks = () => (dispatch) => {
  return fetch('http://localhost:5000/tasks')
    .then(response => response.json())
    .then(json => dispatch(receiveTasks(json)))
}

export const addTask = (name, description, lists, contexts, tags, time, importance, deadline, energy) => {
  const id = uuidV4()

  jsonFetch(
    {
      id: id,
      name: name,
      description: description,
      lists: lists,
      contexts: contexts,
      tags: tags,
      time: time,
      importance: importance,
      deadline: deadline,
      energy: energy
    },
    'http://localhost:5000/tasks'
  )

  return {
    type: 'ADD_TASK',
    id: id,
    name,
    description, 
    lists,
    contexts,
    tags,
    time, 
    importance,
    deadline,
    energy
  }
}

export const updateTask = (id, name, description, lists, contexts, tags, time, importance, deadline, energy) => {
  jsonFetch(
    {
      id: id,
      name: name,
      lists: lists,
      description: description,
      contexts: contexts,
      tags: tags,
      time: time,
      importance: importance,
      deadline: deadline,
      energy: energy
    },
    'http://localhost:5000/tasks',
    'PUT'
  )

  return {
    type: 'UPDATE_TASK',
    id: id,
    name,
    description,
    lists,
    contexts,
    tags,
    time,
    importance,
    deadline,
    energy
  }
}

export const softDeleteTask = (id, deleted = true) => { 
  jsonFetch({
      id: id,
      deleted: deleted
    },
    'http://localhost:5000/tasks',
    'PUT'
  )

  return {
    type: 'SOFT_DELETE_TASK',
    id,
    deleted
  }
}

export const deleteTask = (id) => {
  jsonFetch({
      id: id
    },
    'http://localhost:5000/tasks',
    'DELETE'
  )

  return {
    type: 'DELETE_TASK',
    id
  }
}

export const toggleTask = (id, completed) => {
  jsonFetch({
      id: id,
      completed: completed
    },
    'http://localhost:5000/tasks',
    'PUT'
  )

  return {
    type: 'TOGGLE_TASK',
    id,
    completed
  }
}

export const toggleUpdateTask = (task) => ({
  type: 'TOGGLE_EDIT_TASK',
  task
})




export const receiveLists = (json) => ({
  type: 'RECEIVE_LISTS',
  lists: json.lists
})

export const fetchLists = () => (dispatch) => {
  return fetch('http://localhost:5000/lists')
    .then(response => response.json())
    .then(json => dispatch(receiveLists(json)))
}

export const addList = (name) => {
  const id = uuidV4()
  
  jsonFetch({
      id: id,
      name: name
    },
    'http://localhost:5000/lists'
  )

  return {
    type: 'ADD_LIST',
    id: id,
    name
  }
}

export const updateList = (id, name) => {
  jsonFetch({
      id: id,
      name: name
    },
    'http://localhost:5000/lists',
    'PUT'
  )

  return {
    type: 'UPDATE_LIST',
    id: id,
    name
  }
}

export const softDeleteList = (id, deleted = true) => {
  jsonFetch({
      id: id,
      deleted: deleted
    },
    'http://localhost:5000/lists',
    'PUT'
  )

  return {
    type: 'SOFT_DELETE_LIST',
    id,
    deleted
  }
}

export const deleteList = (id) => {
  jsonFetch({
      id: id
    },
    'http://localhost:5000/lists',
    'DELETE'
  )

  return {
    type: 'DELETE_LIST',
    id
  }
}

export const toggleUpdateList = (list) => ({
  type: 'TOGGLE_EDIT_LIST',
  list
})




export const receiveContexts = (json) => ({
  type: 'RECEIVE_CONTEXTS',
  contexts: json.contexts
})

export const fetchContexts = () => (dispatch) => {
  return fetch('http://localhost:5000/contexts')
    .then(response => response.json())
    .then(json => dispatch(receiveContexts(json)))
}

export const addContext = (name) => {
  const id = uuidV4()
  
  jsonFetch({
      id: id,
      name: name
    },
    'http://localhost:5000/contexts'
  )

  return {
    type: 'ADD_CONTEXT',
    id: id,
    name
  }
}

export const updateContext = (id, name) => {
  jsonFetch({
      id: id,
      name: name
    },
    'http://localhost:5000/contexts',
    'PUT'
  )

  return {
    type: 'UPDATE_CONTEXT',
    id: id,
    name
  }
}

export const softDeleteContext = (id, deleted = true) => {
  jsonFetch({
      id: id,
      deleted: deleted
    },
    'http://localhost:5000/contexts',
    'PUT'
  )

  return {
    type: 'SOFT_DELETE_CONTEXT',
    id,
    deleted
  }
}

export const deleteContext = (id) => {
  jsonFetch({
      id: id
    },
    'http://localhost:5000/contexts',
    'DELETE'
  )

  return {
    type: 'DELETE_CONTEXT',
    id
  }
}

export const toggleUpdateContext = (context) => ({
  type: 'TOGGLE_EDIT_CONTEXT',
  context
})




export const receiveViews = (json) => ({
  type: 'RECEIVE_VIEWS',
  views: json.views
})

export const fetchViews = () => (dispatch) => {
  return fetch('http://localhost:5000/views')
    .then(response => response.json())
    .then(json => dispatch(receiveViews(json)))
}

export const addView = (name, filter) => {
  const id = uuidV4()
  
  jsonFetch({
      id: id,
      name: name,
      filter: filter
    },
    'http://localhost:5000/views'
  )

  return {
    type: 'ADD_VIEW',
    id: id,
    name,
    filter
  }
}

export const updateView = (id, name, filter) => {
  jsonFetch({
      id: id,
      name: name,
      filter: filter
    },
    'http://localhost:5000/views',
    'PUT'
  )

  return {
    type: 'UPDATE_VIEW',
    id: id,
    name,
    filter
  }
}

export const softDeleteView = (id, deleted = true) => {
  jsonFetch({
      id: id,
      deleted: deleted
    },
    'http://localhost:5000/views',
    'PUT'
  )
  
  return {
    type: 'SOFT_DELETE_VIEW',
    id,
    deleted
  }
}

export const deleteView = (id) => {
  jsonFetch({
      id: id
    },
    'http://localhost:5000/views',
    'DELETE'
  )

  return {
    type: 'DELETE_VIEW',
    id
  }
}

export const toggleUpdateView = (view) => ({
  type: 'TOGGLE_EDIT_VIEW',
  view
})



export const receiveTags = (json) => ({
  type: 'RECEIVE_TAGS',
  tags: json.tags
})

export const fetchTags = () => (dispatch) => {
  return fetch('http://localhost:5000/tags')
    .then(response => response.json())
    .then(json => dispatch(receiveTags(json)))
}

export const addTag = (name) => {
  const id = uuidV4()
  
  jsonFetch({
      id: id,
      name: name
    },
    'http://localhost:5000/tags'
  )

  return {
    type: 'ADD_TAG',
    id: id,
    name
  }
}

export const updateTag = (id, name) => {
  jsonFetch({
      id: id,
      name: name
    },
    'http://localhost:5000/tags',
    'PUT'
  )

  return {
    type: 'UPDATE_TAG',
    id: id,
    name
  }
}

export const softDeleteTag = (id, deleted = true) => {
  jsonFetch({
      id: id,
      deleted: deleted
    },
    'http://localhost:5000/tags',
    'PUT'
  )

  return {
    type: 'SOFT_DELETE_TAG',
    id,
    deleted
  }
}

export const deleteTag = (id) => {
  jsonFetch({
      id: id
    },
    'http://localhost:5000/tags',
    'DELETE'
  )

  return {
    type: 'DELETE_TAG',
    id
  }
}

export const toggleUpdateTag = (tag) => ({
  type: 'TOGGLE_EDIT_TAG',
  tag
})
