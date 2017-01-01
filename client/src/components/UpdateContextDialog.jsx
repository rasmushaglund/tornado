import React from 'react'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { connect } from 'react-redux'
import { addContext, updateContext, softDeleteContext, toggleUpdateContext } from '../actions'

class UpdateContextDialog extends React.Component {
 
  render () {
    let { visible, context, dispatch } = this.props
    let textInput

    let closeDialog = () =>  {
      dispatch(toggleUpdateContext(false))
    }

    let label = context ? "Edit Context" : "Add Context"

    let deleteButton = context ? (
      <FlatButton
        label="Delete"
        onTouchTap={() => {
          dispatch(softDeleteContext(context.id))
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

          if (context) {
            dispatch(updateContext(context.id, textInput.value))
          } else {
            dispatch(addContext(textInput.value))
          }

          closeDialog()

          textInput.value = ''
        }}>
          <input ref={node => {
            textInput = node
            }} defaultValue={context && context.name} />
          <FlatButton
            label="Cancel"
            onTouchTap={closeDialog}
          />
          <FlatButton
            label={context ? "Update" : "Add"}
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

UpdateContextDialog = connect()(UpdateContextDialog)

export default UpdateContextDialog
