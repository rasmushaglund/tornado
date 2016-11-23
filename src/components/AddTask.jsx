import React from 'react'
import { connect } from 'react-redux'
import { addTask } from '../actions'

let AddTask = ({ dispatch }) => {
  let input

  return (
    <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(addTask(input.value))
        input.value = ''
    }}>
      <input ref={node => {
          input = node
        }} />
      <button type="submit">Add</button>
    </form>
  )
}

AddTask = connect()(AddTask)

export default AddTask
