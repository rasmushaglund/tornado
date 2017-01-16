var _ = require("underscore");
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { toggleUpdateList, toggleSelectObject } from '../actions/ui'
import TaskList from './TaskList'

import {CardHeader as UiCardHeader} from 'material-ui/Card'
import UiPaper from 'material-ui/Paper'

let Lists = ({ lists, tasks, dispatch, deletedTasks, selectedObject }) => (
  <ul>
    <UiPaper style={{marginBottom: 40}} zDepth={4}>
      <UiCardHeader title="Trash can" />
      <TaskList key={0} tasks={deletedTasks} />
    </UiPaper>
    {lists.valueSeq().map(list => {
      let selected = selectedObject && selectedObject.id === list.id
      let listTasks = tasks.filter(task => task.lists.contains(list.id))
      return (
        <UiPaper style={{marginBottom: 40, border: selected ? "1px solid" : "none"}} key={list.id} zDepth={4} >
          <UiCardHeader title={list.name}
            onClick={() => dispatch(toggleSelectObject(list))}
            onDoubleClick={() => dispatch(toggleUpdateList(true, list.id))} />
          <TaskList key={list.id} {...list} tasks={listTasks} />
        </UiPaper>
      )
    }
    )}
  </ul>
)

const mapStateToProps = (state) => ({
  lists: state.get('lists').filter((list) => !list.get('deleted')),
  tasks: state.get('tasks'),
  deletedTasks: state.get('tasks').filter(task => task.get('deleted')),
  selectedObject: state.get('ui').get('selectedObject')
})

Lists = connect(
  mapStateToProps
)(Lists)

export default Lists
