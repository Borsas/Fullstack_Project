import React, {useState} from "react"
import { connect } from "react-redux"
import { newTweet } from "../../reducers/tweetsReducer"


const NewTweet = (props) => {
    const [content, setContent] = useState("")

    const handleNewTweet = (e) => {
        e.preventDefault()
        props.newTweet({user: props.user.username, name: props.user.name, content, likes: 0})
        setContent("")
    }
    
    return (
        <div>
            <h4>
                Type up a new tweet!
            </h4>

            <form onSubmit={handleNewTweet}>
                <div>
                    Tweet: <input value={content} onChange={({target}) => setContent(target.value)} />
                </div>
                <button type="submit">Tweet!</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        tweets: state.tweets,
        user: state.user
    }
  }

const mapDispatchProps = {
    newTweet
}


const NewTweetConnected = connect(
    mapStateToProps,
    mapDispatchProps
)(NewTweet)

export default NewTweetConnected