import React from 'react'
import { connect } from 'react-redux'
import { addList } from '../actions'

let AddList = ({ dispatch }) => {
  let input

  return (
    <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(addList(input.value))
        input.value = ''
    }}>
      <input ref={node => {
          input = node
        }} />
      <button type="submit">Add list</button>
    </form>
  )
}

AddList = connect()(AddList)

export default AddList
