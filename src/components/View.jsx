import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { toggleTask } from '../actions'
import TaskList from './TaskList'

import {Card as UiCard, CardHeader as UiCardHeader, CardText as UiCardText} from 'material-ui/Card'
import UiPaper from 'material-ui/Paper'

var _ = require("underscore");

let View = ({ tasks, text, onTaskClick, filter }) => {
  return (
    <UiPaper zDepth={4}>
      <UiCard>
        <UiCardHeader title={text} subtitle={filter}/>
        <TaskList tasks={tasks}
            onTaskClick={onTaskClick} />
      </UiCard>
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

    const hasContext = (context) => {
      return _.contains(task.contexts, context)
    }

    const hasParent = () => {
      return !!task.lists && task.lists.length > 0
    }

    console.log(task, eval(props.filter), props.filter)
    //debugger
    return eval(props.filter)
  }),
  text: props.text,
  filter: props.filter
})

const mapDispatchToProps =  ({
  onTaskClick: toggleTask
})

View = connect(
  mapStateToProps,
  mapDispatchToProps
)(View)

export default View
