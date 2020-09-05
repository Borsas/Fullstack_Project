import React, {useState} from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import { userLogin } from "../reducers/loginReducer"

const Login = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = (e) => {
        e.preventDefault()
        props.userLogin(username)
        setUsername("")
        setPassword("")
    }

    if (props.user) {
        return <Redirect to="/"/>
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    Username: <input
                    value={username}
                    onChange={({target}) => setUsername(target.value)}/>
                </div>
                <div>
                    Password: <input
                    type="password"
                    value={password}
                    onChange={({target}) => setPassword(target.value)}/>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>

    )
}

const states = (state) => {
    return {
        user: state.user
    }
}

const dispatch = {
    userLogin
}

const LoginConnected = connect(
    states,
    dispatch
)(Login)

export default LoginConnected