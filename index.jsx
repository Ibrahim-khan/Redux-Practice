// state - count:0
// action - increment, decrement, reset
// reducer 
// store
const {default:axios} = require("axios");
const {createStore, combineReducers, applyMiddleware }= require("redux");
const thunk = require("redux-thunk").default;
//CONSTANT
const INCREMENT = 'INCREMENT';
const INCREMENT_BY_VALUE = 'INCREMENT_BY_VALUE'
const DECREMENT = 'DECREMENT';
const RESET = 'RESET';


const initialState = {
    count: 0
}

const incrementCounterAction = () => {
    return {
        type : INCREMENT,
    };
};

const decrementCounterAction = () => {
    return {
        type : DECREMENT,
    };
};

const resetCounterAction = () => {
    return {
        type : RESET,
    };
};

const incrementCounterByValue = (value) => {
    return {
        type: INCREMENT_BY_VALUE,
        payload: value,
    };
};




// CREATING REDUCER
const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT:          
            return {
                ...state,
                count: state.count + 1,
            }

        case DECREMENT:          
            return {
                ...state,
                count: state.count - 1,
            }

        case RESET:          
            return {
                ...state,
                count: 0,
            }

        case INCREMENT_BY_VALUE:          
            return {
                ...state,
                count: state.count + action.payload,
            }
        
        default:
            state;
    }
}

//store
const store = createStore(counterReducer);

store.subscribe(() => {
    console.log(store.getState());
})

store.dispatch(incrementCounterAction());
store.dispatch(incrementCounterAction());
store.dispatch(incrementCounterAction());
store.dispatch(decrementCounterAction());
store.dispatch(resetCounterAction());
store.dispatch(incrementCounterAction());
store.dispatch(incrementCounterByValue(5));






// products constants
const GET_PRODUCTS = "GET_PRODUCTS";
const ADD_PRODUCT = "ADD_PRODUCT";

// cart constants
const GET_CART_ITEMS = "GET_CART_ITEMS";
const ADD_CART_ITEM = "ADD_CART_ITEM";

// Product states
const initialProductState = {
    products: ["sugar", "salt"],
    numberofProducts: 2,
};


// Cart states
const initialCartState = {
    cart: ["sugar"],
    numberofProducts: 1,
};

// product actions
const getProducts = () => {
    return {
        type : GET_PRODUCTS,
    };
};

const addProduct = (product) => {
    return {
        type : ADD_PRODUCT,
        payload: product,
    };
};


// cart actions
const getCart = () => {
    return {
        type : GET_CART_ITEMS,
    };
};

const addCart = (product) => {
    return {
        type : ADD_CART_ITEM,
        payload: product,
    };
};

// productReducer
const productReducer = (state = initialProductState, action) => {
    
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
            };

        case ADD_PRODUCT:
            return {
                products: [...state.products, action.payload],
                numberofProducts: state.numberofProducts + 1,
            };
            
    
        default:
           return state;
    }
};

// cartReducer
const cartReducer = (state = initialCartState, action) => {
    
    switch (action.type) {
        case GET_CART_ITEMS:
            return {
                ...state,
            };

        case ADD_CART_ITEM:
            return {
                cart: [...state.cart, action.payload],
                numberofProducts: state.numberofProducts + 1,
            };
            
    
        default:
           return state;
    }
};

const rootReducer = combineReducers({
    productR: productReducer,
    cartR: cartReducer
})

// store
const storeTwo = createStore(rootReducer);
storeTwo.subscribe(()=>{
    console.log(storeTwo.getState());
});

storeTwo.dispatch(getProducts());
storeTwo.dispatch(addProduct("pen"));

storeTwo.dispatch(getCart());
storeTwo.dispatch(addCart("pen"));


// Fetch Data Using Redux Thunk start

// async actions - api calling
// api url - https://jsonplaceholder.typicode.com/todos
// middleware - redux-thunk
// axios api

// constants
const GET_TODOS_REQUEST = "GET_TODOS_REQUEST";
const GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS";
const GET_TODOS_FAILED = "GET_TODOS_FAILED";
const API_URL = "https://jsonplaceholder.typicode.com/todos";

// states

const initialTodosState = {
    todos: [],
    isLoading: false,
    error: null,
};

// actions
const getTodosRequest = () => {
    return {
        type: GET_TODOS_REQUEST,
    };
};

const getTodosFailed = (error) => {
    return {
        type: GET_TODOS_REQUEST,
        payload: error,
    };
};

const getTodosSuccess = (todos) => {
    return {
        type: GET_TODOS_SUCCESS,
        payload: todos,
    };
};

//reducers
const todosReducer = (state = initialTodosState, action) => {
    switch (action.type) {
        case GET_TODOS_REQUEST:
            return {
                ...state,
                isLoading: true,
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
           return state;
    }
}

// async action creator
const fetchData = () => {
    return (dispatch) => {
        dispatch (getTodosRequest());
        axios
        .get(API_URL)
        .then (res => {
            const todos = res.data;
            const title = todos.map((todo) => todo.title);
            dispatch(getTodosSuccess(titles))
        })
        .catch (error => {
            const errorMessage = (error.message);
            dispatch (getTodosFailed(errorMessage));
        })
    };
};

//store
const storeThree = createStore(todosReducer, applyMiddleware(thunk));

storeThree.subscribe(() => {
    console.log(storeThree.getState());
});

storeThree.dispatch(fetchData())
