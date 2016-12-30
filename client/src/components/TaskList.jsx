import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import UiList from 'material-ui/List/List'
import UiListItem from 'material-ui/List/ListItem'
import Checkbox from 'material-ui/Checkbox';

import {blue500, grey300, red700} from 'material-ui/styles/colors';
import { toggleTask, toggleUpdateTask, softDeleteTask, deleteTask } from '../actions'

import IconClear from 'material-ui/svg-icons/content/clear';
import IconDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import IconUndo from 'material-ui/svg-icons/av/replay';

class Task extends React.Component {
  constructor () {
    super()
    this.state = {hover: false}
  }

  render () {
    let task = this.props.task

    let actions = task.deleted ? (
      <div>
        <IconUndo color={red700}
          style={{display: this.state.hover ? "block" : "none"}}
          onClick={e => {
            e.preventDefault()
            this.props.softDeleteTask(task.id, false)}
          } />
        <IconDeleteForever color={red700}
          style={{display: this.state.hover ? "block" : "none"}}
          onClick={e => {
            e.preventDefault()
            this.props.deleteTask(task.id)}
          } />
      </div>
    ) : (
      <IconClear color={red700}
        style={{display: this.state.hover ? "block" : "none"}}
        onClick={e => {
          e.preventDefault()
          this.props.softDeleteTask(task.id, true)}
        } />
    )

    return (
      <UiListItem
        primaryText={task.name}
        onMouseOver={() => this.setState({hover:true})}
        onMouseLeave={() => this.setState({hover:false})}
        leftIcon={
          <Checkbox checked={task.completed} onCheck={() => this.props.toggleTask(task.id, !task.completed)} />
        }
        rightIcon={
          actions
        }
        onDoubleClick={() => this.props.toggleUpdateTask(task.id)} />
    )
  }
}

let TaskList = ({ tasks, toggleTask, toggleUpdateTask, deleteTask, softDeleteTask }) => {
  return (
    <UiList>
      {tasks && tasks.map(task =>
        <Task task={task}
          key={task.id}
          toggleTask={toggleTask}
          toggleUpdateTask={toggleUpdateTask}
          deleteTask={deleteTask}
          softDeleteTask={softDeleteTask} />
      )}
    </UiList>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired),
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps =  ({
  toggleTask: toggleTask,
  toggleUpdateTask: toggleUpdateTask,
  deleteTask: deleteTask,
  softDeleteTask: softDeleteTask
})

TaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList)

export default TaskList
