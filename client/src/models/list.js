import Immutable from 'immutable'

class List extends Immutable.Record({
  id: '',
  name: '',
  description: '',
  deleted: false,
  children: new Immutable.List()
}) {
  constructor (data) {
    super({
      ...data,
      children: new Immutable.List(data.children)
    })
  }
}


List.fromData = (data) => {
  return new List(data)
}

export default List
