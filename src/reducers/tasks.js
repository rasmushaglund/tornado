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

  var tagRegexp = /(?:^|[ ])#([a-zåäöA-ZÅÄÖ0-9 ]+[a-zåäöA-ZÅÄÖ0-9])/gm
  var contextRegexp = /(?:^|[ ])@([a-zåäöA-ZÅÄÖ0-9 ]+[a-zåäöA-ZÅÄÖ0-9])/gm
  var listRegexp = /(?:^|[ ])%([a-zåäöA-ZÅÄÖ0-9 ]+[a-zåäöA-ZÅÄÖ0-9])/gm

  // TODO: should save id instead
  return {
    contexts: extractFeature(stripedString, contextRegexp),
    tags: extractFeature(stripedString, tagRegexp),
    lists: extractFeature(stripedString, listRegexp),
    text: stripedString.text
  }
}

const task = (state, action) => {
  switch (action.type) {
    case "UPDATE_TASK":
      var features = extractFeatures(action.text)

      console.log("Update task with features", features)

      return {
        ...state,
        ...features
      }
    case "ADD_TASK":
      var features = extractFeatures(action.text)

      return {
        ...state,
        id: action.id,
        completed: false,
        ...features
      }
    case "TOGGLE_TASK":
      return {
        ...state,
        completed: !state.completed
      }
    case "TOGGLE_DELETE_TASK":
      return {
        ...state,
        deleted: action.deleted === undefined || action.deleted
      }
    default:
      return state
  }
}

const tasks = (state = [], action) => {
  let actions = ['ADD_TASK', 'UPDATE_TASK', 'TOGGLE_DELETE_TASK', 'TOGGLE_TASK']

  if (_.contains(actions, action.type)) {
    return {
      ...state,
      [action.id]: task(state[action.id], action)
    }
  } else {
    return state
  }
}

export default tasks
