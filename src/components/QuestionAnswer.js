import React from 'react';


export default function QuestionAnswer(props){

    return(
        <div className="answer">
            <button className="btn">{props.allPossibleAnswers}</button>
        </div>
    )
}