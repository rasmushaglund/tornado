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
import { addTask, addContext, updateTask, toggleDeleteTask, toggleUpdateTask } from '../actions'

const dataSourceConfig = {
  text: 'textKey',
  value: 'valueKey',
};

//let UpdateTaskDialog = ({ visible, task, dispatch, lists, contexts }) => {
class UpdateTaskDialog extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      tags: [],
      contexts: [],
      lists: [],
      contextDataSource: [],
      listDataSource: [],
      tagDataSource: []
    }
  }

  componentWillReceiveProps (props) {
    let contexts = this.state.contexts || props.task && props.task.contexts || []
    this.setState((prevState, props) => {
      return {
      tags: props.task && props.task.tags || [],
        contexts: prevState.contexts || props.task && props.task.contexts || [], 
      lists: props.task && props.task.lists || [],
      contextDataSource: _.map(props.contexts, (context) => {
        return {textKey: context.name, valueKey: context.id}
      }),
      listDataSource: _.map(props.lists, (list) => {
        return {textKey: list.name, valueKey: list.id}
      }),
      tagDataSource: _.map(props.tags, (tag) => {
        return {textKey: tag, valueKey: tag}
      })
      }
    })
  }

  handleListDelete = (id, input) => {
    this.setState({lists: _.without(this.state.lists, id)})
  }

  handleContextDelete = (id) => {
    this.setState({contexts: _.without(this.state.contexts, id)})
  }

  handleTagDelete = (tag) => {
    this.setState({tags: _.without(this.state.tags, tag)})
  }

  handleContextSelect = (name, index) => {
    if (index >= 0) {
      let context = this.state.contextDataSource[index]
      let newContexts = this.state.contexts.slice()
      newContexts.push(context.valueKey)
      this.setState({contexts: newContexts})
    }
  }

  handleListSelect = (name, index) => {
    if (index >= 0) {
      let list = this.state.listDataSource[index]
      let newLists = this.state.lists.slice()
      newLists.push(list.valueKey)
      this.setState({lists: newLists})
    }
  }

  handleTagSelect = (name, index) => {
    let tag = index < 0 ? name : this.state.tagDataSource[index].valueKey
    let newTags = this.state.tags.slice()
    newTags.push(tag)
    this.setState({tags: newTags})
  }


  handleContextInput = (s) => {
    let parts = s.split(",")

    if (parts.length > 1) {
      let newContexts = this.state.contexts.slice()
      let newContext = addContext(parts[0].trim())
      newContexts.push(newContext.id)
      this.props.dispatch(newContext)
      this.setState({contexts: newContexts})
      this.contextInput.refs.searchTextField.input.value = ''
    }
  }

  render () {
    let {task, visible, contexts, lists, tags, dispatch} = this.props

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
          <Chip key={context.id} onRequestDelete={() => this.handleContextDelete(contextId)}>{context.name}</Chip>
        )
    });

    let taskLists = this.state.lists.map((listId) => {
        let list = _.find(lists, (l) => l.id === listId)

        return list && (
          <Chip key={list.id} onRequestDelete={() => this.handleListDelete(listId)}
            labelStyle={{textDecoration: list.deleted ? 'line-through' : 'none'}}>{list.name}</Chip>
        )
    });

    let taskTags = this.state.tags.map((tag) => {
      return (
        <Chip key={tag} onRequestDelete={() => this.handleTagDelete(tag)}>{tag}</Chip>
      )
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
              this.textInput = node
            }} defaultValue={task && task.name}
            hintText="Task name"/>
          </div>
          <div>
            <TextField ref={node => {
              this.descriptionInput = node
            }} defaultValue={task && task.description}
            hintText="Task description"/>
          </div>
          <div>
            <AutoComplete ref={node => {
              this.tagInput = node
            }} hintText="Add tag" onNewRequest={this.handleTagSelect}
            openOnFocus={true}
            onUpdateInput={this.handleTagInput}
            filter={AutoComplete.fuzzyFilter}
            dataSourceConfig={dataSourceConfig}
            dataSource={this.state.tagDataSource} />
          {taskTags}
          </div>
          <div>
            <AutoComplete ref={node => {
              this.contextInput = node
            }} hintText="Add context" onNewRequest={this.handleContextSelect}
            openOnFocus={true}
            onUpdateInput={this.handleContextInput}
            filter={AutoComplete.fuzzyFilter}
            dataSourceConfig={dataSourceConfig}
            dataSource={this.state.contextDataSource} />
            {taskContexts}
          </div>
          <div>
            <AutoComplete ref={node => {
              this.listInput = node
            }} hintText="Add list" onNewRequest={this.handleListSelect}
            openOnFocus={true}
            onUpdateInput={this.handleListInput}
            filter={AutoComplete.fuzzyFilter}
            dataSourceConfig={dataSourceConfig}
            dataSource={this.state.listDataSource} />
            {taskLists}
          </div>

        <form onSubmit={e => {
            e.preventDefault()
            if (!this.textInput.input.value.trim()) {
              return
            }

            if (task) {
              dispatch(updateTask(task.id, this.textInput.input.value, this.descriptionInput.input.value, this.state.lists, this.state.contexts, this.state.tags))
            } else {
              dispatch(addTask(this.textInput.input.value, this.descriptionInput.input.value, this.state.lists, this.state.contexts, this.state.tags))
            }

            closeDialog()

          this.textInput.input.value = ''
          this.tagInput.refs.searchTextField.input.value = ''
          this.contextInput.refs.searchTextField.input.value = ''
          this.listInput.refs.searchTextField.input.value = ''
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
  mapStateToProps
)(UpdateTaskDialog)

UpdateTaskDialog = connect()(UpdateTaskDialog)

export default UpdateTaskDialog
