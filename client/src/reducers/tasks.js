var _ = require("underscore");


const task = (state, action) => {
  switch (action.type) {
    case "UPDATE_TASK":
      return {
        ...state,
        text: action.text,
        lists: action.lists,
        tags: action.tags,
        contexts: action.contexts
      }
    case "ADD_TASK":
      return {
        ...state,
        id: action.id,
        completed: false,
        text: action.text,
        lists: action.lists,
        tags: action.tags,
        contexts: action.contexts
      }
    case "TOGGLE_TASK":
      return {
        ...state,
        completed: !state.completed
      }
    case "SOFT_DELETE_TASK":
      return {
        ...state,
        deleted: action.deleted === undefined || action.deleted
      }
    default:
      return state
  }
}

const tasks = (state = [], action) => {
  if (_.contains(['ADD_TASK', 'UPDATE_TASK', 'SOFT_DELETE_TASK', 'TOGGLE_TASK'], action.type)) {
    return {
      ...state,
      [action.id]: task(state[action.id], action)
    }
  } else if (_.contains(['DELETE_TASK'], action.type)) {
    return _.filter(state, task =>
        task.id !== action.id
      )
  } else if (action.type === 'DELETE_LIST') {
    let a = _.mapObject(state, (task, key) => {
      return Object.assign({}, task, {lists: _.without(task.lists, action.id)})
    })

    return a
  } else {
    return state
  }
}

export default tasks
