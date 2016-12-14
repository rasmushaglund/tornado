import React, { PropTypes } from 'react'
var _ = require("underscore");

import { connect } from 'react-redux'
import { toggleUpdateView } from '../actions'
import TaskList from './TaskList'

import {Card as UiCard, CardHeader as UiCardHeader, CardText as UiCardText} from 'material-ui/Card'
import UiPaper from 'material-ui/Paper'

var _ = require("underscore");

let View = ({ id, tasks, text, onViewSettingsClick, filter }) => {
  return (
    <UiPaper style={{marginBottom: 40}} zDepth={4}>
        <UiCardHeader title={text} subtitle={filter}
          onDoubleClick={() => onViewSettingsClick(id)}/>
        <TaskList tasks={tasks} />
    </UiPaper>
  )
}

const mapStateToProps = (state, props) => ({
  tasks: _.filter(state.tasks, task => {
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
  filter: props.filter,
  id: props.id
})

const mapDispatchToProps =  ({
  onViewSettingsClick: toggleUpdateView
})

View = connect(
  mapStateToProps,
  mapDispatchToProps
)(View)

export default View
