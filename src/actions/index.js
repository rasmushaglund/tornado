let nextTaskId = 0
let nextListId = 0
let nextViewId = 0

export const addTask = (text, tags, contexts, lists) => ({
  type: 'ADD_TASK',
  id: nextTaskId++,
  text,
  tags,
  contexts,
  lists
})

export const addList = (text) => ({
  type: 'ADD_LIST',
  id: nextListId++,
  text
})

export const addView = (text, filter) => ({
  type: 'ADD_VIEW',
  id: nextViewId++,
  text,
  filter
})

export const toggleTask = (id) => ({
  type: 'TOGGLE_TASK',
  id
})
