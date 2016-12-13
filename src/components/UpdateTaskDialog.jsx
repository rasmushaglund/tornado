import React from 'react'
var _ = require("underscore");

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux'
import { addTask, updateTask, toggleUpdateTask } from '../actions'

let getSourceString = (task) => {
  let result = task.text

  _.each(task.contexts, (context) => result += " @" + context)
  _.each(task.tags, (tag) => result += " #" + tag)
  _.each(task.lists, (list) => result += " %" + list)

  return result
}

let UpdateTaskDialog = ({ visible, task, dispatch }) => {
  let input

  let closeDialog = () =>  {
    dispatch(toggleUpdateTask(false))
  }

  let label = task ? "Edit Task" : "Add Task"

  return (
    <Dialog
        title={label}
        modal={false}
        open={visible}
        onRequestClose={closeDialog}
        autoScrollBodyContent={true} >
      <form onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }

          if (task) {
            dispatch(updateTask(task.id, input.value))
          } else {
            dispatch(addTask(input.value))
          }

          closeDialog()

          input.value = ''
      }}>
          <input ref={node => {
              input = node
            }} defaultValue={task && getSourceString(task)} />
          <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={closeDialog}
          />
          <FlatButton
            label={task ? "Update" : "Add"}
            type="submit"
            primary={true}
            keyboardFocused={true}
          />
        </form>
    </Dialog>
  )
}

UpdateTaskDialog = connect()(UpdateTaskDialog)

export default UpdateTaskDialog
