var _ = require("underscore");

const list = (state, action) => {
  switch (action.type) {
    case "UPDATE_LIST":
      return {
        ...state,
        name: action.name
      }
    case "ADD_LIST":
      console.log("Adding list with name " + action.name)

      return {
        id: action.id,
        name: action.name
      }
    case "SOFT_DELETE_LIST":
      return {
        ...state,
        deleted: action.deleted === undefined || action.deleted
      }
    default:
      return state
  }
}

const lists = (state = [], action) => {
  if (_.contains(['ADD_LIST', 'UPDATE_LIST', 'SOFT_DELETE_LIST'], action.type)) {
    return {
      ...state,
      [action.id]: list(state[action.id], action)
    }
  } else if (_.contains(['DELETE_LIST'], action.type)) {
    return _.filter(state, list =>
        list.id !== action.id
      )
  } else if (action.type === 'RECEIVE_LISTS') {
    return _.object(_.map(action.lists, data => {
      return [data.id, list(data, 'ADD_LIST')]
    }))
  } else {
      return state
  }
}

export default lists
