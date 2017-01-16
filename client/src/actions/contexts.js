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

export const addContext = (data) => {
  const id = uuidV4()
  data = {...data, id: id}

  jsonFetch(data,
    'http://localhost:5000/contexts'
  )

  return {
    type: 'ADD_CONTEXT',
    data: data
  }
}

export const updateContext = (data) => {
  jsonFetch(data,
    'http://localhost:5000/contexts',
    'PUT'
  )

  return {
    type: 'UPDATE_CONTEXT',
    data: data
  }
}

export const softDeleteContext = (data) => {
  data = {...data, deleted: true}

  jsonFetch(data,
    'http://localhost:5000/contexts',
    'PUT'
  )

  return {
    type: 'SOFT_DELETE_CONTEXT',
    data: data
  }
}

export const deleteContext = (data) => {
  jsonFetch(data,
    'http://localhost:5000/contexts',
    'DELETE'
  )

  return {
    type: 'DELETE_CONTEXT',
    data: data
  }
}

