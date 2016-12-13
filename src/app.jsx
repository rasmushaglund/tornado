import styles from './index.scss';
import React from 'react';
import AddTask from './components/AddTask'
import AddList from './components/AddList'
import AddView from './components/AddView'
import Lists from './components/Lists'
import View from './components/View'
import Views from './components/Views'

import UiAppBar from 'material-ui/AppBar'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class App extends React.Component {
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
