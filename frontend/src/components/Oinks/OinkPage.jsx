import React from "react"
import { connect } from "react-redux"

import Oink from "./Oink"
import NewOink from "./NewOink"

const OinkPage = (props) => {

    return (
        <div>
            {props.user ? <NewOink/> : null}
            <div>
                {props.oinks.sort((a, b) => {
                    return b.date - a.date
                }).map(oink => {
                    return <Oink key={oink.id}
                        id={oink.id}
                        user={oink.user.username}
                        name={oink.user.name}
                        likes={oink.likes}
                        content={oink.content}
                        date={oink.date} />
                })}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        oinks: state.oinks,
        user: state.user
    }
  }


const OinkPageConnected = connect(
    mapStateToProps,
    null
)(OinkPage)

export default OinkPageConnected