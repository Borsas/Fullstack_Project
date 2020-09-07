import axios from "axios"

const baseUrl = "http://localhost:3001/api/oinks"

const getAll = async () => {
    const resp = await axios.get(baseUrl)
    return resp.data
}

const newOink = async (object) => {
    const resp = await axios.post(baseUrl, object)
    return resp.data
}

export default {
    getAll,
    newOink
}