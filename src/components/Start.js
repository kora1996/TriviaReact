import React from 'react';

 const Start = (props)=>{

    return(
        <div className="start">
            <h1>Trivia Pond</h1>
            <p>Let's check your Trivia!</p>
            <button onClick={props.getStarted}>Start Trivia</button>
        </div>
    )
}

export default Start