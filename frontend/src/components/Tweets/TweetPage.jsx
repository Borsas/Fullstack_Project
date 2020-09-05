import React from "react"
import { connect } from "react-redux"

import Tweet from "./Tweet"
import NewTweet from "./NewTweet"

const TweetPage = (props) => {

    return (
        <div>
            {props.user ? <NewTweet/> : null}
            <div>
                {props.tweets.map(tweet => {
                    return <Tweet key={tweet.user}
                    user={tweet.user}
                    name={tweet.name}
                    likes={tweet.likes}
                    content={tweet.content}
                    date={tweet.date} />
                })}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        tweets: state.tweets,
        user: state.user
    }
  }


const TweetPageConnected = connect(
    mapStateToProps,
    null
)(TweetPage)

export default TweetPageConnected