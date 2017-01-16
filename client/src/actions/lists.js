import { jsonFetch } from '../util'

const uuidV4 = require('uuid/v4')

export const receiveLists = (json) => ({
  type: 'RECEIVE_LISTS',
  lists: json.lists
})

export const fetchLists = () => (dispatch) => {
  return fetch('http://localhost:5000/lists')
    .then(response => response.json())
    .then(json => dispatch(receiveLists(json)))
}

export const addList = (data) => {
  const id = uuidV4()
  data = {...data, id: id}
  
  jsonFetch(data,
    'http://localhost:5000/lists'
  )

  return {
    type: 'ADD_LIST',
    data: data
  }
}

export const updateList = (data) => {
  jsonFetch(data,
    'http://localhost:5000/lists',
    'PUT'
  )

  return {
    type: 'UPDATE_LIST',
    data: data
  }
}

export const softDeleteList = (data) => {
  data = {...data, deleted: true}
  jsonFetch(data,
    'http://localhost:5000/lists',
    'PUT'
  )

  return {
    type: 'SOFT_DELETE_LIST',
    data: data,
  }
}

export const deleteList = (data) => {
  jsonFetch(data,
    'http://localhost:5000/lists',
    'DELETE'
  )

  return {
    type: 'DELETE_LIST',
    data: data
  }
}

