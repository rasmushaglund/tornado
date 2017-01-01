var _ = require("underscore");


const task = (state, action) => {
  switch (action.type) {
    case "UPDATE_TASK":
      return {
        ...state,
        name: action.name,
        description: action.description,
        lists: action.lists,
        tags: action.tags,
        contexts: action.contexts
      }
    case "ADD_TASK":
      return {
        ...state,
        id: action.id,
        completed: false,
        name: action.name,
        description: action.description,
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
    return _.mapObject(state, (task, key) => {
      return Object.assign({}, task, {lists: _.without(task.lists, action.id)})
    })
  } else if (action.type === 'RECEIVE_TASKS') {
    return _.object(_.map(action.tasks, data => {
      return [data.id, task(data, 'ADD_TASK')]
    }))
  } else {
    return state
  }
}

export default tasks
