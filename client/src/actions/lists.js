import { jsonFetch } from '../util'
import { sendMessage } from './ui'

const uuidV4 = require('uuid/v4')

export const receiveLists = (lists) => ({
  type: 'RECEIVE_LISTS',
  lists: lists
})

export const fetchLists = () => (dispatch) => {
  return fetch('http://localhost:5000/lists')
    .then(response => response.json())
    .then(json => dispatch(receiveLists(json)))
}

export const addList = (data) => (dispatch) => {
  const id = uuidV4()
  let newData = {...data, id: id}
  
  jsonFetch(newData,
    'http://localhost:5000/lists'
  ).then(response => {
    if (response.ok) {
      dispatch(sendMessage("Added list " + newData.name))
    } else {
      dispatch(sendMessage("Failed adding list " + newData.name))
    }
  })


  dispatch({
    type: 'ADD_LIST',
    data: newData
  })

  return newData
}

export const updateList = (list) => (dispatch) => {
  jsonFetch(list,
    'http://localhost:5000/lists',
    'PUT'
  ).then(response => {
    if (response.ok) {
      dispatch(sendMessage("Updated list " + list.name))
    } else {
      dispatch(sendMessage("Failed updating list " + list.name))
    }
  })


  dispatch({
    type: 'UPDATE_LIST',
    list: list
  })
}

export const softDeleteList = (list) => {
  return updateList(list.merge({deleted: true}))
}

export const deleteList = (list) => (dispatch) => {
  jsonFetch({id: list.id},
    'http://localhost:5000/lists',
    'DELETE'
  ).then(response => {
    if (response.ok) {
      dispatch(sendMessage("Deleted list " + list.name))
    } else {
      dispatch(sendMessage("Failed deleting list " + list.name))
    }
  })


  dispatch({
    type: 'DELETE_LIST',
    list: list
  })
}

