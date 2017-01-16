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

export const addView = (data) => {
  const id = uuidV4()

  jsonFetch(data,
    'http://localhost:5000/views'
  )

  return {
    type: 'ADD_VIEW',
    data: data
  }
}

export const updateView = (data) => {  
  jsonFetch(data,
    'http://localhost:5000/views',
    'PUT'
  )

  return {
    type: 'UPDATE_VIEW',
    data: data
  }
}

export const softDeleteView = (data) => {
  jsonFetch(data,
    'http://localhost:5000/views',
    'PUT'
  )
  
  return {
    type: 'SOFT_DELETE_VIEW',
    data: data
  }
}

export const deleteView = (data) => {
  jsonFetch(data,
    'http://localhost:5000/views',
    'DELETE'
  )

  return {
    type: 'DELETE_VIEW',
    data: data
  }
}

