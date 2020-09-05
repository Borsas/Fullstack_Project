import React, {useState} from "react"
import { connect } from "react-redux"
import { newTweet } from "../../reducers/tweetsReducer"


const NewTweet = (props) => {
    const [user, setuser] = useState("")
    const [content, setContent] = useState("")


    const handleNewTweet = (e) => {
        e.preventDefault()
        props.newTweet({user, content})
        setContent("")
        setuser("")

    }
    
    return (
        <div>
            <h4>
                Type up a new tweet!
            </h4>

            <form onSubmit={handleNewTweet}>
                <div>
                    Username: <input value={user} onChange={({target}) => setuser(target.value)} />
                </div>
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
        tweets: state.tweets
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