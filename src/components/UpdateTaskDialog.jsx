import React from 'react'
var _ = require("underscore");
var trim = require("underscore.string/trim");


import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import AutoComplete from 'material-ui/AutoComplete';

import { connect } from 'react-redux'
import { addTask, updateTask, toggleDeleteTask, toggleUpdateTask } from '../actions'

const dataSourceConfig = {
  text: 'textKey',
  value: 'valueKey',
};

//let UpdateTaskDialog = ({ visible, task, dispatch, lists, contexts }) => {
class UpdateTaskDialog extends React.Component {
  constructor (props) {
    super(props)

    console.log(props)
    this.state = {
      tags: [],
      contexts: [],
      lists: [],
      contextDataSource: [],
      listDataSource: []
    }

    console.log(this.state)
  }

  componentWillReceiveProps (props) {

    this.setState({
      tags: props.task && props.task.tags || [],
      contexts: props.task && props.task.contexts || [],
      lists: props.task && props.task.lists || [],
      contextDataSource: _.map(props.contexts, (context) => {
        return {textKey: context.text, valueKey: context.id}
      }),
      listDataSource: _.map(props.lists, (list) => {
        return {textKey: list.text, valueKey: list.id}
      })
    })
  }

  handleListDelete (id, input) {
    this.setState({lists: _.filter(this.state.lists, (listId) => listId !== id)})
  }

  handleContextDelete (id) {
    this.setState({contexts: _.filter(this.state.contexts, (contextId) => contextId !== id)})
  }

  handleTagDelete (tag) {
    this.setState({tags: _.without(this.state.tags, t)})
  }

  handleContextSelect = (text, index) => {
    if (index >= 0) {
      let context = this.state.contextDataSource[index]
      let newContexts = this.state.contexts.slice()
      newContexts.push(context.valueKey)
      this.setState({contexts: newContexts})
    }
  }

  handleListSelect = (text, index) => {
    if (index >= 0) {
      let list = this.state.listDataSource[index]
      let newLists = this.state.lists.slice()
      newLists.push(list.valueKey)
      this.setState({lists: newLists})
    }
  }

  handleTaskKeyPress () {

  }

  render () {
    let {task, visible, contexts, lists, dispatch} = this.props
    let textInput, tagInput, contextInput, listInput

    let closeDialog = () =>  {
      dispatch(toggleUpdateTask(false))
    }

    let label = task ? "Edit Task" : "Add Task"

    let deleteButton = task ? (
      <FlatButton
        label="Delete"
        onTouchTap={() => {
          dispatch(toggleDeleteTask(task.id))
          closeDialog()
        }}
        secondary={true}
      />
    ) : null;

    let taskContexts = this.state.contexts.map((contextId) => {
        let context = _.find(contexts, (c) => c.id === contextId)

        return context && (
          <Chip key={context.id} onRequestDelete={() => this.handleContextDelete(contextId)}>{context.text}</Chip>
        )
    });

    let taskLists = this.state.lists.map((listId) => {
        let list = _.find(lists, (l) => l.id === listId)

        return list && (
          <Chip key={list.id} onRequestDelete={() => this.handleListDelete(listId)}
            labelStyle={{textDecoration: list.deleted ? 'line-through' : 'none'}}>{list.text}</Chip>
        )
    });

    let taskTags = this.state.tags.map((tag) => {
      <Chip key={tag} onRequestDelete={() => this.handleTagDelete(tag)}>{tag}</Chip>
    });

    return (
      <Dialog
          title={label}
          modal={false}
          open={visible}
          onRequestClose={closeDialog}
          autoScrollBodyContent={true} >
          <div>
            <TextField ref={node => {
              textInput = node
            }} defaultValue={task && task.text}
            hintText="Task name"/>
          </div>
          <div>
            <TextField ref={node => {
              tagInput = node
            }} hintText="Add tag" onKeyUp={this.handleTaskKeyPress} />
            {taskTags}
          </div>
          <div>
            <AutoComplete ref={node => {
              contextInput = node
            }} hintText="Add context" onNewRequest={this.handleContextSelect}
            openOnFocus={true}
            filter={AutoComplete.fuzzyFilter}
            dataSourceConfig={dataSourceConfig}
            dataSource={this.state.contextDataSource} />
            {taskContexts}
          </div>
          <div>
            <AutoComplete ref={node => {
              listInput = node
            }} hintText="Add list" onNewRequest={this.handleListSelect}
            openOnFocus={true}
            filter={AutoComplete.fuzzyFilter}
            dataSourceConfig={dataSourceConfig}
            dataSource={this.state.listDataSource} />
            {taskLists}
          </div>

        <form onSubmit={e => {
            e.preventDefault()
            if (!textInput.input.value.trim()) {
              return
            }

            if (task) {
              dispatch(updateTask(task.id, textInput.input.value, this.state.lists, this.state.contexts, this.state.tags))
            } else {
              dispatch(addTask(textInput.input.value, this.state.lists, this.state.contexts, this.state.tags))
            }

            closeDialog()

            textInput.input.value = ''
        }}>
          <FlatButton
            label="Cancel"
            onTouchTap={closeDialog}
          />
          <FlatButton
            label={task ? "Update" : "Add"}
            type="submit"
            primary={true}
            keyboardFocused={true}
          />
          {deleteButton}
        </form>
      </Dialog>
    )
  }
}

const mapStateToProps = (state) => ({
  tasks: state.tasks,
  lists: state.lists,
  contexts: state.contexts
})

UpdateTaskDialog = connect(
  mapStateToProps,
)(UpdateTaskDialog)

UpdateTaskDialog = connect()(UpdateTaskDialog)

export default UpdateTaskDialog
