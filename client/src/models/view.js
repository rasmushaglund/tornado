import { Record, Map } from 'immutable'

class View extends Record({
  id: '',
  name: '',
  description: '',
  filter: '',
  deleted: false
}) {}


View.fromData = (data) => {
  return new View(data)
}

export default View
