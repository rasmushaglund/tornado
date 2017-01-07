import React from 'react'
var _ = require("underscore");
var trim = require("underscore.string/trim");


import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import AutoComplete from 'material-ui/AutoComplete';

import { connect } from 'react-redux'
import { addTask, addContext, addList, addTag, updateTask, toggleDeleteTask, toggleUpdateTask } from '../actions'

const dataSourceConfig = {
  text: 'textKey',
  value: 'valueKey',
};


const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

class UpdateTaskDialog extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      tags: props.task && props.task.tags || [],
      contexts: props.task && props.task.contexts || [],
      lists: props.task && props.task.lists || [],
      contextDataSource: _.map(props.contexts, (context) => {
        return {textKey: context.name, valueKey: context.id}
      }),
      listDataSource: _.map(props.lists, (list) => {
        return {textKey: list.name, valueKey: list.id}
      }),
      tagDataSource: _.map(props.tags, (tag) => {
        return {textKey: tag.name, valueKey: tag.id}
      }),
      contextSearchText: '',
      listSearchText: '',
      tagSearchText: '',
      deadline: props.task && new Date(props.task.deadline) || {}
    }
  }

  componentDidMount () {
    this.textInput.focus()
  }

  handleDeadlineChanged = (e, date) => {
    this.setState({deadline: date}) //date})
  }

  handleListDelete = (id, input) => {
    this.setState({lists: _.without(this.state.lists, id)})
  }

  handleContextDelete = (id) => {
    this.setState({contexts: _.without(this.state.contexts, id)})
  }

  handleTagDelete = (id) => {
    this.setState({tags: _.without(this.state.tags, id)})
  }

  handleContextSelect = (name, index) => {
    if (index >= 0) {
      let context = this.state.contextDataSource[index]
      let newContexts = this.state.contexts.slice()
      newContexts.push(context.valueKey)
      this.setState({contexts: newContexts, contextSearchText: ''})
      this.contextInput.focus()
    }
  }

  handleListSelect = (name, index) => {
    if (index >= 0) {
      let list = this.state.listDataSource[index]
      let newLists = this.state.lists.slice()
      newLists.push(list.valueKey)
      this.setState({lists: newLists, listSearchText: ''})
      this.listInput.focus()
    }
  }

  handleTagSelect = (name, index) => {
    if (index >= 0) {
      let tag = this.state.tagDataSource[index]
      let newTags = this.state.tags.slice()
      newTags.push(tag.valueKey)
      this.setState({tags: newTags, tagSearchText: ''})
      this.tagInput.focus()
    }
  }


  handleContextInput = (s) => {
    let parts = s.split(",")

    if (parts.length > 1 && parts[0].length > 0) {
      let newContext
      let newContexts = this.state.contexts.slice()
      let contextString = parts[0].trim()
      let existingContext = _.find(this.state.contextDataSource, (context) => context.textKey === contextString)

      if (existingContext) {
        newContext = {id: existingContext.valueKey}
      } else {
        newContext = addContext(contextString)
        this.props.dispatch(newContext)
      }

      newContexts.push(newContext.id)
      this.setState({contexts: newContexts, contextSearchText: ''})
      this.contextInput.refs.searchTextField.input.value = ''
      this.contextInput.close()
    } else {
      this.setState({contextSearchText: s})
    }
  }

  handleListInput = (s) => {
    let parts = s.split(",")

    if (parts.length > 1 && parts[0].length > 0) {
      let newList
      let newLists = this.state.lists.slice()
      let listString = parts[0].trim()
      let existingList = _.find(this.state.listDataSource, (list) => list.textKey === listString)

      if (existingList) {
        newList = {id: existingList.valueKey}
      } else {
        newList = addList(listString)
        this.props.dispatch(newList)
      }

      newLists.push(newList.id)
      this.setState({lists: newLists, listSearchText: ''})
      this.listInput.refs.searchTextField.input.value = ''
      this.listInput.close()
    } else {
      this.setState({listSearchText: s})
    }
  }
  
  handleTagInput = (s) => {
    let parts = s.split(",")

    if (parts.length > 1 && parts[0].length > 0) {
      let newTag
      let newTags = this.state.tags.slice()
      let tagString = parts[0].trim()
      let existingTag = _.find(this.state.tagDataSource, (tag) => tag.textKey === tagString)

      if (existingTag) {
        newTag = {id: existingTag.valueKey}
      } else {
        newTag = addTag(tagString)
        this.props.dispatch(newTag)
      }

      newTags.push(newTag.id)
      this.setState({tags: newTags, tagSearchText: ''})
      this.tagInput.refs.searchTextField.input.value = ''
      this.tagInput.close()
    } else {
      this.setState({tagSearchText: s})
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
          <Chip key={context.id} style={styles.chip} 
          onRequestDelete={() => this.handleContextDelete(contextId)}>{context.name}</Chip>
        )
    });

    let taskLists = this.state.lists.map((listId) => {
        let list = _.find(lists, (l) => l.id === listId)

        return list && (
          <Chip key={list.id} style={styles.chip} 
            onRequestDelete={() => this.handleListDelete(listId)}
            labelStyle={{textDecoration: list.deleted ? 'line-through' : 'none'}}>{list.name}</Chip>
        )
    });

    let taskTags = this.state.tags.map((tagId) => {
        let tag = _.find(tags, (c) => c.id === tagId)

        return tag && (
          <Chip key={tag.id} style={styles.chip} 
          onRequestDelete={() => this.handleTagDelete(tagId)}>{tag.name}</Chip>
        )
    });

    return (
      <Dialog
          title={label}
          modal={false}
          open={true}
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
          <TextField ref={node => {
            this.importanceInput = node
          }} defaultValue={task && task.importance}
          hintText="Importance"/>
        </div>
        <div>
          <TextField ref={node => {
            this.energyInput = node
          }} defaultValue={task && task.energy}
          hintText="Energy"/>
        </div>
        <div>
          <TextField ref={node => {
            this.timeInput = node
          }} defaultValue={task && task.time}
          hintText="Time to complete"/>
        </div>
        <div>
          <DatePicker ref={node => {
              this.deadlineInput = node
          }} value={this.state.deadline}
          onChange={this.handleDeadlineChanged}
          autoOk={true}
          hintText="Deadline" />
        </div>
          <div>
            <AutoComplete ref={node => {
              this.tagInput = node
            }} hintText="Add tag" onNewRequest={this.handleTagSelect}
            onUpdateInput={this.handleTagInput}
            searchText={this.state.tagSearchText}
            filter={AutoComplete.fuzzyFilter}
            dataSourceConfig={dataSourceConfig}
            menuCloseDelay={0}
            dataSource={this.state.tagDataSource} />
            <div style={styles.wrapper}>{taskTags}</div>
          </div>
          <div>
            <AutoComplete ref={node => {
              this.contextInput = node
            }} hintText="Add context" onNewRequest={this.handleContextSelect}
            onUpdateInput={this.handleContextInput}
            searchText={this.state.contextSearchText}
            filter={AutoComplete.fuzzyFilter}
            menuCloseDelay={0}
            dataSourceConfig={dataSourceConfig}
            dataSource={this.state.contextDataSource} />
            <div style={styles.wrapper}>{taskContexts}</div>
          </div>
          <div>
            <AutoComplete ref={node => {
              this.listInput = node
            }} hintText="Add list" onNewRequest={this.handleListSelect}
            onUpdateInput={this.handleListInput}
            searchText={this.state.listSearchText}
            menuCloseDelay={0}
            filter={AutoComplete.fuzzyFilter}
            dataSourceConfig={dataSourceConfig}
            dataSource={this.state.listDataSource} />   
            <div style={styles.wrapper}>{taskLists}</div> 
          </div>

        <form onSubmit={e => {
            e.preventDefault()
            if (!this.textInput.input.value.trim()) {
              return
            }

          let deadlineDate


            if (this.state.deadline && this.state.deadline instanceof Date) {
              deadlineDate = this.state.deadline.toUTCString()
            }
          
            //pp.applet deadline = moment(this.state.deadline).format('ddd, DD MMM YYYY HH:mm:ss ZZ')

            if (task) {
              dispatch(
                updateTask(
                  task.id, 
                  this.textInput.input.value, 
                  this.descriptionInput.input.value, 
                  this.state.lists, 
                  this.state.contexts, 
                  this.state.tags,  
                  this.timeInput.input.value, 
                  this.importanceInput.input.value, 
                  deadlineDate, 
                  this.energyInput.input.value
                )
              )
            } else {
              dispatch(
                addTask(
                  this.textInput.input.value, 
                  this.descriptionInput.input.value, 
                  this.state.lists, 
                  this.state.contexts, 
                  this.state.tags, 
                  this.timeInput.input.value, 
                  this.importanceInput.input.value, 
                  deadlineDate, 
                  this.energyInput.input.value
                )
              )
            }

            closeDialog()

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
  contexts: state.contexts,
  tags: state.tags
})

UpdateTaskDialog = connect(
  mapStateToProps
)(UpdateTaskDialog)

UpdateTaskDialog = connect()(UpdateTaskDialog)

export default UpdateTaskDialog
