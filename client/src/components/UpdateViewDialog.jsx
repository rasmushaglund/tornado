import React from 'react'
var _ = require("underscore");

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux'
import { addView, updateView, softDeleteView } from '../actions/views'
import { toggleUpdateView } from '../actions/ui'

class UpdateViewDialog extends React.Component {
  componentDidMount () {
    this.textInput.focus()
  }

  render () {
  let { view, dispatch } = this.props

  let filterInput

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
        open={true}
        onRequestClose={closeDialog}
        autoScrollBodyContent={true} >
      <form onSubmit={e => {
          e.preventDefault()
          if (!this.textInput.input.value.trim()) {
            return
          }

          if (view) {
            dispatch(updateView(view.id, this.textInput.input.value, filterInput.input.value))
          } else {
            dispatch(addView(this.textInput.input.value, filterInput.input.value))
          }

          closeDialog()

          this.textInput.input.value = ''
          filterInput.input.value = ''
      }}>
      <div>
        <TextField ref={node => {
            this.textInput = node
          }} hintText="View name" defaultValue={view && view.name} />
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
}

UpdateViewDialog = connect()(UpdateViewDialog)

export default UpdateViewDialog
