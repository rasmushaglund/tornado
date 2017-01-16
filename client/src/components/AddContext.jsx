import React from 'react'

import UpdateContextDialog from './UpdateContextDialog';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux'
import { toggleUpdateContext } from '../actions/contexts'

let AddContext = ({ dialogVisible, currentContext, dispatch }) => {
  let input

  let openDialog = () =>  {
    dispatch(toggleUpdateContext(true))
  }

  let label = currentContext ? "Edit Context" : "Add Context"

  return (
    <div>
      <RaisedButton label={label} onTouchTap={openDialog} />
      <UpdateContextDialog visible={dialogVisible} context={currentContext} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  dialogVisible: state.get('ui').get('editContextVisible'),
  currentContext: state.get('contexts').get(state.get('ui').get('currentContext'))
})

AddContext = connect(
  mapStateToProps
)(AddContext)

export default AddContext
