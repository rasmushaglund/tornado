import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  editViewVisible: false,
  editTaskVisible: false,
  editListVisible: false,
  editContextVisible: false,
  currentView: null,
  currentList: null,
  currentTask: null,
  currentContext: null,
  selectedObject: null,
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
    default:
      return state
  }
}

export default ui
