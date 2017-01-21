export const toggleSelectObject = (object) => ({
  type: 'TOGGLE_SELECT_OBJECT',
  data: object
})

export const toggleUpdateContext = (visible, context) => ({
  type: 'TOGGLE_EDIT_CONTEXT',
  context: context,
  visible: visible
})

export const toggleUpdateList = (visible, list) => ({
  type: 'TOGGLE_EDIT_LIST',
  list: list,
  visible: visible
})

export const toggleUpdateTag = (visible, tag) => ({
  type: 'TOGGLE_EDIT_TAG',
  tag: tag,
  visible: visible
})

export const toggleUpdateTask = (visible, task) => ({
  type: 'TOGGLE_EDIT_TASK',
  task: task,
  visible: visible
})

export const toggleUpdateView = (visible, view) => ({
  type: 'TOGGLE_EDIT_VIEW',
  view: view,
  visible: visible
})

export const toggleLogin = (visible) => ({
  type: 'TOGGLE_LOGIN',
  visible: visible
})

export const toggleRegister = (visible) => ({
  type: 'TOGGLE_REGISTER',
  visible: visible
})

export const sendMessage = (message) => ({
  type: 'SEND_MESSAGE',
  message: message
})
