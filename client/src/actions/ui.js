export const toggleSelectObject = (object) => ({
  type: 'TOGGLE_SELECT_OBJECT',
  data: object
})

export const toggleUpdateContext = (visible, context) => ({
  type: 'TOGGLE_EDIT_CONTEXT',
  context: context,
  data: visible
})

export const toggleUpdateList = (visible, list) => ({
  type: 'TOGGLE_EDIT_LIST',
  list: list,
  data: visible
})

export const toggleUpdateTag = (visible, tag) => ({
  type: 'TOGGLE_EDIT_TAG',
  tag: tag,
  data: visible
})

export const toggleUpdateTask = (visible, task) => ({
  type: 'TOGGLE_EDIT_TASK',
  task: task,
  data: visible
})

export const toggleUpdateView = (visible, view) => ({
  type: 'TOGGLE_EDIT_VIEW',
  view: view,
  data: visible
})

