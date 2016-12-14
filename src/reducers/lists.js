var _ = require("underscore");

const list = (state, action) => {
  switch (action.type) {
    case "UPDATE_LIST":
      return {
        ...state,
        text: action.text
      }
    case "ADD_LIST":
      console.log("Adding list with text " + action.text)

      return {
        id: action.id,
        text: action.text
      }
    case "TOGGLE_DELETE_LIST":
      return {
        ...state,
        deleted: action.deleted === undefined || action.deleted
      }
    default:
      return state
  }
}

const lists = (state = [], action) => {
  let actions = ['ADD_LIST', 'UPDATE_LIST', 'TOGGLE_DELETE_LIST']

  if (_.contains(actions, action.type)) {
    return {
      ...state,
      [action.id]: list(state[action.id], action)
    }
  } else {
      return state
  }
}

export default lists
