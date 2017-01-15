import { jsonFetch } from '../util'

const uuidV4 = require('uuid/v4')

export const receiveTags = (json) => ({
  type: 'RECEIVE_TAGS',
  tags: json.tags
})

export const fetchTags = () => (dispatch) => {
  return fetch('http://localhost:5000/tags')
    .then(response => response.json())
    .then(json => dispatch(receiveTags(json)))
}

export const addTag = (name) => {
  const id = uuidV4()
  
  jsonFetch({
      id: id,
      name: name
    },
    'http://localhost:5000/tags'
  )

  return {
    type: 'ADD_TAG',
    id: id,
    name
  }
}

export const updateTag = (id, name) => {
  jsonFetch({
      id: id,
      name: name
    },
    'http://localhost:5000/tags',
    'PUT'
  )

  return {
    type: 'UPDATE_TAG',
    id: id,
    name
  }
}

export const softDeleteTag = (id, deleted = true) => {
  jsonFetch({
      id: id,
      deleted: deleted
    },
    'http://localhost:5000/tags',
    'PUT'
  )

  return {
    type: 'SOFT_DELETE_TAG',
    id,
    deleted
  }
}

export const deleteTag = (id) => {
  jsonFetch({
      id: id
    },
    'http://localhost:5000/tags',
    'DELETE'
  )

  return {
    type: 'DELETE_TAG',
    id
  }
}

