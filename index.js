//import redux
const redux = require('redux');
//import redux logger
const reduxLogger = require('redux-logger');

//call createStore function from redux
const createStore = redux.createStore;
//create logger fuction from redux logger
const logger = reduxLogger.createLogger();

//call applymiddleware from redux
const applymiddleware = redux.applyMiddleware;

//create const for action
const BUY_CAKE = 'BUY_CAKE';

//create your action 
function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'Buying Cake'
    }
}

//define initial state
const initialState = {
    numOfCakes: 10
};

//create reducer
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...state,
                numOfCakes: state.numOfCakes - 1
            }
        default:
            return state
    }
}

//put createStore in store variable
const store = createStore(reducer);
//log Inital State
console.log('Inital State::', store.getState());
//call subscribe function from store
const unsubscribe = store.subscribe(() => { console.log('Updated State::', store.getState()); });
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
unsubscribe();