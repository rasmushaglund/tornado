import React from 'react'
import { connect } from 'react-redux'
import { addView } from '../actions'

let AddView = ({ dispatch }) => {
  let textInput, filterInput

  return (
    <form onSubmit={e => {
        e.preventDefault()
        if (!textInput.value.trim()) {
          return
        }
        dispatch(addView(textInput.value, filterInput.value))
        textInput.value = ''
        filterInput.value = ''
    }}>
      <input ref={node => {
          textInput = node
        }} />
      <input ref={node => {
          filterInput = node
        }} />
      <button type="submit">Add view</button>
    </form>
  )
}

AddView = connect()(AddView)

export default AddView
