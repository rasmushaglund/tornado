import { Record, Map } from 'immutable'

class Tag extends Record({
  id: '',
  name: '',
  deleted: false
}) {}

export default Tag
