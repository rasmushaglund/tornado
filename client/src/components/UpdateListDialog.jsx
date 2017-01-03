import React from 'react'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { connect } from 'react-redux'
import { addList, updateList, softDeleteList, toggleUpdateList } from '../actions'

class UpdateListDialog extends React.Component {
  componentDidMount () {
    this.textInput.focus()
  }

  render () {
    let { visible, list, dispatch } = this.props

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
          open={true}
          onRequestClose={closeDialog}
          autoScrollBodyContent={true} >
        <form onSubmit={e => {
          e.preventDefault()
          if (!this.textInput.value.trim()) {
            return
          }

          if (list) {
            dispatch(updateList(list.id, this.textInput.value))
          } else {
            dispatch(addList(this.textInput.value))
          }

          closeDialog()

          this.textInput.value = ''
        }}>
          <input ref={node => {
            this.textInput = node
            }} defaultValue={list && list.name} />
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
}

UpdateListDialog = connect()(UpdateListDialog)

export default UpdateListDialog
