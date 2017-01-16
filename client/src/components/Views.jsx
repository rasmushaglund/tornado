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
    {views.valueSeq().map(view =>
      <View key={view.get('id')}
        view={view}
      />
    )}
  </div>
)

const mapStateToProps = (state) => ({
  views: state.get('views').filter(view => !view.get('deleted'))
})

const mapDispatchToProps =  ({
})

Views = connect(
  mapStateToProps,
  mapDispatchToProps
)(Views)

export default Views
