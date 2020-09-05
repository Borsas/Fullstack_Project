import React from "react"

const Tweet = ({user, name, likes, content, date}) => {
    return (
        <div>
            <div>
                <b>{name}</b> @{user}
            </div>
            <div>
                {content} at {date}
            </div>
            <div>
                <i>Likes {likes}</i>
            </div>
        </div>

    )
}

export default Tweet