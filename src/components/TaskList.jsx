import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import UiList from 'material-ui/List/List'
import UiListItem from 'material-ui/List/ListItem'

import {blue500, grey300, red700} from 'material-ui/styles/colors';

import IconDone from 'material-ui/svg-icons/action/done';
import IconClear from 'material-ui/svg-icons/content/clear';

let TaskList = ({ tasks, onTaskClick, onSettingsClick, onDeleteClick }) => {
  return (
  <UiList>
    {tasks && tasks.map(task =>
      <UiListItem
        key={task.id}
        primaryText={task.text}
        leftIcon={
          <IconDone color={task.completed ? blue500 : grey300 }
            onClick={() => onTaskClick(task.id)} />
        }
        rightIcon={
          <IconClear color={red700}
            onClick={e => {
              e.preventDefault()
              onDeleteClick(task.id)}
            } />
        }
        onDoubleClick={() => onSettingsClick(task.id)} />
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
  onTaskClick: PropTypes.func.isRequired,
  onSettingsClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
}

export default TaskList
