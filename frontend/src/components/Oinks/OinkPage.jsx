import React from "react"
import { connect } from "react-redux"

import Oinks from "./Oinks"
import NewOink from "./NewOink"

const OinkPage = (props) => {

    return (
        <div>
            {props.user ? <NewOink/> : null}
            <Oinks oinks={props.oinks}/>
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