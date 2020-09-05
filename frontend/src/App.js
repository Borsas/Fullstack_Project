import React from 'react';
import { Switch, Route } from "react-router-dom"

import Header from "./components/Header/Header"
import TweetPage from "./components/Tweets/TweetPage"
import Login from "./components/Login"


function App() {
    return (
        <Switch>
            <Route path="/login">
                <Login/>
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

export default App;
