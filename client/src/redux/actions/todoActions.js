import { GET_TODOS, ADD_TODO, DELETE_TODO, COMPLETED_TODO, TODOS_LOADING } from '../actions/types'
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getTodos = () => dispatch => {
    dispatch(setTodosLoading);
    axios
    .get('/api/todos')
    .then(res => 
        dispatch({
            type: GET_TODOS,
            payload: res.data
        }))
    .catch(err =>
        dispatch(returnErrors(err.response.data, err.response.status))
        )    
}

export const addTodo = newTodo => (dispatch, getState) => {
    axios
    .post('/api/todos', {name: newTodo} ,tokenConfig(getState))
    .then(res => 
        dispatch({
            type: ADD_TODO,
            payload: res.data
        }))
    .catch(err =>
        dispatch(returnErrors(err.response.data, err.response.status))
        );   
}

export const deleteTodo = (id) => (dispatch, getState) => {
    axios
    .delete(`/api/todos/${id}`, tokenConfig(getState))
    .then(res => 
        dispatch({
            type: DELETE_TODO,
            payload: id
        }))
    .catch(err =>
        dispatch(returnErrors(err.response.data, err.response.status))
        );    
}

export const completedTodo = (id, isCompleted) => (dispatch, getState) => {
    axios
    .patch(`/api/todos/${id}`, {isCompleted: !isCompleted}, tokenConfig(getState))
    .then(res => 
        dispatch({
            type: COMPLETED_TODO,
            payload: {id, isCompleted}
        }))
    .catch(err =>
        dispatch(returnErrors(err.response.data, err.response.status))
        );      
}

export const setTodosLoading = () => {
    return{
        type: TODOS_LOADING
    }
}

