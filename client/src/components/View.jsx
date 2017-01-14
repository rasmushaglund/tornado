import React, { PropTypes } from 'react'
var _ = require("underscore");

import { connect } from 'react-redux'
import { toggleUpdateView, toggleSelectObject } from '../actions'
import TaskList from './TaskList'

import  {CardHeader as UiCardHeader, CardText as UiCardText} from 'material-ui/Card'
import UiPaper from 'material-ui/Paper'


let View = ({ view, tasks, name, filter, selectedObject, dispatch }) => {
  let selected = selectedObject && selectedObject.id === view.id
  console.log(selected)
  return (
    <UiPaper style={{marginBottom: 40, border: selected ? "1px solid" : "none"}} zDepth={4}>
      <UiCardHeader title={view.name} subtitle={view.filter}
          onClick={() => dispatch(toggleSelectObject(view))}
          onDoubleClick={() => dispatch(toggleSelectObject(view))}/>
        <TaskList tasks={tasks} />
    </UiPaper>
  )
}

const mapStateToProps = (state, props) => ({
  tasks: _.filter(state.tasks, task => {
    const hasTag = (tag) => {
      return _.contains(task.tags, tag)
    }

    const hasList = (listName) => {
      let list = _.find(state.lists, (list) => list.name === listName)
      return list && _.contains(task.lists, list.id)
    }

    const isDeleted = () => {
      return task.deleted
    }

    const hasContext = (contextName) => {
      let context = _.find(state.contexts, (context) => context.name === contextName)
      return context && _.contains(task.contexts, context.id)
    }

    const hasParent = () => {
      return !!task.lists && task.lists.length > 0
    }

    return !isDeleted() && eval(props.view.filter)
  }),
  view: props.view,
  selectedObject: state.ui.selectedObject
})

View = connect(
  mapStateToProps
)(View)

export default View
