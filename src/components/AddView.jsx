import React from 'react'

import UpdateViewDialog from './UpdateViewDialog';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux'
import { toggleUpdateView } from '../actions'

let AddView = ({ dialogVisible, currentView, dispatch }) => {
  let input

  let openDialog = () =>  {
    dispatch(toggleUpdateView(true))
  }

  let label = currentView ? "Edit View" : "Add View"

  return (
    <div>
      <RaisedButton label={label} onTouchTap={openDialog} />
      <UpdateViewDialog visible={dialogVisible} view={currentView} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  dialogVisible: state.ui.editViewVisible,
  currentView: state.views[state.ui.currentView]
})

AddView = connect(
  mapStateToProps
)(AddView)

export default AddView
