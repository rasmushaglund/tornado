import React from 'react'

import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux'
import { register } from '../actions/app'

class Register extends React.Component {
  render () {
    let { dispatch } = this.props
    return (
      <div>
        <Dialog title="Register" modal={true} open={true}>
          <TextField ref={node => {this.emailInput = node}} floatingLabelText="Email" hintText="Email"/>
          <TextField ref={node => {this.passwordInput = node}} floatingLabelText="Password" hintText="Password" type="password"/>
          <RaisedButton label="Register" onTouchTap={() => dispatch(register({
            email: this.emailInput.input.value.trim(),
            password: this.passwordInput.input.value
          }))} />
        </Dialog>
      </div>
    )
  }
}

Register = connect()(Register)

export default Register
