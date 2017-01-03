import React from 'react'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import UpdateTaskDialog from './UpdateTaskDialog';

import { connect } from 'react-redux'
import { toggleUpdateTask } from '../actions'

let AddTask = ({ dialogVisible, currentTask, dispatch  }) => {
  let input

  let openDialog = () =>  {
    dispatch(toggleUpdateTask(true))
  }

  let label = currentTask ? "Edit Task" : "Add Task" 
  let dialog = dialogVisible ? <UpdateTaskDialog task={currentTask} /> : null

  return (
    <div>
      <RaisedButton label={label} onTouchTap={openDialog} />
      {dialog}
    </div>
  )
}

const mapStateToProps = (state) => ({
  dialogVisible: state.ui.editTaskVisible,
  currentTask: state.tasks[state.ui.currentTask]
})

AddTask = connect(
  mapStateToProps
)(AddTask)

export default AddTask
