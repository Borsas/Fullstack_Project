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

export const followUser = (id) => {
    return async dispatch => {
        const data = await userService.followUser(id)
        dispatch({
            type: "FOLLOW_USER",
            data
        })
    }
}

// TODO Following broken
const reducer = (state = [], action) => {
    switch(action.type){
        case "GET_USER":
            return action.data
        case "FOLLOW_USER":
            const user = state.find(u => u.id === action.data.follower_id)
            if (!user.follower.includes(action.data.following_id)) {
                user.follower.push(action.data.following_id)
                return state.map(u => u.id !== user.id ? u : user)
            } else {
                user.follower.filter(u => u.id === action.data.following_id)
                return state.map(u => u.id !== user.id ? u : user)
            }
        default:
            return state
    }
}

export default reducer