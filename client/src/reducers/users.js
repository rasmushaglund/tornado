import { Map } from 'immutable'
import User from '../models/user'

const createUser = (data) => {
  return new User({
    id: data.id,
    email: data.email,
    friends: data.friends
  })
}

const users = (state = Map(), action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return state.set("currentUser", 
        u => createUser(action.user)
      )
    case 'UPDATE_USER':
      return state.update("currentUser",
        u => action.user
      )
    case 'LOGOUT_SUCCESS':
      return state.delete("currentUser")
    default:
      return state
  }
}

export default users
