import oinkService from "../services/oinks"

export const newOink = (object) => {
    return async dispatch => {
        try {
            const data = await oinkService.newOink(object)
            dispatch({
                type: "NEW_OINK",
                data
            })
        } catch(err) {
            console.log(err)
        }
    }
}

export const getOinks = () => {
    return async dispatch => {
        const oinks = await oinkService.getAll()
        dispatch({
            type: "SET_OINKS",
            data: oinks
        })
    }
}

export const likeOink = (id) => {
    return async dispatch => {
        const liked = await oinkService.likeOink(id)
        dispatch({
            type: "LIKED_OINK",
            data: liked
        })
    }
}


const reducer = (state = [], action) => {
    switch(action.type){
        case "GET_TWEETS":
            return state
        case "SET_OINKS":
            return action.data
        case "NEW_OINK":
            return [...state, action.data]
        case "LIKED_OINK":
            const updated = state.find(o => o.id === action.data.id)
            updated.likes = action.data.likes

            return state.map(oink => oink.id !== updated.id ? oink : updated)
        default:
            return state
    }
}

export default reducer