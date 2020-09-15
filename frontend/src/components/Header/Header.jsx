import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { setUser } from "../../reducers/loginReducer"

const Header = (props) => {

    const logout = () => {
        props.setUser(null)
        window.localStorage.removeItem("loggedInUser")
    }

    return (
        <div>
            <h1>Oinker</h1>

            <div>
                {props.user ? 
                <div> 
                    Logged in as <b>{props.user.username}</b>
                    <button onClick={logout}>Logout</button>
                </div>
                : <Link to="/login">Login</Link>}
            </div>
        </div>
        
    )

}

const props = (state) => {
    return {
        user: state.user
    }
}

const dispatch = {
    setUser
}

const HeaderConnected = connect(
    props,
    dispatch
)(Header)

export default HeaderConnected