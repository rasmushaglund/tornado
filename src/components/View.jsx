import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { toggleTask, toggleUpdateTask, toggleDeleteTask } from '../actions'
import TaskList from './TaskList'

import {Card as UiCard, CardHeader as UiCardHeader, CardText as UiCardText} from 'material-ui/Card'
import UiPaper from 'material-ui/Paper'

var _ = require("underscore");

let View = ({ tasks, text, onTaskClick, onSettingsClick, onDeleteClick, filter }) => {
  return (
    <UiPaper style={{marginBottom: 40}} zDepth={4}>
        <UiCardHeader title={text} subtitle={filter}/>
        <TaskList tasks={tasks}
            onTaskClick={onTaskClick}
            onSettingsClick={onSettingsClick}
            onDeleteClick={onDeleteClick} />
    </UiPaper>
  )
}

const mapStateToProps = (state, props) => ({
  tasks: state.tasks.filter(task => {
    const hasTag = (tag) => {
      return _.contains(task.tags, tag)
    }

    const hasList = (list) => {
      return _.contains(task.lists, list)
    }

    const isDeleted = () => {
      return task.deleted
    }

    const hasContext = (context) => {
      return _.contains(task.contexts, context)
    }

    const hasParent = () => {
      return !!task.lists && task.lists.length > 0
    }

    return !isDeleted() && eval(props.filter)
  }),
  text: props.text,
  filter: props.filter
})

const mapDispatchToProps =  ({
  onTaskClick: toggleTask,
  onSettingsClick: toggleUpdateTask,
  onDeleteClick: toggleDeleteTask
})

View = connect(
  mapStateToProps,
  mapDispatchToProps
)(View)

export default View
