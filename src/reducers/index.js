import { combineReducers } from 'redux'
import tasks from './tasks'
import views from './views'
import lists from './lists'
import ui from './ui'

const tornado = combineReducers({
  ui,
  tasks,
  views,
  lists
})

export default tornado
