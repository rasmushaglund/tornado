import { jsonFetch } from '../util'

const uuidV4 = require('uuid/v4')

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

