import React from 'react'
import { Set } from 'immutable'
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
import { addTask, updateTask, toggleDeleteTask } from '../actions/tasks'
import { addContext } from '../actions/contexts'
import { addList } from '../actions/lists'
import { addTag } from '../actions/tags'
import { toggleUpdateTask } from '../actions/ui'

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
    let selectedObject = props.selectedObject
    let commonLists, commonTags, commonContexts

    if (selectedObject) {
      let taskLists = []
      let taskTags = []
      let taskContexts = []
      
      selectedObject.has('tasks') && selectedObject.get('tasks').forEach(task => {
        taskLists.push(task.lists)
        taskTags.push(task.tags)
        taskContexts.push(task.contexts)
      })

      commonLists = _.intersection(...taskLists)
      commonTags = _.intersection(...taskTags)
      commonContexts = _.intersection(...taskContexts)
    }

    this.state = {
      tags: new Set(props.task && props.task.tags || commonTags || []),
      contexts: new Set(props.task && props.task.contexts || commonContexts || []),
      lists: new Set(props.task && props.task.lists || commonLists || []),
      contextDataSource: props.contexts.map(context => {
        return {textKey: context.name, valueKey: context.id}
      }).toArray(),
      listDataSource: props.lists.map(list => {
        return {textKey: list.name, valueKey: list.id}
      }).toArray(),
      tagDataSource: props.tags.map(tag => {
        return {textKey: tag.name, valueKey: tag.id}
      }).toArray(),
      contextSearchText: '',
      listSearchText: '',
      tagSearchText: '',
      deadline: props.task && props.task.deadline && new Date(props.task.deadline) || {}
    }
  }

  componentDidMount () {
    this.textInput.focus()
  }

  handleDeadlineChanged = (e, date) => {
    this.setState({deadline: date}) //date})
  }

  handleListDelete = (id, input) => {
    this.setState({lists: this.state.lists.delete(id)})
  }

  handleContextDelete = (id) => {
    this.setState({contexts: this.state.contexts.delete(id)})
  }

  handleTagDelete = (id) => {
    this.setState({tags: this.state.tags.delete(id)})
  }

  handleContextSelect = (name, index) => {
    if (index >= 0) {
      let context = this.state.contextDataSource[index]
      this.setState({
        contexts: this.state.contexts.add(context.valueKey), 
        contextSearchText: ''
      })
      this.contextInput.focus()
    }
  }

  handleListSelect = (name, index) => {
    if (index >= 0) {
      let list = this.state.listDataSource[index]
      this.setState({
        lists: this.state.lists.add(list.valueKey), 
        listSearchText: ''
      })
      this.listInput.focus()
    }
  }

  handleTagSelect = (name, index) => {
    if (index >= 0) {
      let tag = this.state.tagDataSource[index]
      this.setState({
        tags: this.state.tags.add(tag.valueKey), 
        tagSearchText: ''
      })
      this.tagInput.focus()
    }
  }

  handleContextInput = (s) => {
    let parts = s.split(",")

    if (parts.length > 1 && parts[0].length > 0) {
      let newContextId
      let contextString = parts[0].trim()
      let existingContext = _.find(this.state.contextDataSource, context => context.textKey === contextString)

      if (existingContext) {
        newContextId = existingContext.valueKey
      } else {
        let newContextAction = this.props.dispatch(addContext({name: contextString}))
        newContextId = newContextAction.data.id
      }

      this.setState({
        contexts: this.state.contexts.add(newContextId), 
        contextSearchText: ''
      })
      this.contextInput.refs.searchTextField.input.value = ''
      this.contextInput.close()
    } else {
      this.setState({contextSearchText: s})
    }
  }

  handleListInput = (s) => {
    let parts = s.split(",")

    if (parts.length > 1 && parts[0].length > 0) {
      let newListId
      let listString = parts[0].trim()
      let existingList = _.find(this.state.listDataSource, list => list.textKey === listString)

      if (existingList) {
        newListId = existingList.valueKey
      } else {
        let newListAction = this.props.dispatch(addList({name: listString}))
        newListId = newListAction.data.id
      }

      this.setState({
        lists: this.state.lists.add(newListId), 
        listSearchText: ''
      })
      this.listInput.refs.searchTextField.input.value = ''
      this.listInput.close()
    } else {
      this.setState({listSearchText: s})
    }
  }
  
  handleTagInput = (s) => {
    let parts = s.split(",")

    if (parts.length > 1 && parts[0].length > 0) {
      let newTagId
      let tagString = parts[0].trim()
      let existingTag = _.find(this.state.tagDataSource, tag => tag.textKey === tagString)

      if (existingTag) {
        newTagId = existingTag.valueKey
      } else {
        let newTagAction = this.props.dispatch(addTag({name: tagString}))
        newTagId = newTagAction.data.id
      }

      this.setState({
        tags: this.state.tags.add(newTagId), 
        tagSearchText: ''
      })
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
        let context = contexts.get(contextId)

        return context && (
          <Chip key={context.id} style={styles.chip} 
          onRequestDelete={() => this.handleContextDelete(contextId)}>{context.name}</Chip>
        )
    }).toArray();

    let taskLists = this.state.lists.map((listId) => {
        let list = lists.get(listId)

        return list && (
          <Chip key={list.id} style={styles.chip} 
            onRequestDelete={() => this.handleListDelete(listId)}
            labelStyle={{textDecoration: list.deleted ? 'line-through' : 'none'}}>{list.name}</Chip>
        )
    }).toArray();

    let taskTags = this.state.tags.map((tagId) => {
        let tag = tags.get(tagId)

        return tag && (
          <Chip key={tag.id} style={styles.chip} 
          onRequestDelete={() => this.handleTagDelete(tagId)}>{tag.name}</Chip>
        )
    }).toArray();

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
            let taskData = {
              name: this.textInput.input.value, 
              description: this.descriptionInput.input.value, 
              lists: this.state.lists, 
              contexts: this.state.contexts, 
              tags: this.state.tags,
              time: this.timeInput.input.value, 
              importance: this.importanceInput.input.value, 
              deadline: deadlineDate, 
              energy: this.energyInput.input.value
            }

            if (task) {
              dispatch(
                updateTask(task.merge({
                  ...taskData,
                  completed: this.state.completed,
                  deleted: this.state.deleted,
                })
              ))
            } else {
              dispatch(
                addTask(taskData)
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
  tasks: state.get('tasks'),
  lists: state.get('lists'),
  contexts: state.get('contexts'),
  tags: state.get('tags'),
  selectedObject: state.get('ui').get('selectedObject')
})

UpdateTaskDialog = connect(
  mapStateToProps
)(UpdateTaskDialog)

UpdateTaskDialog = connect()(UpdateTaskDialog)

export default UpdateTaskDialog
