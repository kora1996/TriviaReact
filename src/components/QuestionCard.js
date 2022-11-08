import React from 'react';
import axios from 'axios';
import QuestionAnswer from './QuestionAnswer';

const QuestionCard = (props)=>{


    // console.log(props.triviaQuestions[0].category)
    
    // let hi = getTriviaData()
    // console.log(hi)

    // const answer
    // console.log(props.trivia)

    // const q = JSON.parse(props.trivia)

    // console.log(q[0].question)
    // console.log(props.trivia[0])

    // const yo = JSON.stringify(props.trivia[0])

    // yo.map((tri)=>{
    //     console.log(tri)
    // })
    // console.log(props.allPossibleAnswers)

    // const answers = props.allPossibleAnswers
    // console.log(answers)
    // console.log(props.allPossibleAnswers[0])

    // const test = answers.map((item)=>{
    //     return <button>item</button>
    // })
    // props.allPossibleAnswers.map((item)=>{console.log(item)})

    return( 
        <div className="questionCard">

            <h1>{JSON.stringify(props.question)}</h1>
            <hr />
            <div className="answers">
            {/* <button className='btn'>potential answers come here</button> */}
            <button>{props.a1}</button>
            <button>{props.a2}</button>
            <QuestionAnswer allPossibleAnswers={props.allPossibleAnswers} />
            <button>potential answers come here</button>
            <button>potential answers come here</button>

            {/* {answers.map((answer)=>{
                return <button>{answer}</button>
            })} */}

            </div>
        </div>
     )
}

export default QuestionCard