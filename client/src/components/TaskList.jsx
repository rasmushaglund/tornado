import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { sort } from '../util'
import UiList from 'material-ui/List/List'
import UiListItem from 'material-ui/List/ListItem'
import Checkbox from 'material-ui/Checkbox';

import {blue500, grey300, red700} from 'material-ui/styles/colors';
import { toggleTask, toggleSelectObject, toggleUpdateTask, softDeleteTask, deleteTask } from '../actions'

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
            this.props.softDeleteTask(task, false)}
          } />
        <IconDeleteForever color={red700}
          style={{display: this.state.hover ? "block" : "none"}}
          onClick={e => {
            e.preventDefault()
            this.props.deleteTask(task)}
          } />
      </div>
    ) : (
      <IconClear color={red700}
        style={{display: this.state.hover ? "block" : "none"}}
        onClick={e => {
          e.preventDefault()
          this.props.softDeleteTask(task, true)}
        } />
    )

    return (
      <UiListItem
        primaryText={task.name}
        onMouseOver={() => this.setState({hover:true})}
        onMouseLeave={() => this.setState({hover:false})}
        leftIcon={
          <Checkbox checked={task.completed} onCheck={() => this.props.toggleTask(task, !task.completed)} />
        }
        rightIcon={
          actions
        }
        onClick={()=> this.props.toggleSelectObject(task)}
        onDoubleClick={() => this.props.toggleUpdateTask(task)} />
    )
  }
}

let TaskList = ({ tasks, toggleTask, toggleUpdateTask, toggleSelectObject, deleteTask, softDeleteTask }) => {
  //var a = sort(tasks, "name")
 
  return (
    <UiList>
      {tasks && sort(tasks, "completed, name").map(task =>
        <Task task={task}
          key={task.id}
          toggleTask={toggleTask}
          toggleSelectObject={toggleSelectObject}
          toggleUpdateTask={toggleUpdateTask}
          deleteTask={deleteTask}
          softDeleteTask={softDeleteTask} />
      )}
    </UiList>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
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
  toggleSelectObject: toggleSelectObject,
  softDeleteTask: softDeleteTask
})

TaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList)

export default TaskList
