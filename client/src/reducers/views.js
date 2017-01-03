var _ = require("underscore");

const view = (state, action) => {
  switch (action.type) {
    case "UPDATE_VIEW":
      return {
        ...state,
        name: action.name,
        filter: action.filter
      }
    case "ADD_VIEW":
      console.log("Adding view with text " + action.name + " and filter " + action.filter)

      return {
        id: action.id,
        name: action.name,
        filter: action.filter
      }
    case "SOFT_DELETE_VIEW":
      return {
        ...state,
        deleted: action.deleted === undefined || action.deleted
      }
    default:
      return state
  }
}

const views = (state = [], action) => {
  if (_.contains(['ADD_VIEW', 'UPDATE_VIEW', 'SOFT_DELETE_VIEW'], action.type)) {
    return {
      ...state,
      [action.id]: view(state[action.id], action)
    }
  } else if (_.contains(['DELETE_VIEW'], action.type)) {
    return _.filter(state, task =>
        view.id !== action.id
      )
  } else if (action.type === 'RECEIVE_VIEWS') {
    return _.object(_.map(action.views, data => {
      return [data.id, view(data, 'ADD_VIEW')]
    }))
  } else {
      return state
  }
}

export default views
