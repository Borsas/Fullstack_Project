import axios from "axios"

const baseUrl = "http://localhost:3001/api/login"

const login = async (user) => {
    const res = await axios.post(baseUrl, user)
    return res.data
}

const register = async (user) => {
    const res = await axios.post(`${baseUrl}/register`, user)
    return res.data
}

export default {
    login,
    register
}
