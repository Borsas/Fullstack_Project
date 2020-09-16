import React from "react"
import Oink from "./Oink"

const Oinks = (props) => {
    return (
        <div>
            {props.oinks.sort((a, b) => {
                return b.date - a.date
            }).map(oink => {
                return <Oink key={oink.id}
                    id={oink.id}
                    user={oink.user.username}
                    name={oink.user.name}
                    userId={oink.user.id}
                    likes={oink.likes}
                    content={oink.content}
                    date={oink.date} />
            })}
        </div>
    )
}

export default Oinks