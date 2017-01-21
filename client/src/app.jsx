import React, { PropTypes } from 'react';
import { connect } from 'react-redux'

import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import { fetchTasks } from './actions/tasks'
import { fetchContexts } from './actions/contexts'
import { fetchTags } from './actions/tags'
import { fetchLists } from './actions/lists'
import { fetchViews } from './actions/views'
import { initApp, logout } from './actions/app'

import AddTask from './components/AddTask'
import AddList from './components/AddList'
import AddView from './components/AddView'
import Lists from './components/Lists'
import Views from './components/Views'
import Login from './components/Login'
import Register from './components/Register'
import Messages from './components/Messages'

import UiAppBar from 'material-ui/AppBar'

class App extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loginVisible: PropTypes.bool.isRequired,
    registerVisible: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      menuOpen: false
    }
  }

  componentDidMount() {
    this.props.dispatch(initApp())
  }

  handleAppBarClick = (e) => {
    e.preventDefault()
    this.setState({
      menuOpen: true,
      menuEl: e.currentTarget
    })
  }

  logout = () => {
    this.props.dispatch(logout())
    this.setState({
      menuOpen: false
    })
  }

  render() {
    const { loginVisible, registerVisible } = this.props
    return (
      <div className="container">
        {loginVisible ? <Login /> : null}
        {registerVisible ? <Register /> : null}
        <UiAppBar title="t[x]rnado"
          onTouchTap={this.handleAppBarClick}
          iconClassNameRight="muidocs-icon-navigation-expand-more" />
        <Popover
          open={this.state.menuOpen}
          anchorEl={this.state.menuEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={() => this.setState({menuOpen: false})}
          animation={PopoverAnimationVertical}
        >
          <Menu>
            <MenuItem primaryText="Logout" onTouchTap={this.logout}/>
          </Menu>
        </Popover>
        <AddView />
        <AddList />
        <AddTask />
        <Views />
        <Lists />
        <Messages />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loginVisible: state.get('ui').get('loginVisible'),
  registerVisible: state.get('ui').get('registerVisible')
})

export default connect(
  mapStateToProps
)(App)
