import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { setLoginUser } from "../../reducers/loginReducer"
import OinkService from "../../services/oinks"

const Header = (props) => {

    const logout = () => {
        props.setLoginUser(null)
        window.localStorage.removeItem("loggedInUser")
        OinkService.setLoginToken(null)
    }

    return (
        <div style={{position: "sticky", top: "0"}}>
            <Link to="/"> <h1>Oinker</h1> </Link>

            <div>
                {props.login ? 
                <div> 
                    Logged in as <b>{props.login.username}</b>
                    <button onClick={logout}>Logout</button>
                </div>
                : 
                <div> 
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
                }
            </div>
        </div>
        
    )

}

const props = (state) => {
    return {
        login: state.login
    }
}

const dispatch = {
    setLoginUser
}

const HeaderConnected = connect(
    props,
    dispatch
)(Header)

export default HeaderConnected