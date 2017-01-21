import { jsonFetch } from '../util'
import { sendMessage } from './ui'

const uuidV4 = require('uuid/v4')

export const receiveTags = (tags) => ({
  type: 'RECEIVE_TAGS',
  tags: tags
})

export const fetchTags = () => (dispatch) => {
  return fetch('http://localhost:5000/tags')
    .then(response => response.json())
    .then(json => dispatch(receiveTags(json)))
}

export const addTag = (data) => (dispatch) => {
  const id = uuidV4()
  let newData = {...data, id: id}

  jsonFetch(newData,
    'http://localhost:5000/tags'
  ).then(response => {
    if (response.ok) {
      dispatch(sendMessage("Added tag " + newData.name))
    } else {
      dispatch(sendMessage("Failed adding tag " + newData.name))
    }
  })

  dispatch({
    type: 'ADD_TAG',
    data: newData
  })

  return newData
}

export const updateTag = (tag) => (dispatch) => {
  jsonFetch(tag,
    'http://localhost:5000/tags',
    'PUT'
  ).then(response => {
    if (response.ok) {
      dispatch(sendMessage("Updated tag " + tag.name))
    } else {
      dispatch(sendMessage("Failed updating tag " + tag.name))
    }
  })

  dispatch({
    type: 'UPDATE_TAG',
    tag: tag
  })
}

export const softDeleteTag = (data) => {
  return updateTag(tag.merge({deleted: true}))
}

export const deleteTag = (tag) => (dispatch) => {
  jsonFetch({id: tag.id},
    'http://localhost:5000/tags',
    'DELETE'
  ).then(response => {
    if (response.ok) {
      dispatch(sendMessage("Deleted tag " + tag.name))
    } else {
      dispatch(sendMessage("Failed deleting tag " + tag.name))
    }
  })

  dispatch({
    type: 'DELETE_TAG',
    tag: tag
  })
}

