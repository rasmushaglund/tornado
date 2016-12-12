var trim = require("underscore.string/trim");
var _ = require("underscore");

// Extract tag/context and save to text pointer
const extractFeature = (o, exp) => {
  var features = []
  var feature

  while ((feature = exp.exec(o.text)) != null) {
    o.text = o.text.substr(0, feature.index) +
                    o.text.substr(feature.index + feature[0].length, o.text.length)

    exp.lastIndex -= feature[0].length
    features.push(trim(feature[0]).substring(1))
  }

  return _.unique(features)
}

const extractFeatures = (text) => {
  let stripedString = {text: text}

  var tagRegexp = /(?:^|[ ])#([a-zåäöA-ZÅÄÖ0-9]+)/gm
  var contextRegexp = /(?:^|[ ])@([a-zåäöA-ZÅÄÖ0-9]+)/gm
  var listRegexp = /(?:^|[ ])%([a-zåäöA-ZÅÄÖ0-9]+)/gm

  return {
    contexts: extractFeature(stripedString, contextRegexp),
    tags: extractFeature(stripedString, tagRegexp),
    lists: extractFeature(stripedString, listRegexp),
    text: stripedString.text
  }
}

const task = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      let features = extractFeatures(action.text)

      console.log("Adding task with features", features)

      return {
        id: action.id,
        completed: false,
        ...features
      }
    case "TOGGLE_TASK":
      if (state.id !== action.id) {
        return state
      }

      return {
        ...state,
        completed: !state.completed
      }
    default:
      return state
  }
}

const tasks = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [
        ...state,
        task(undefined, action)
      ]
    case 'TOGGLE_TASK':
      return state.map(t =>
        task(t, action)
      )
    default:
      return state
  }
}

export default tasks
