import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Task from './Task'

import UiList from 'material-ui/List/List'
import UiListItem from 'material-ui/List/ListItem'

import {blue500, grey300} from 'material-ui/styles/colors';

import IconDone from 'material-ui/svg-icons/action/done';

let TaskList = ({ tasks, onTaskClick }) => {
  return (
  <UiList>
    {tasks && tasks.map(task =>
      <UiListItem
        key={task.id}
        primaryText={task.text}
        leftIcon={
          <IconDone color={task.completed ? blue500 : grey300 }/>
        }
        onClick={() => onTaskClick(task.id)} />
    )}
  </UiList>
)
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired),
  onTaskClick: PropTypes.func.isRequired
}

export default TaskList
