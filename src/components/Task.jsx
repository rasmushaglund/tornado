import React, { PropTypes } from 'react'

const Task = ({ onClick, completed, text, tags, contexts }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
  }}>
    {text}
    <ul>
      {tags.map(tag =>
        <li key={tag}>#{tag}</li>
      )}
    </ul>
    <ul>
      {contexts.map(context =>
        <li key={context}>@{context}</li>
      )}
    </ul>
  </li>
)

Task.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  contexts: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired
}

export default Task
