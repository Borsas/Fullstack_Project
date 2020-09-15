import React from "react"
import { connect } from "react-redux"

import { likeOink } from "../../reducers/oinksReducer"

const Oink = (props) => {
    const parsedDate = new Date(props.date * 1000).toLocaleString('en-GB', { hour12:false})

    const handleLike = (e) => {
        e.preventDefault()
        props.likeOink(props.id)
    }

    return (
        <div>
            <div>
                <b>{props.name}</b> @{props.user}
            </div>
            <div>
                {props.content} at {parsedDate}
            </div>
            <div>
                <i>Likes {props.likes}</i> <button onClick={(e) => {handleLike(e)}}>👍</button>
            </div>
        </div>

    )
}

const mapDispatchProps = {
    likeOink
}

const Tweet = connect(
    null,
    mapDispatchProps
)(Oink)

export default Tweet