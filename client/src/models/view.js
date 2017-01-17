import { Record, Map } from 'immutable'

class View extends Record({
  id: '',
  name: '',
  description: '',
  filter: '',
  deleted: false
}) {}

export default View
