import React from "react"
import { connect } from "react-redux"

import Login from "./Login"

const Header = (props) => {
    return (
        <div>
            <h1>Twitter clone for Fullstack</h1>

            <div>
                {props.user ? props.user : <Login/>}
            </div>
        </div>
        
    )

}

const props = (state) => {
    return {
        user: state.user
    }
}

const HeaderConnected = connect(
    props,
    null
)(Header)

export default HeaderConnected