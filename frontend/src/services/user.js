import axios from "axios"
import tokenservice from "./oinks"

const baseUrl = "http://localhost:3001/api/user"

const getUser = async () => {
    const res = await axios.get(`${baseUrl}`)
    return res.data
}

// Gets the login token from the oinks service, i need to rework this lol
const followUser = async (id) => {
    const config = {
        headers: { Authorization: tokenservice.getLoginToken() }
    }
    const res = await axios.post(`${baseUrl}/follow/${id}`,null, config)
    return res.data
}

export default {
    getUser,
    followUser
}