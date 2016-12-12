const view = (state, action) => {
  switch (action.type) {
    case "ADD_VIEW":
      console.log("Adding view with text " + action.text + " and filter " + action.filter)

      return {
        id: action.id,
        text: action.text,
        filter: action.filter
      }
    default:
      return state
  }
}

const views = (state = [], action) => {
  switch (action.type) {
    case 'ADD_VIEW':
      return [
        ...state,
        view(undefined, action)
      ]
    default:
      return state
  }
}

export default views
