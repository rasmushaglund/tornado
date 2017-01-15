import React from 'react'

import UpdateViewDialog from './UpdateViewDialog';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux'
import { toggleUpdateView } from '../actions/ui'

let AddView = ({ dialogVisible, currentView, dispatch }) => {
  let input

  let openDialog = () =>  {
    dispatch(toggleUpdateView(true))
  }

  let label = currentView ? "Edit View" : "Add View"
  let dialog = dialogVisible ? <UpdateViewDialog view={currentView} /> : null

  return (
    <div>
      <RaisedButton label={label} onTouchTap={openDialog} />
      {dialog}
    </div>
  )
}

const mapStateToProps = (state) => ({
  dialogVisible: state.ui.editViewVisible,
  currentView: state.ui.currentView
})

AddView = connect(
  mapStateToProps
)(AddView)

export default AddView
