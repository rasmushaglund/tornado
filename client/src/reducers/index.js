import { combineReducers } from 'redux'
import tasks from './tasks'
import views from './views'
import contexts from './contexts'
import lists from './lists'
import tags from './tags'
import ui from './ui'

const tornado = combineReducers({
  ui,
  tasks,
  views,
  lists,
  contexts,
  tags
})

export default tornado
