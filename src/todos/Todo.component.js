//Todo.js
import React, { Component } from 'react';
import style from '../style';
import CheckBox from 'react-material-icons/icons/toggle/check-box';
import CheckBoxOutline from 'react-material-icons/icons/toggle/check-box-outline-blank';
import ModeEdit from 'react-material-icons/icons/editor/mode-edit';
import Delete from 'react-material-icons/icons/action/delete';
import {
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state= {
            toBeUpdated: false,
            title: props.title,
            completed: props.completed
        };
        //binding all our functions to this class
        this.deleteTodo = this.deleteTodo.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.toggleComplete = this.toggleComplete.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleTodoUpdate = this.handleTodoUpdate.bind(this);
    }
    updateTodo(e) {
        e.preventDefault();
        //brings up the update field when we click on the update link.
        this.setState({ toBeUpdated: !this.state.toBeUpdated });
    }
    toggleComplete(e) {
        e.preventDefault();
        console.log('setting complete to: ', !this.state.completed);
        let id = this.props.uniqueID;
        let title = (this.state.title) ? this.state.title : null;
        let completed = !this.state.completed ;
        this.setState({ completed: !this.state.completed });
        let todo = { title: title, completed: completed};
        this.props.onTodoUpdate(id, todo);
        this.setState(todo);
    }
    handleTodoUpdate(e) {
        e.preventDefault();
        let id = this.props.uniqueID;
        console.log('handling update, state=', this.state);
        let title = (this.state.title) ? this.state.title : null;
        let completed = (this.state.completed) ? this.state.completed : false;
        let todo = { title: title, completed: completed};
        console.log('this.props =', this.props);
        this.props.onTodoUpdate(id, todo);
        this.setState({
            toBeUpdated: !this.state.toBeUpdated,
            title: this.state.title,
            completed: this.state.completed
        })
    }
    deleteTodo(e) {
        e.preventDefault();
        let id = this.props.uniqueID;
        this.props.onTodoDelete(id);
        console.log('to do has been deleted');
    }
    handleTitleChange(e) {
        console.log('setting title: ', e.target.value );
        this.setState({ title: e.target.value });
    }
    handleStatusChange(e) {
        console.log('setting completed: ', e.target.checked );
        this.setState({ completed: e.target.checked });
    }

    render() {
        let checkbox = null;
        if (this.props.completed) {
            checkbox = <CheckBox onClick={ this.toggleComplete } style={style.completedStyle}></CheckBox>
        } else {
            checkbox =  <CheckBoxOutline onClick={ this.toggleComplete } style={style.completedStyle}></CheckBoxOutline>
        }
        return (
            <TableRow>
                <TableRowColumn>
                    <ModeEdit style={ style.updateLink } onClick={ this.updateTodo }></ModeEdit>
                    <Delete style={ style.deleteLink } onClick={ this.deleteTodo }></Delete>
                    <span style={ style.toDoStyle }>{ this.props.title }</span>
                    { (this.state.toBeUpdated)
                        ? (<form onSubmit={ this.handleTodoUpdate }>
                            <input
                                type='text'
                                placeholder='Update title…'
                                style={ style.todoFormTitle }
                                value={ this.state.title }
                                onChange= { this.handleTitleChange } />
                            <input
                                type='submit'
                                style={ style.todoFormPost }
                                value='Update' />
                        </form>)
                        : null }
                </TableRowColumn>
                <TableRowColumn>
                    {checkbox}
                </TableRowColumn>

            </TableRow>
        )
    }
}
export default Todo;