var _ = require("underscore")
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import View from './View'

const viewsStyle = {
  display: "flex",
  //flexDirection: "column",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "flex-start"
  //height: "100vw"
}

let Views = ({ views }) => (
  <div style={viewsStyle}>
    {_.map(views, view =>
      <View key={view.id}
        text={view.text}
        {...view}
      />
    )}
  </div>
)

const mapStateToProps = (state) => ({
  views: _.filter(state.views, (view) => !view.deleted)
})

const mapDispatchToProps =  ({
})

Views = connect(
  mapStateToProps,
  mapDispatchToProps
)(Views)

export default Views
