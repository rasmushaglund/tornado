var _ = require("underscore");

const tag = (state, action) => {
  switch (action.type) {
    case "UPDATE_TAG":
      return {
        ...state,
        name: action.name
      }
    case "ADD_TAG":
      console.log("Adding tag with text " + action.name)

      return {
        id: action.id,
        name: action.name
      }
    case "TOGGLE_DELETE_TAG":
      return {
        ...state,
        deleted: action.deleted === undefined || action.deleted
      }
    default:
      return state
  }
}

const tags = (state = [], action) => {
  let actions = ['ADD_TAG', 'UPDATE_TAG', 'TOGGLE_DELETE_TAG']

  if (_.contains(actions, action.type)) {
    return {
      ...state,
      [action.id]: tag(state[action.id], action)
    }
  } else if (action.type === 'RECEIVE_TAGS') {
    return _.object(_.map(action.tags, data => {
      return [data.id, tag(data, 'ADD_TAG')]
    }))
  } else {
      return state
  }
}

export default tags
