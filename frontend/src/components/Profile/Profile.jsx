import React from "react"
import { connect } from "react-redux"
import Oinks from "../Oinks/Oinks"

const Profile = (props) => {
    const profile = props.profile

    if (!profile) {
        return (
            <div>
                Loading....
            </div>
        )
    }
    const oinks = props.oinks.filter(o => o.user.id === profile.id)

    const handleFollow = (e) => {
        e.preventDefault()
        if (props.login){
            
        }
    }

    return (
        <div>
            <div style={{marginBottom: "5px", marginTop: "8px"}}>
                <div>
                    <b>{profile.name}</b>
                </div>
                <div>
                    <i>@{profile.username}</i>
                </div>
            </div>

            <div style={{display: "inline-flex", padding: "2px"}}>
                {profile.follower.length} Following
            </div>
            <div style={{display: "inline-flex", padding: "2px"}}>
                {profile.follower.length} Followers
            </div>
            <div>
                <button onClick={handleFollow}>Follow</button>
            </div>
            <Oinks oinks={oinks}/>
        </div>
    )
}

const dispatch = {
    
}

const props = (state) => {
    return {
        oinks: state.oinks,
        login: state.oinks
    }
}

export default connect(
    props,
    dispatch
)(Profile)