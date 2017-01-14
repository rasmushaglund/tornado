const initialState = {
  editViewVisible: false,
  editTaskVisible: false,
  selectedObject: null,
  editListVisible: false,
  editContextVisible: false
}

const ui = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_EDIT_VIEW":
      return {
        ...state,
        editViewVisible: !state.editViewVisible,
        currentView: action.view
      }
    case "TOGGLE_EDIT_TASK":
      return {
        ...state,
        editTaskVisible: !state.editTaskVisible,
        currentTask: action.task
      }
    case "TOGGLE_EDIT_LIST":
      return {
        ...state,
        editListVisible: !state.editListVisible,
        currentList: action.list
      }
    case "TOGGLE_EDIT_CONTEXT":
      return {
        ...state,
        editContextVisible: !state.editContextVisible,
        currentContext: action.context
      }
    case "TOGGLE_SELECT_OBJECT":
      let newSelectedObject
      if (!state.selectedObject || action.object && 
        state.selectedObject.id !== action.object.id) {
        newSelectedObject = action.object
      }

      return {
        ...state,
        selectedObject: newSelectedObject
      }
    default:
      return state
  }
}

export default ui
