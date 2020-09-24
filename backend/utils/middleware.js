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
    console.log(error)
    if (error.name === "JsonWebTokenError"){
        return resp.status(401).send({ error: "Invalid or missing token" })
    } else if (error.name === "SequelizeDatabaseError") {
        return resp.status(401).send({error: "Invalid query"})
    } else if (error.name === "SequelizeConnectionRefusedError") {
        return resp.status(500).send({error: "Could not connect to database"})
    }
    next(error)
}

module.exports = {
    getAuthToken,
    handleErrors
}