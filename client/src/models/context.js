import { Record, Map } from 'immutable'

class Context extends Record({
  id: '',
  name: ''
}) {}


Context.fromData = (data) => {
  return new Context(data)
}

export default Context
