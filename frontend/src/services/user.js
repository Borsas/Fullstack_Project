import axios from "axios"

const baseUrl = "http://localhost:3001/api/user"

const getUser = async () => {
    const res = await axios.get(`${baseUrl}`)
    return res.data
}

export default {
    getUser
}