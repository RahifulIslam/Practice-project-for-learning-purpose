const { bindActionCreators, createStore, applyMiddleware } = require("redux")
const { thunk } = require('redux-thunk').default;

// Constants for Action
const GET_TODOS_REQUEST = "GET_TODOS_REQUEST"
const GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS"
const GET_TODOS_FAILED = "GET_TODOS_FAILED"
const API_URL = "https://jsonplaceholder.typicode.com/todos"

//State
const initialTodosState = {
    todos: [],
    isLoading: false,
    error: null
}
//Action
const getTodosRequest = () => {
    return {
        type: GET_TODOS_REQUEST
    }
}

const getTodosSuccess = (todos) => {
    return {
        type: GET_TODOS_SUCCESS,
        payload: todos,
    }
}

const getTodosFailed = (error) => {
    return {
        type: GET_TODOS_FAILED,
        payload: error,
    }
}
//Reducers
const todosReducer = (state = initialTodosState, action) => {
    switch(action.type){
        case GET_TODOS_REQUEST:
            return {
                ...state,
                isLoading: true
            };

        case GET_TODOS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                todos: action.payload,
            };

        case GET_TODOS_FAILED:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };

        default:
            return state
    }
}

const fetchData =() =>{
    return (dispatch) => {
        dispatch(getTodosRequest())
        axios.get(API_URL)
        .then((res) => {
            console.log(res.data)
        })
        .catch(() => {
            console.log(error.message)
        })
    }
}

//Store
const store = createStore(todosReducer, applyMiddleware(thunk));
store.subscribe(() =>{
    console.log(store.getState());
})

store.dispatch(fetchData())