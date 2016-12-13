import React from 'react'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import UpdateTaskDialog from './UpdateTaskDialog';

import { connect } from 'react-redux'
import { toggleUpdateTask } from '../actions'

let AddTask = ({ dialogVisible, currentTask, dispatch, edit = false  }) => {
  let input

  let openDialog = () =>  {
    dispatch(toggleUpdateTask(true))
  }

  let label = edit ? "Edit Task" : "Add Task"

  return (
    <div>
      <RaisedButton label={label} onTouchTap={openDialog} />
      <UpdateTaskDialog visible={dialogVisible} task={currentTask} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  dialogVisible: state.ui.editTaskVisible,
  currentTask: state.tasks.find((task) => task.id === state.ui.currentTask)
})

AddTask = connect(
  mapStateToProps
)(AddTask)

export default AddTask
