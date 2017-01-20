import React from 'react'

import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux'
import { login } from '../actions/app'
import { toggleRegister } from '../actions/ui'

class Login extends React.Component {
  render () {
    let { dispatch } = this.props
    return (
      <div>
        <Dialog title="Login" modal={true} open={true}>
          <TextField ref={node => {this.emailInput = node}} floatingLabelText="Email" hintText="Email"/>
          <TextField ref={node => {this.passwordInput = node}} floatingLabelText="Password" hintText="Password" type="password"/>
          <RaisedButton label="Login" onTouchTap={() => dispatch(login({
            email: this.emailInput.input.value.trim(),
            password: this.passwordInput.input.value
          }))} />
        <RaisedButton label="Register" onTouchTap={() => dispatch(toggleRegister(true))} />
        </Dialog>
      </div>
    )
  }
}

Login = connect()(Login)

export default Login
