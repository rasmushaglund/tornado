const list = (state, action) => {
  switch (action.type) {
    case "ADD_LIST":
      console.log("Adding list " + action.text)

      return {
        id: action.id,
        text: action.text
      }
    default:
      return state
  }
}

const lists = (state = [], action) => {
  switch (action.type) {
    case 'ADD_LIST':
      return [
        ...state,
        list(undefined, action)
      ]
    default:
      return state
  }
}

export default lists
