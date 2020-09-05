import { createStore, combineReducers, applyMiddleware } from "redux"
import tweetsReducer from "./reducers/tweetsReducer"
import loginReducer from "./reducers/loginReducer"
import thunk from "redux-thunk"

const reducer = combineReducers({
    tweets: tweetsReducer,
    user: loginReducer
})

const store = createStore(
    reducer,
    // async support for reducers 
    applyMiddleware(thunk)
)

export default store