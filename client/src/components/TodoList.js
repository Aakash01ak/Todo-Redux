import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Button, Form, Input, FormGroup } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux';
import { getTodos, addTodo, deleteTodo, completedTodo } from '../redux/actions/todoActions'
import PropTypes from 'prop-types';

class TodoList extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            isCompleted: false
        }
    }

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
      };
       
    componentDidMount(){

    this.props.getTodos();

    }

   handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }
  
  handleSubmit = (event) => {
    event.preventDefault();

    if(this.state.name){
    const newTodo = this.state.name;
        this.props.addTodo(newTodo);
    }
    this.setState({name: ''});
  }

  onDeleteClick = (_id) => {
       this.props.deleteTodo(_id);
  }

  onCompleteClick = (_id, isCompleted) => {

    this.props.completedTodo(_id, isCompleted);

  }

    render() {
        const { todos } = this.props.todo;
        return (
            <div>
                {this.props.isAuthenticated ? (
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                    <Input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Enter a todo"/>
                    </FormGroup>
                    <Button 
                    className="btn1"
                    color="success" 
                    size="md" 
                    block
                    >Submit</Button>
                </Form>
                ) : <h4 className='mb-3 ml-4'>Please Log In To Manage Todos</h4>}

                    <ListGroup className="mt-5">
                    <TransitionGroup>
                        {
                            todos.map(({ _id, name, isCompleted }) => (
                            <CSSTransition key={_id} timeout={500} classNames="my-node">
                                <ListGroupItem  >
                                {this.props.isAuthenticated ? (
                                <Button
                                className="btn2" 
                                color="danger"
                                size="sm"
                                onClick={ 
                                            this.onDeleteClick.bind(this, _id)
                                }
                                >&times;
                                </Button>
                                ) : null}
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                {this.props.isAuthenticated ? (
                                <Input
                                type="checkbox"
                                name="isCompleted"
                                checked={isCompleted}
                                onChange={this.handleChange}
                                onClick={ 
                                            this.onCompleteClick.bind(this, _id, isCompleted)
                                }
                                ></Input>
                                ) : null}
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                    <div style={{textDecoration: isCompleted ? "line-through" : "", display:"inline"}}>{name}</div>
                                </ListGroupItem>
                            </CSSTransition>
                            
                            ))
                        }
                    </TransitionGroup>
                    </ListGroup>

                
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    todo: state.todo,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getTodos, deleteTodo, addTodo, completedTodo })(TodoList); 
