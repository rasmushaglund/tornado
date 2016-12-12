import { combineReducers } from 'redux'
import tasks from './tasks'
import views from './views'
import lists from './lists'

const tornado = combineReducers({
  tasks,
  views,
  lists
})

export default tornado
