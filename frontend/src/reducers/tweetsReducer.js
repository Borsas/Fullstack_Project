export const getTweets = () => {
    return async dispatch => {
        dispatch({
            type: "GET_TWEETS"
        })
    }
}

export const newTweet = (data) => {
    return async dispatch => {
        dispatch({
            type: "NEW_TWEET",
            data
        })
    }
}

// Replace with a connection to DB
const mockData = [
    {
        "user": "Borsas",
        "content": "This is really epic!",
        "date": "2020-09-05"
    },
    {
        "user": "Possu",
        "content": "My first tweet!!",
        "date": "2018-02-01"
    },
]

const reducer = (state = mockData, action) => {
    switch(action.type){
        case "GET_TWEETS":
            return state
        case "NEW_TWEET":
            const newTweet = {...action.data, date: "2020-09-05"}
            return [...state, newTweet]
        default:
            return state
    }
}

export default reducer