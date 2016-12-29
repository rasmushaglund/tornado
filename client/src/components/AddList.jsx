import React from 'react'

import UpdateListDialog from './UpdateListDialog';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux'
import { toggleUpdateList } from '../actions'

let AddList = ({ dialogVisible, currentList, dispatch }) => {
  let input

  let openDialog = () =>  {
    dispatch(toggleUpdateList(true))
  }

  let label = currentList ? "Edit List" : "Add List"

  return (
    <div>
      <RaisedButton label={label} onTouchTap={openDialog} />
      <UpdateListDialog visible={dialogVisible} list={currentList} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  dialogVisible: state.ui.editListVisible,
  currentList: state.lists[state.ui.currentList]
})

AddList = connect(
  mapStateToProps
)(AddList)

export default AddList
