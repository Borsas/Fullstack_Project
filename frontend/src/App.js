import React, {useEffect} from 'react';
import { Switch, Route, useRouteMatch } from "react-router-dom"
import { connect } from "react-redux"

import Header from "./components/Header/Header"
import OinkPage from "./components/Oinks/OinkPage"
import Login from "./components/Login"
import Register from "./components/Register"
import Profile from "./components/Profile/Profile"

import { getOinks} from "./reducers/oinksReducer"
import { setLoginUser } from "./reducers/loginReducer"
import { getUser } from "./reducers/userReducer"


function App(props) {

    useEffect(() => {
        const user = localStorage.getItem("loggedInUser")
        if (user) {
            props.setLoginUser(JSON.parse(user))
        }
    }, [])

    useEffect(() => {
        props.getOinks()
        console.log("Loaded oinks")
        props.getUser()
    }, [])


    // Match id to profile
    const profileMatch = useRouteMatch("/profile/:id")
    const profileId = profileMatch ? profileMatch.params.id : null

    return (
        <div>
            <Header/>
            <Switch>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/register">
                    <Register/>
                </Route>
                <Route path="/profile/:id">
                    <Profile id={profileId}/>
                </Route>
                <Route path="/">
                    <OinkPage/>
                </Route>
            </Switch>
        </div>
    );
}


const mapDispatchToProps = {
    getOinks,
    setLoginUser,
    getUser
}
const props = (state) => {
    return {
        login: state.login,
        user: state.user
    }
}

const ConnectedApp = connect(
    props,
    mapDispatchToProps
)(App)

export default ConnectedApp
