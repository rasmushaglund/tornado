import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  editViewVisible: false,
  editTaskVisible: false,
  editListVisible: false,
  editContextVisible: false,
  loginVisible: false,
  loginFailedVisible: false,
  registerVisible: false,
  currentView: null,
  currentList: null,
  currentTask: null,
  currentContext: null,
  selectedObject: null,
  message: ""
})

const ui = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_EDIT_VIEW":
      return state.merge({
        editViewVisible: action.visible,
        currentView: action.view
      })
    case "TOGGLE_EDIT_TASK":
      return state.merge({
        editTaskVisible: action.visible,
        currentTask: action.task
      })
    case "TOGGLE_EDIT_LIST":
      return state.merge({
        editListVisible: action.visible,
        currentList: action.list
      })
    case "TOGGLE_EDIT_CONTEXT":
      return state.merge({
        editContextVisible: action.visible,
        currentContext: action.context
      })
    case "TOGGLE_SELECT_OBJECT":
      let newSelectedObject
      if (!state.get('selectedObject') || action.object && 
        state.get('selectedObject').get('id') !== action.object.get('id')) {
        newSelectedObject = action.object
      }

      return state.merge({
        selectedObject: newSelectedObject
      })
    case "TOGGLE_LOGIN":
      return state.merge({
        loginVisible: action.visible,
        loginFailedVisible: false,
        registerVisible: false
      })
    case "TOGGLE_REGISTER":
      return state.merge({
        registerVisible: action.visible,
        loginVisible: false
      })
    case "LOGIN_SUCCESS":
      return state.merge({
        loginVisible: false,
        loginFailedVisible: false
      })
    case "LOGIN_FAILED":
      return state.set({
        loginFailedVisible: true
      })
    case "SEND_MESSAGE":
      return state.merge({
        message: action.message
      })
    default:
      return state
  }
}

export default ui
