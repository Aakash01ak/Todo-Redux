import { GET_TODOS, ADD_TODO, DELETE_TODO, COMPLETED_TODO, TODOS_LOADING } from '../actions/types'

const initialState = {
    todos: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_TODOS:
            return{
              ...state,
              todos: action.payload ,
              loading:false
            };
        case ADD_TODO:
            return{
              ...state,
              todos: [action.payload, ...state.todos]
            }
        case DELETE_TODO:
            return{
                ...state,
                todos: state.todos.filter(todo => todo._id !== action.payload)
            }
        case COMPLETED_TODO:
            return{
                ...state,
                todos: state.todos.map(todo => (
                    todo._id === action.payload.id ? {...todo, isCompleted : !action.payload.isCompleted} : todo
                ))
            }
        case TODOS_LOADING:
            return{
                ...state,
                loading: true
            };
        default: 
            return state;
    }
}