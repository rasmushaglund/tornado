var _ = require("underscore");
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { toggleUpdateList, toggleSelectObject } from '../actions/ui'
import TaskList from './TaskList'

import {CardHeader as UiCardHeader} from 'material-ui/Card'
import UiPaper from 'material-ui/Paper'

let Lists = ({ lists, dispatch, deletedTasks, selectedObject }) => (
  <ul>
    <UiPaper style={{marginBottom: 40}} zDepth={4}>
      <UiCardHeader title="Trash can" />
      <TaskList key={0} tasks={deletedTasks} />
    </UiPaper>
    {lists.map(list => {
      let selected = selectedObject && selectedObject.id === list.id

      return (
        <UiPaper style={{marginBottom: 40, border: selected ? "1px solid" : "none"}} key={list.id} zDepth={4} >
          <UiCardHeader title={list.name}
            onClick={() => dispatch(toggleSelectObject(list))}
            onDoubleClick={() => dispatch(toggleUpdateList(list.id))} />
          <TaskList key={list.id} {...list} />
        </UiPaper>
      )
    }
    )}
  </ul>
)

const mapStateToProps = (state) => ({
  lists: _.chain(state.lists).filter((list) => !list.deleted).map((list) => {
    let tasks = _.filter(state.tasks, (task) => _.contains(task.lists, list.id) && !task.deleted)
    return Object.assign(list, {tasks: tasks})
  }).value(),
  deletedTasks: _.filter(state.tasks, (task) => task.deleted),
  selectedObject: state.ui.selectedObject
})

Lists = connect(
  mapStateToProps
)(Lists)

export default Lists
