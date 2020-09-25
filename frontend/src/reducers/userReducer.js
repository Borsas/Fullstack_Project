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

const reducer = (state = [], action) => {
    switch(action.type){
        case "GET_USER":
            return action.data
        case "FOLLOW_USER":
            const userWhoFollowed = action.data.userWhoFollowed
            const followedUser = action.data.followedUser
            const user = state.find(u => u.id === followedUser.id)

            if (action.data.followed) {
                user.follower.push(userWhoFollowed)
            } else {
                const followers = user.follower.filter(i => i.id !== userWhoFollowed.id)
                user.follower = followers
            }
            return state.map(u => u.id !== u ? u : user )

        default:
            return state
    }
}

export default reducer