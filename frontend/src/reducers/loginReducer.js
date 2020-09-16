import oinkService from "../services/oinks"

export const getLoginUser = () => {
    return async dispatch => {
        dispatch({
            type: "GET_USER"
        })
    }
}

export const setLoginUser = (data) => {
    return async dispatch => {
        if (data !== null){
            await oinkService.setLoginToken(data.token)
        } 
        dispatch({
            type: "SET_USER",
            data
        })
    }
}


const reducer = (state = null, action) => {
    switch(action.type){
        case "GET_USER":
            return state
        case "SET_USER":
            return action.data
        default:
            return state
    }
}

export default reducer