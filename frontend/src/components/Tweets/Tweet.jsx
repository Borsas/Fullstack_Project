import React from "react"

const Tweet = ({user, content, date}) => {
    return (
        <div>
            <div>
                {user} @{user}
            </div>
            <div>
                {content} at {date}
            </div>
        </div>

    )
}

export default Tweet