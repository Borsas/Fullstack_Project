export const getUser = () => {
    return async dispatch => {
        dispatch({
            type: "GET_USER"
        })
    }
}

export const userLogin = (data) => {
    return async dispatch => {
        dispatch({
            type: "USER_LOGIN",
            data
        })
    }
}

// Replace with a connection to DB
const mockData = null

const reducer = (state = mockData, action) => {
    switch(action.type){
        case "GET_USER":
            return state
        case "USER_LOGIN":
            return {username: action.data, name:"Mr. Stockname"}
        default:
            return state
    }
}

export default reducer