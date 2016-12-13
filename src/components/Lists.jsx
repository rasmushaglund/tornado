import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { toggleTask, toggleUpdateTask, toggleDeleteTask } from '../actions'
import TaskList from './TaskList'


let Lists = ({ lists, onTaskClick, onSettingsClick, onDeleteClick }) => (
  <ul>
    <TaskList key={0}
      onSettingsClick={onSettingsClick}
      onDeleteClick={onDeleteClick}
      onTaskClick={onTaskClick} />
    {lists.map(list =>
      <TaskList key={list.id}
        onTaskClick={onTaskClick}
        onSettingsClick={onSettingsClick}
        onDeleteClick={onDeleteClick}
        {...list}
      />
    )}
  </ul>
)

const mapStateToProps = (state) => ({
  lists: state.lists,
})

const mapDispatchToProps =  ({
  onTaskClick: toggleTask,
  onSettingsClick: toggleUpdateTask,
  onDeleteClick: toggleDeleteTask
})

Lists = connect(
  mapStateToProps,
  mapDispatchToProps
)(Lists)

export default Lists
