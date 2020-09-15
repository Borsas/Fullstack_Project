import React, {useEffect} from 'react';
import { Switch, Route } from "react-router-dom"
import { connect } from "react-redux"

import Header from "./components/Header/Header"
import TweetPage from "./components/Oinks/OinkPage"
import Login from "./components/Login"
import Register from "./components/Register"

import { getOinks} from "./reducers/oinksReducer"
import { setUser } from "./reducers/loginReducer"


function App(props) {

    useEffect(() => {
        props.getOinks()
        console.log("Loaded oinks")
    }, [])

    useEffect(() => {
        const user = localStorage.getItem("loggedInUser")
        if (user) {
            props.setUser(JSON.parse(user))
            console.log("Set user")
        }

    }, [])

    return (
        <Switch>
            <Route path="/login">
                <Login/>
            </Route>
            <Route path="/register">
                <Register/>
            </Route>
            <Route path="/">
                <div>
                    <Header/>
                    <TweetPage/>
                </div>
            </Route>
        </Switch>
    );
}


const mapDispatchToProps = {
    getOinks,
    setUser
}

const ConnectedApp = connect(
    null,
    mapDispatchToProps
)(App)

export default ConnectedApp
