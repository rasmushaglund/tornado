let nextTaskId = 0

export const addTask = (text) => ({
  type: 'ADD_TASK',
  id: nextTaskId++,
  text
})

export const toggleTask = (id) => ({
  type: 'TOGGLE_TASK',
  id
})
