import { jsonFetch } from '../util'
import { receiveViews } from './views'
import { receiveTasks } from './tasks'
import { receiveLists } from './lists'
import { receiveTags } from './tags'
import { receiveContexts } from './contexts'
import { toggleLogin, toggleRegister, sendMessage } from './ui'

export const initApp = () => (dispatch) => {
  return jsonFetch({}, 'http://localhost:5000/init', 'GET')
    .then(response => {
      if (response.ok) {   
        response.json().then(json => {
          dispatch(receiveViews(json.views))
          dispatch(receiveTasks(json.tasks))
          dispatch(receiveTags(json.tags))
          dispatch(receiveContexts(json.contexts))
          dispatch(receiveLists(json.lists))
          dispatch(toggleLogin(false))
        })
      } else if (response.status == 401) {
        dispatch(toggleLogin(true))
      }
    })
}

export const handleLoginResponse = (response) => (dispatch) => {
  if (response.ok) {
    let user = response.user

    dispatch(initApp())

    response.json().then(json => {
      dispatch(sendMessage("Welcome"))

      return {
        type: 'LOGIN_SUCCESS',
        user: user
      }
    })
  } else {
    dispatch(sendMessage("Login failed"))
    return {
      type: 'LOGIN_FAILED'
    }
  }
}

export const handleLogoutResponse = (response) => (dispatch) => {
  if (response.ok) {
    dispatch(toggleLogin(true))
    dispatch(sendMessage("Logged out"))
    return {
      type: 'LOGOUT_SUCCESS'
    }
  } else {
    dispatch(sendMessage("Logout failed"))
    return {
      type: 'LOGOUT_FAILED'
    }
  }
}

export const handleRegisterResponse = (response) => {
  return (dispatch) => {
    if (response.ok) {
      dispatch(toggleRegister(false))
      dispatch(toggleLogin(true))
      return {
        type: 'REGISTER_SUCCESS'
      }
    } else {
      return {
        type: 'REGISTER_FAILED'
      }
    }
  }
}

export const login = (data) => (dispatch) => {
  jsonFetch(
    data,
    'http://localhost:5000/login',
  ).then(response => {
    dispatch(handleLoginResponse(response))
  })

  return {
    type: 'LOGIN_STARTED'
  }
}

export const logout = () => (dispatch) => {
  jsonFetch(
    {},
    'http://localhost:5000/logout',
  ).then(response => {
    dispatch(handleLogoutResponse(response))
  })

  return {
    type: 'LOGOUT_STARTED'
  }
}

export const register = (data) => (dispatch) => {
  jsonFetch(
    data,
    'http://localhost:5000/register',
  ).then(response => {
    dispatch(handleRegisterResponse(response))
  })

  return {
    type: 'REGISTER_STARTED'
  }
}
