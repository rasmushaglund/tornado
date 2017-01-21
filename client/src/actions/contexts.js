import { jsonFetch } from '../util'

import { sendMessage } from './ui'

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

export const addContext = (data) => (dispatch) => {
  const id = uuidV4()
  let newData = {...data, id: id}

  jsonFetch(newData,
    'http://localhost:5000/contexts'
  ).then(response => {
    if (response.ok) {
      dispatch(sendMessage("Added context " + newData.name))
    } else {
      dispatch(sendMessage("Failed adding context " + newData.name))
    }
  })

  dispatch({
    type: 'ADD_CONTEXT',
    data: newData
  })

  return newData
}

export const updateContext = (context) => (dispatch) => {
  jsonFetch(context,
    'http://localhost:5000/contexts',
    'PUT'
  ).then(response => {
    if (response.ok) {
      dispatch(sendMessage("Added context " + context.name))
    } else {
      dispatch(sendMessage("Failed adding context " + context.name))
    }
  })

  dispatch({
    type: 'UPDATE_CONTEXT',
    context: context
  })
}

export const softDeleteContext = (context) => {
  return updateContext(context.merge({deleted: true}))
}

export const deleteContext = (context) => (dispatch) => {
  jsonFetch({id: context.id},
    'http://localhost:5000/contexts',
    'DELETE'
  ).then(response => {
    if (response.ok) {
      dispatch(sendMessage("Deleted context " + context.name))
    } else {
      dispatch(sendMessage("Failed to delete context " + context.name))
    }
  })

  dispatch({
    type: 'DELETE_CONTEXT',
    context: context
  })
}

