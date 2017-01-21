import React from 'react'

import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import { connect } from 'react-redux'
import { login } from '../actions/app'
import { toggleRegister } from '../actions/ui'

class Messages extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false
    }
  }

  handleRequestClose = () => {
    this.setState({open: false})
  }

  componentWillReceiveProps (props) {
    this.setState({
      open: !!props.message
    })
  }

  render () {
    let { dispatch, message } = this.props
    return (
      <Snackbar 
        open={this.state.open}
        message={message}
        action="OK"
        autoHideDuration={3000}
        onRequestClose={this.handleRequestClose} />
    )
  }
}

const mapStateToProps = (state) => ({
  message: state.get('ui').get('message')
})

Messages = connect(
  mapStateToProps
)(Messages)

export default Messages
