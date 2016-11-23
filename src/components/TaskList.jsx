import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { toggleTask } from '../actions'
import Task from './Task'

let TaskList = ({ tasks, onTaskClick }) => (
  <ul>
    {tasks.map(task =>
      <Task key={task.id}
        {...task}
        onClick={() => onTaskClick(task.id)}
      />
    )}
  </ul>
)

const mapStateToProps = (state) => ({
  tasks: state.tasks
})

const mapDispatchToProps =  ({
  onTaskClick: toggleTask
})

TaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList)

export default TaskList
