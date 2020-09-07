import oinkService from "../services/oinks"

export const newTweet = (object) => {
    return async dispatch => {
        try {
            const data = await oinkService.newOink(object)
            console.log(object)
            dispatch({
                type: "NEW_TWEET",
                object
            })
        } catch(err) {
            console.log(err)
        }
    }
}

export const getTweets = () => {
    return async dispatch => {
        const oinks = await oinkService.getAll()
        dispatch({
            type: "SET_OINKS",
            data: oinks
        })
    }
}

// Replace with a connection to DB
const mockData = [
    {
        "user": "Borsas",
        "name": "Borsas mcPig",
        "content": "This is really epic!",
        "date": "2020-09-05",
        "likes": 0
    },
    {
        "user": "Possu",
        "name": "Possu possunen",
        "content": "My first tweet!!",
        "date": "2018-02-01",
        "likes": 0
    },
]

const reducer = (state = [], action) => {
    switch(action.type){
        case "GET_TWEETS":
            return state
        case "SET_OINKS":
            return action.data
        case "NEW_TWEET":
            return [...state, action.data]
        default:
            return state
    }
}

export default reducer