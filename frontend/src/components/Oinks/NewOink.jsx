import React, {useState} from "react"
import { connect } from "react-redux"
import { newOink } from "../../reducers/oinksReducer"


const NewOink = (props) => {
    const [content, setContent] = useState("")

    const handleNewOink = (e) => {
        e.preventDefault()
        props.newOink({user: props.user.username, name: props.user.name, content, likes: 0})
        setContent("")
    }
    
    return (
        <div>
            <h4>
                Type up a new Oink!
            </h4>

            <form onSubmit={handleNewOink}>
                <div>
                    Oink: <input value={content} onChange={({target}) => setContent(target.value)} />
                </div>
                <button type="submit">Oink!</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        oinks: state.oinks,
        user: state.user
    }
  }

const mapDispatchProps = {
    newOink
}


const NewOinkConnected = connect(
    mapStateToProps,
    mapDispatchProps
)(NewOink)

export default NewOinkConnected