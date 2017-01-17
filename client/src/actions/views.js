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
  data = {...data, id: id}

  jsonFetch(data,
    'http://localhost:5000/views'
  )

  return {
    type: 'ADD_VIEW',
    data: data
  }
}

export const updateView = (view) => {  
  jsonFetch(view,
    'http://localhost:5000/views',
    'PUT'
  )

  return {
    type: 'UPDATE_VIEW',
    view: view
  }
}

export const softDeleteView = (view) => {
  return updateView(view.merge({deleted: !view.deleted}))
}

export const deleteView = (view) => {
  jsonFetch({id: view.id},
    'http://localhost:5000/views',
    'DELETE'
  )

  return {
    type: 'DELETE_VIEW',
    view: view
  }
}

