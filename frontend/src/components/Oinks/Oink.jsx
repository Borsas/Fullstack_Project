import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

import { likeOink } from "../../reducers/oinksReducer"

const Oink = (props) => {
    const parsedDate = new Date(props.date * 1000).toLocaleString('en-GB', { hour12:false})
    const linkToProfile = `/profile/${props.user}`
    const style = {
        border: "solid", 
        borderWidth: "1px", 
        borderRadius: "5px",
        padding: "5px", 
        margin: "2px"
    }

    const handleLike = (e) => {
        e.preventDefault()
        if (props.login){
            props.likeOink(props.id)
        }
    }

    return (
        <div style={style}>
            <div>
                <Link to={linkToProfile}><b>{props.name}</b> @{props.user}</Link>
            </div>
            <div>
                {props.content}
            </div>
            <div>
                {parsedDate}
            </div>
            <div>
                <i>Likes {props.likes}</i>
                {props.login ? 
                <button onClick={(e) => {handleLike(e)}}><span role="img">👍</span></button> : null}   
            </div>
        </div>

    )
}

const mapDispatchProps = {
    likeOink
}

const props = (state) => {
    return {
        login: state.login
    }
}

const Tweet = connect(
    props,
    mapDispatchProps
)(Oink)

export default Tweet