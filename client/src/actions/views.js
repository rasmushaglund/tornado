import { jsonFetch } from '../util'
import { sendMessage } from './ui'

const uuidV4 = require('uuid/v4')

export const receiveViews = (views) => ({
  type: 'RECEIVE_VIEWS',
  views: views
})

export const fetchViews = () => (dispatch) => {
  return fetch('http://localhost:5000/views')
    .then(response => response.json())
    .then(json => dispatch(receiveViews(json)))
}

export const addView = (data) => (dispatch) => {
  const id = uuidV4()
  let newData = {...data, id: id}

  jsonFetch(newData,
    'http://localhost:5000/views'
  ).then(response => {
    if (response.ok) {
      dispatch(sendMessage("Added view " + newData.name))
    } else {
      dispatch(sendMessage("Failed adding view " + newData.name))
    }
  })

  dispatch({
    type: 'ADD_VIEW',
    data: newData
  })

  return newData
}

export const updateView = (view) => (dispatch) => {  
  jsonFetch(view,
    'http://localhost:5000/views',
    'PUT'
  ).then(response => {
    if (response.ok) {
      dispatch(sendMessage("Updated view " + view.name))
    } else {
      dispatch(sendMessage("Failed updating view " + view.name))
    }
  })

  dispatch({
    type: 'UPDATE_VIEW',
    view: view
  })
}

export const softDeleteView = (view) => (dispatch) => {
  return updateView(view.merge({deleted: !view.deleted}))
}

export const deleteView = (view) => (dispatch) => {
  jsonFetch({id: view.id},
    'http://localhost:5000/views',
    'DELETE'
  ).then(response => {
    if (response.ok) {
      dispatch(sendMessage("Deleted view " + view.name))
    } else {
      dispatch(sendMessage("Failed deleting view " + view.name))
    }
  })


  dispatch({
    type: 'DELETE_VIEW',
    view: view
  })
}

