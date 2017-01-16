import { Record, Map, List } from 'immutable'

class Task extends Record({
  id: '',
  name: '',
  description: '',
  lists: new List(),
  contexts: new List(),
  tags: new List(),
  completed: false,
  deleted: false,
  time: '',
  importance: 0,
  deadline: '',
  energy: 0
}) {
  constructor(data) {
    super({
      ...data, 
      contexts: new List(data.contexts),
      tags: new List(data.tags),
      lists: new List(data.lists)
    })
  }
}

// Task.prototype.,,,

Task.fromData = (data) => {
  return new Task(data)
}

export default Task
