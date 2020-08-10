const redux = require('redux');
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');

const createStore = redux.createStore;
const FETCH_USER = 'FETCH_USER';
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

const initialState = {
    loading: false,
    data: [],
    error: null
}

const fetchUserRequest = () => {
    return {
        type: FETCH_USER,
    }
}

const fetchUserSuccess = (users) => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: users
    }
}

const fetchUserError = (err) => {
    return {
        type: FETCH_USER_ERROR,
        payload: err
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER:
            return {
                ...state,
                loading: true
            }
        case FETCH_USER_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: null
            }
        case FETCH_USER_ERROR:
            return {
                loading: false,
                data: [],
                error: action.payload
            }
        default: return state
    }
}

const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUserRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                const { data } = response;
                dispatch(fetchUserSuccess(data))
            }).catch((err) => {
                dispatch(fetchUserError(err.message))
            });
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => { console.log('My State::', store.getState()); })
store.dispatch(fetchUsers())