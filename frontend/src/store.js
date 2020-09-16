import { createStore, combineReducers, applyMiddleware } from "redux"
import oinksReducer from "./reducers/oinksReducer"
import loginReducer from "./reducers/loginReducer"
import userReducer from "./reducers/userReducer"
import thunk from "redux-thunk"

const reducer = combineReducers({
    oinks: oinksReducer,
    login: loginReducer,
    user: userReducer

})

const store = createStore(
    reducer,
    // async support for reducers 
    applyMiddleware(thunk)
)

export default store