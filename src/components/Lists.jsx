import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { toggleTask } from '../actions'
import TaskList from './TaskList'


let Lists = ({ lists, onTaskClick }) => (
  <ul>
    <TaskList key={0}
      onTaskClick={onTaskClick} />
    {lists.map(list =>
      <TaskList key={list.id}
        onTaskClick={onTaskClick}
        {...list}
      />
    )}
  </ul>
)

const mapStateToProps = (state) => ({
  lists: state.lists,
})

const mapDispatchToProps =  ({
  onTaskClick: toggleTask
})

Lists = connect(
  mapStateToProps,
  mapDispatchToProps
)(Lists)

export default Lists
