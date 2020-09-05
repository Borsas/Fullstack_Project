import { createStore, combineReducers, applyMiddleware } from "redux"
import tweetsReducer from "./reducers/tweetsReducer"
import thunk from "redux-thunk"

const reducer = combineReducers({
    tweets: tweetsReducer
})

const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

export default store