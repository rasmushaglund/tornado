import React, { PropTypes } from 'react'
var _ = require("underscore");

import { connect } from 'react-redux'
import { toggleUpdateView, toggleSelectObject } from '../actions/ui'
import TaskList from './TaskList'

import  {CardHeader as UiCardHeader, CardText as UiCardText} from 'material-ui/Card'
import UiPaper from 'material-ui/Paper'


let View = ({ view, tasks, name, filter, selectedObject, dispatch }) => {
  let selected = selectedObject && selectedObject.id === view.id
  return (
    <UiPaper style={{marginBottom: 40, border: selected ? "1px solid" : "none"}} zDepth={4}>
      <UiCardHeader title={view.name} subtitle={view.filter}
          onClick={() => dispatch(toggleSelectObject(view))}
          onDoubleClick={() => dispatch(toggleUpdateView(true, view))}/>
        <TaskList tasks={tasks} />
    </UiPaper>
  )
}

const mapStateToProps = (state, props) => ({
  tasks: state.get('tasks').filter(task => {
    const hasTag = (tag) => {
      return _.contains(task.get('tags'), tag)
    }

    const hasList = (listName) => {
      let list = _.find(state.get('lists'), (list) => list.get('name') === listName)
      return list && _.contains(task.get('lists'), list.get('id'))
    }

    const isDeleted = () => {
      return task.get('deleted')
    }

    const hasContext = (contextName) => {
      let context = _.find(state.get('contexts'), (context) => context.get('name') === contextName)
      return context && _.contains(task.get('contexts'), context.get('id'))
    }

    const hasParent = () => {
      return !!task.get('lists') && !task.get('lists').isEmpty()
    }

    return !isDeleted() && eval(props.view.filter)
  }),
  view: props.view,
  selectedObject: state.get('ui').get('selectedObject')
})

View = connect(
  mapStateToProps
)(View)

export default View
