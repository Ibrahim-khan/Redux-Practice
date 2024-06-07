// defining contants
const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'
const ADD_USER = 'ADD_USER'

//state
const initialCounterState = {
    count: 0,
};
const initialUserState = {
    users: [{ name: "Ibrahim Khan"}],
};

//action - Object - type, payload
const incrementCounter = () => {
    return {
        type: INCREMENT,
    };
};

const decrementCounter = () => {
    return {
        type: DECREMENT,
    };
};

const addUser = () => {
    return {
        type: ADD_USER,
        payload: {name: 'khan'}
    };
};


// 1. state
// 2. dispatch action
// 3. reducer
// 4. store 


