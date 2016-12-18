import React from 'react'
var _ = require("underscore");

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux'
import { addList, updateList, softDeleteList, deleteList, toggleUpdateList } from '../actions'

let UpdateListDialog = ({ visible, list, dispatch }) => {
  let input

  let closeDialog = () =>  {
    dispatch(toggleUpdateList(false))
  }

  let label = list ? "Edit List" : "Add List"

  let deleteButton = list ? (
    <FlatButton
      label="Delete"
      onTouchTap={() => {
        dispatch(softDeleteList(list.id))
        closeDialog()
      }}
      secondary={true}
    />
  ) : null;

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

          if (list) {
            dispatch(updateList(list.id, input.value))
          } else {
            dispatch(addList(input.value))
          }

          closeDialog()

          input.value = ''
      }}>
        <input ref={node => {
            input = node
          }} defaultValue={list && list.text} />
        <FlatButton
          label="Cancel"
          onTouchTap={closeDialog}
        />
        <FlatButton
          label={list ? "Update" : "Add"}
          type="submit"
          primary={true}
          keyboardFocused={true}
        />
        {deleteButton}
      </form>
    </Dialog>
  )
}

UpdateListDialog = connect()(UpdateListDialog)

export default UpdateListDialog
