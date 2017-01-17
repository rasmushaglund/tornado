import React from 'react'

import UpdateListDialog from './UpdateListDialog';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux'
import { toggleUpdateList } from '../actions/ui'

let AddList = ({ dialogVisible, currentList, dispatch }) => {
  let input

  let openDialog = () =>  {
    dispatch(toggleUpdateList(true))
  }

  let label = currentList ? "Edit List" : "Add List"
  let dialog = dialogVisible ? <UpdateListDialog list={currentList} /> : null

  return (
    <div>
      <RaisedButton label={label} onTouchTap={openDialog} />
      {dialog}
    </div>
  )
}

const mapStateToProps = (state) => ({
  dialogVisible: state.get('ui').get('editListVisible'),
  currentList: state.get('ui').get('currentList')
})

AddList = connect(
  mapStateToProps
)(AddList)

export default AddList
