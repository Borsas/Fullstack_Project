import React, {useState} from "react"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"

import { setUser } from "../reducers/loginReducer"
import loginService from "../services/login"
import oinkService from "../services/oinks"

const Register = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const loggedUser = await loginService.register({
                "username": username,
                "password": password,
                "name": name
            })
            props.setUser(loggedUser)
            oinkService.setLoginToken(loggedUser.token)
            window.localStorage.setItem(
                "loggedInUser", JSON.stringify(loggedUser)
            )
            setUsername("")
            setPassword("")
            setName("")
        }catch (e) {
            console.log("Error registering", e)
        }
    }

    if (props.user) {
        return <Redirect to="/"/>
    }

    return (
        <div>
            <form onSubmit={handleRegister}>
                <div>
                    Username: <input
                    value={username}
                    onChange={({target}) => setUsername(target.value)}/>
                </div>
                <div>
                    Name: <input
                    value={name}
                    onChange={({target}) => setName(target.value)}/>
                </div>
                <div>
                    Password: <input
                    type="password"
                    value={password}
                    onChange={({target}) => setPassword(target.value)}/>
                </div>
                <button type="submit">Register</button>
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

const RegisterConnected = connect(
    states,
    dispatch
)(Register)

export default RegisterConnected