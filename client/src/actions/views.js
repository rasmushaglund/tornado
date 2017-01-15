import { jsonFetch } from '../util'

const uuidV4 = require('uuid/v4')

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

