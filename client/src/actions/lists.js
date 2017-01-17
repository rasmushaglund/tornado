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

export const updateList = (list) => {
  jsonFetch(list,
    'http://localhost:5000/lists',
    'PUT'
  )

  return {
    type: 'UPDATE_LIST',
    list: list
  }
}

export const softDeleteList = (list) => {
  return updateList(list.merge({deleted: true}))
}

export const deleteList = (list) => {
  jsonFetch({id: list.id},
    'http://localhost:5000/lists',
    'DELETE'
  )

  return {
    type: 'DELETE_LIST',
    list: list
  }
}

