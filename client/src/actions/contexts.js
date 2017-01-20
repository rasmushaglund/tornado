import { jsonFetch } from '../util'

const uuidV4 = require('uuid/v4')

export const receiveContexts = (contexts) => ({
  type: 'RECEIVE_CONTEXTS',
  contexts: contexts
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

export const updateContext = (context) => {
  jsonFetch(context,
    'http://localhost:5000/contexts',
    'PUT'
  )

  return {
    type: 'UPDATE_CONTEXT',
    context: context
  }
}

export const softDeleteContext = (context) => {
  return updateContext(context.merge({deleted: true}))
}

export const deleteContext = (context) => {
  jsonFetch({id: context.id},
    'http://localhost:5000/contexts',
    'DELETE'
  )

  return {
    type: 'DELETE_CONTEXT',
    context: context
  }
}

