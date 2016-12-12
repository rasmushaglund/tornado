import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import View from './View'

let Views = ({ views }) => (
  <ul>
    {views.map(view =>
      <View key={view.id}
        text={view.text}
        {...view}
      />
    )}
  </ul>
)

const mapStateToProps = (state) => ({
  views: state.views,
})

const mapDispatchToProps =  ({
})

Views = connect(
  mapStateToProps,
  mapDispatchToProps
)(Views)

export default Views
