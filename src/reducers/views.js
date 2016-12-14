var _ = require("underscore");

const view = (state, action) => {
  switch (action.type) {
    case "UPDATE_VIEW":
      return {
        ...state,
        text: action.text,
        filter: action.filter
      }
    case "ADD_VIEW":
      console.log("Adding view with text " + action.text + " and filter " + action.filter)

      return {
        id: action.id,
        text: action.text,
        filter: action.filter
      }
    case "TOGGLE_DELETE_VIEW":
      return {
        ...state,
        deleted: action.deleted === undefined || action.deleted
      }
    default:
      return state
  }
}

const views = (state = [], action) => {
  let actions = ['ADD_VIEW', 'UPDATE_VIEW', 'TOGGLE_DELETE_VIEW']

  if (_.contains(actions, action.type)) {
    return {
      ...state,
      [action.id]: view(state[action.id], action)
    }
  } else {
      return state
  }
}

export default views
