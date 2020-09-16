import userService from "../services/user"

export const getUser = () => {
    return async dispatch => {
        const data = await userService.getUser()
        dispatch({
            type: "GET_USER",
            data
        })
    }
}


const reducer = (state = [], action) => {
    switch(action.type){
        case "GET_USER":
            return action.data
        default:
            return state
    }
}

export default reducer