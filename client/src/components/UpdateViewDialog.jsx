import React from 'react'
var _ = require("underscore");

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux'
import { addView, updateView, toggleUpdateView, softDeleteView } from '../actions'

let UpdateViewDialog = ({ visible, view, dispatch }) => {
  let filterInput, textInput

  let closeDialog = () =>  {
    dispatch(toggleUpdateView(false))
  }

  let label = view ? "Edit View" : "Add View"

  let deleteButton = view ? (
    <FlatButton
      label="Delete"
      onTouchTap={() => {
        dispatch(softDeleteView(view.id))
        closeDialog()
      }}
      secondary={true}
    />
  ) : null

  return (
    <Dialog
        title={label}
        modal={false}
        open={visible}
        onRequestClose={closeDialog}
        autoScrollBodyContent={true} >
      <form onSubmit={e => {
          e.preventDefault()
          if (!textInput.value.trim()) {
            return
          }

          if (view) {
            dispatch(updateView(view.id, textInput.value, filterInput.value))
          } else {
            dispatch(addView(textInput.value, filterInput.value))
          }

          closeDialog()

          textInput.value = ''
          filterInput.value = ''
      }}>
      <div>
        <TextField ref={node => {
            textInput = node
          }} hintText="View name" defaultValue={view && view.text} />
      </div>
      <div>
        <TextField ref={node => {
            filterInput = node
          }} hintText="Filter" defaultValue={view && view.filter} />
      </div>

        <FlatButton
          label="Cancel"
          onTouchTap={closeDialog}
        />
        <FlatButton
          label={view ? "Update" : "Add"}
          type="submit"
          primary={true}
          keyboardFocused={true}
        />
        {deleteButton}
      </form>
    </Dialog>
  )
}

UpdateViewDialog = connect()(UpdateViewDialog)

export default UpdateViewDialog
