import React, {useState} from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import { setUser } from "../reducers/loginReducer"
import loginService from "../services/login"
import oinkService from "../services/oinks"

const Login = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const loggedUser = await loginService.login({
                "username": username,
                "password": password
            })
            props.setUser(loggedUser)
            oinkService.setLoginToken(loggedUser.token)
            window.localStorage.setItem(
                "loggedInUser", JSON.stringify(loggedUser)
            )
            setUsername("")
            setPassword("")
        }catch (e) {
            console.log("Error loggin in", e)
        }
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
    setUser
}

const LoginConnected = connect(
    states,
    dispatch
)(Login)

export default LoginConnected