var _ = require("underscore");

const context = (state, action) => {
  switch (action.type) {
    case "UPDATE_CONTEXT":
      return {
        ...state,
        text: action.text
      }
    case "ADD_CONTEXT":
      console.log("Adding context with text " + action.text)

      return {
        id: action.id,
        text: action.text
      }
    case "TOGGLE_DELETE_CONTEXT":
      return {
        ...state,
        deleted: action.deleted === undefined || action.deleted
      }
    default:
      return state
  }
}

const contexts = (state = [], action) => {
  let actions = ['ADD_CONTEXT', 'UPDATE_CONTEXT', 'TOGGLE_DELETE_CONTEXT']

  if (_.contains(actions, action.type)) {
    return {
      ...state,
      [action.id]: list(state[action.id], action)
    }
  } else {
      return state
  }
}

export default contexts
