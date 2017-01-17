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

export const addTag = (data) => {
  const id = uuidV4()
  data = {...data, id: id}

  jsonFetch(data,
    'http://localhost:5000/tags'
  )

  return {
    type: 'ADD_TAG',
    data: data
  }
}

export const updateTag = (tag) => {
  jsonFetch(tag,
    'http://localhost:5000/tags',
    'PUT'
  )

  return {
    type: 'UPDATE_TAG',
    tag: tag
  }
}

export const softDeleteTag = (data) => {
  return updateTag(tag.merge({deleted: true}))
}

export const deleteTag = (tag) => {
  jsonFetch({id: tag.id},
    'http://localhost:5000/tags',
    'DELETE'
  )

  return {
    type: 'DELETE_TAG',
    tag: tag
  }
}

