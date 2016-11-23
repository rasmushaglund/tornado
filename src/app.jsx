import styles from './index.scss';
import React from 'react';
import AddTask from './components/AddTask'
import TaskList from './components/TaskList'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>to rna do</h1>
        <AddTask />
        <TaskList />
      </div>
    )
  }
}
