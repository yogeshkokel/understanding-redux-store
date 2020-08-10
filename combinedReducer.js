//import redux
const redux = require('redux');

//call createStore function from redux
const createStore = redux.createStore;
const combinedReducer = redux.combineReducers;

//create const for action
const BUY_CAKE = 'BUY_CAKE';
const BUY_CANDY = 'BUY_CANDY';

//create your action 
function buyCake() {
    return {
        type: BUY_CAKE,
        info: 'Buying Cake'
    }
}

function buyCandy() {
    return {
        type: BUY_CANDY,
        info: 'Buying Candy'
    }
}

//define initial state
const initialCakeState = {
    numOfCakes: 10
};

const initialCandyState = {
    numOfCandies: 20
};

//create separate reducer for each
const cakeReducer = (state = initialCakeState, action) => {
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
const candyReducer = (state = initialCandyState, action) => {
    switch (action.type) {
        case BUY_CANDY:
            return {
                ...state,
                numOfCandies: state.numOfCandies - 1
            }
        default:
            return state
    }
}


//put both of them in common root reducer
const rootReducer = combinedReducer({
    cake: cakeReducer,
    candy: candyReducer
})

//put rootReducer in create store functio
const store = createStore(rootReducer);
//log Inital State
console.log('Inital State::', store.getState());
//call subscribe function from store
const unsubscribe = store.subscribe(() => { console.log('Updated State::', store.getState()); });
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCandy());
store.dispatch(buyCandy());
unsubscribe();