const getAuthToken = (req, res, next) => {
    const auth = req.get("authorization")
    if (auth && auth.toLowerCase().startsWith("bearer")){
        req.token = auth.substring(7)
    } else {
        req.token = null
    }
    next()
}

const handleErrors = (error, req, resp, next) => {
    if (error.name === "JsonWebTokenError"){
        return resp.status(401).send({ error: "Invalid or missing token" })
    }
    next(error)
}

module.exports = {
    getAuthToken,
    handleErrors
}