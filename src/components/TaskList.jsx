import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import UiList from 'material-ui/List/List'
import UiListItem from 'material-ui/List/ListItem'

import {blue500, grey300, red700} from 'material-ui/styles/colors';
import { toggleTask, toggleUpdateTask, toggleDeleteTask } from '../actions'

import IconDone from 'material-ui/svg-icons/action/done';
import IconClear from 'material-ui/svg-icons/content/clear';

class Task extends React.Component {
  constructor () {
    super()
    this.state = {hover: false}
  }

  render () {
    let task = this.props.task
    return (
      <UiListItem
        primaryText={task.text}
        leftIcon={
          <IconDone color={task.completed ? blue500 : grey300 }
            onClick={() => this.props.onTaskClick(task.id)} />
        }
        onMouseOver={() => this.setState({hover:true})}
        onMouseLeave={() => this.setState({hover:false})}
        rightIcon={
          <IconClear color={red700}
            style={{display: this.state.hover ? "block" : "none"}}
            onClick={e => {
              e.preventDefault()
              this.props.onDeleteClick(task.id)}
            } className="delete" />
        }
        onDoubleClick={() => this.props.onSettingsClick(task.id)} />
    )
  }
}

let TaskList = ({ tasks, onTaskClick, onSettingsClick, onDeleteClick }) => {
  return (
    <UiList>
      {tasks && tasks.map(task =>
        <Task task={task}
          key={task.id}
          onSettingsClick={onSettingsClick}
          onDeleteClick={onDeleteClick}
          onTaskClick={onTaskClick} />
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
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps =  ({
  onTaskClick: toggleTask,
  onSettingsClick: toggleUpdateTask,
  onDeleteClick: toggleDeleteTask
})

TaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList)


export default TaskList
