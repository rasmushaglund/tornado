const initialState = {
  editViewVisible: false,
  editTaskVisible: false,
  editListVisible: false
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
    default:
      return state
  }
}

export default ui
