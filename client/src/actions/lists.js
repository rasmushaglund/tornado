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

