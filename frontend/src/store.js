import { createStore, combineReducers, applyMiddleware } from "redux"
import oinksReducer from "./reducers/oinksReducer"
import loginReducer from "./reducers/loginReducer"
import thunk from "redux-thunk"

const reducer = combineReducers({
    oinks: oinksReducer,
    user: loginReducer
})

const store = createStore(
    reducer,
    // async support for reducers 
    applyMiddleware(thunk)
)

export default store