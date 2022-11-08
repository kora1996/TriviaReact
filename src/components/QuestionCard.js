import React from 'react';
import QuestionAnswer from './QuestionAnswer';

const QuestionCard = (props)=>{



    return( 
        <div className="questionCard">

            <h1>{JSON.stringify(props.question)}</h1>
            <hr />
            <div className="answers">
           <button className='btn'>{props.a1}</button>
            <button className='btn'>{props.a2}</button>
            <button className='btn'>{props.a3}</button>
            <button className='btn'>{props.a4}</button>

            </div>
        </div>
     )
}

export default QuestionCard