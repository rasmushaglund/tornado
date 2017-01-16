import { Record, Map } from 'immutable'

class Tag extends Record({
  id: '',
  name: '',
  deleted: false
}) {}


Tag.fromData = (data) => {
  return new Tag(data)
}

export default Tag
