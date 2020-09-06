import { GET_TODOS, ADD_TODO, DELETE_TODO, COMPLETED_TODO, TODOS_LOADING } from '../actions/types'
import axios from 'axios';

export const getTodos = () => dispatch => {
    dispatch(setTodosLoading);
    axios
    .get('/api/todos')
    .then(res => 
        dispatch({
            type: GET_TODOS,
            payload: res.data
        }))
}

export const addTodo = newTodo => dispatch => {
    axios
    .post('/api/todos', {name: newTodo} )
    .then(res => 
        dispatch({
            type: ADD_TODO,
            payload: res.data
        }))
}

export const deleteTodo = (id) => dispatch => {
    axios
    .delete(`/api/todos/${id}`)
    .then(res => 
        dispatch({
            type: DELETE_TODO,
            payload: id
        }))
}

export const completedTodo = (id, isCompleted) => dispatch => {
    axios
    .patch(`/api/todos/${id}`, {isCompleted: !isCompleted})
    .then(res => 
        dispatch({
            type: COMPLETED_TODO,
            payload: {id, isCompleted}
        }))
}

export const setTodosLoading = () => {
    return{
        type: TODOS_LOADING
    }
}

