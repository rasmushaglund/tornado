import React from 'react'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { connect } from 'react-redux'
import { addList, updateList, softDeleteList, toggleUpdateList } from '../actions'

class UpdateListDialog extends React.Component {
 
  render () {
    let { visible, list, dispatch } = this.props
    let textInput

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
          if (!textInput.value.trim()) {
            return
          }

          if (list) {
            dispatch(updateList(list.id, textInput.value))
          } else {
            dispatch(addList(textInput.value))
          }

          closeDialog()

          textInput.value = ''
        }}>
          <input ref={node => {
            textInput = node
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
