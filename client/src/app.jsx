import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import { fetchTasks } from './actions/tasks'
import { fetchContexts } from './actions/contexts'
import { fetchTags } from './actions/tags'
import { fetchLists } from './actions/lists'
import { fetchViews } from './actions/views'
import AddTask from './components/AddTask'
import AddList from './components/AddList'
import AddView from './components/AddView'
import Lists from './components/Lists'
import Views from './components/Views'

import UiAppBar from 'material-ui/AppBar'

class App extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchTasks())
    dispatch(fetchContexts())
    dispatch(fetchLists())
    dispatch(fetchViews())
    dispatch(fetchTags())
  }

  render() {
    return (
      <div className="container">
      <UiAppBar title="t[x]rnado"
        iconClassNameRight="muidocs-icon-navigation-expand-more" />
      <AddView />
      <AddList />
      <AddTask />
      <Views />
      <Lists />
      </div>
    )
  }
}

export default connect()(App)
