import axios from "axios"

const baseUrl = "http://localhost:3001/api/oinks"

let loginToken = null
const setLoginToken = (newToken) => {
    loginToken = `bearer ${newToken}`
}

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const newOink = async (object) => {
    const config = {
        headers: { Authorization: loginToken }
    }
    const res = await axios.post(baseUrl, object, config)
    return res.data
}

const likeOink = async (id) => {
    const config = {
        headers: { Authorization: loginToken }
    }
    const res = await axios.post(`${baseUrl}/like/${id}`, config)
    return res.data
}

export default {
    setLoginToken,
    getAll,
    newOink,
    likeOink
}