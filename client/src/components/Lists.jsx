var _ = require("underscore");
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { toggleUpdateList } from '../actions'
import TaskList from './TaskList'

import {CardHeader as UiCardHeader} from 'material-ui/Card'
import UiPaper from 'material-ui/Paper'

let Lists = ({ lists, dispatch, deletedTasks }) => (
  <ul>
    <UiPaper style={{marginBottom: 40}} zDepth={4}>
      <UiCardHeader title="Trash can" />
      <TaskList key={0} tasks={deletedTasks} />
    </UiPaper>
    {lists.map(list =>
      <UiPaper style={{marginBottom: 40}} key={list.id} zDepth={4} >
        <UiCardHeader title={list.name}
          onDoubleClick={() => dispatch(toggleUpdateList(list.id))} />
        <TaskList key={list.id} {...list} />
      </UiPaper>
    )}
  </ul>
)

const mapStateToProps = (state) => ({
  lists: _.chain(state.lists).filter((list) => !list.deleted).map((list) => {
    let tasks = _.filter(state.tasks, (task) => _.contains(task.lists, list.id) && !task.deleted)
    return Object.assign(list, {tasks: tasks})
  }).value(),
  deletedTasks: _.filter(state.tasks, (task) => task.deleted)
})

Lists = connect(
  mapStateToProps
)(Lists)

export default Lists
