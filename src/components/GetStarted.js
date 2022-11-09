import React from 'react';
import axios from 'axios';
import Trivia from './Trivia';
import { nanoid } from 'nanoid';

export default function GetStarted(){

    const [triviaQuestions, setTriviaQuestions] = React.useState([])
    const [correctAnswer, setCorrectAnswer] = React.useState('')
    const [allPossibleAnswers, setAllPossibleAnswers] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [triviaBlock, setTriviaBlock] = React.useState([])

    async function combineAllAnswers(incorrectAnswers, correctAnswer){
        const allAnswers = []
            incorrectAnswers.incorrect_answers.map((incorrectAnswer)=>{
                allAnswers.push(incorrectAnswer)
            })
        allAnswers.push(correctAnswer)

        allAnswers.sort(()=>Math.random()-0.5)
        // setAllPossibleAnswers(allAnswers)
        return allAnswers
    }

    
    React.useEffect(()=>{

    async function getTriviaData(){
        try{
            setIsLoading(true)
            const resp = await axios.get("https://opentdb.com/api.php?amount=5")
        // setTriviaQuestions(resp.data.results)
        setCorrectAnswer(resp.data.results[0].correct_answer)
        const set = []
        for (let index = 0; index < resp.data.results.length; index++) {
            const element = resp.data.results[index];
            const combinedAnswers = await combineAllAnswers(element, element.correct_answer)
            const objectedAnswers =  combinedAnswers.map(item=>(
                { 
                value:item,
                id:nanoid(),
                isSelected:false
                }
            ))
            
            set.push(
                [
                    element.question,
                    objectedAnswers 
                ]
            )
        }
        setTriviaBlock(set)
        setIsLoading(false)
    } catch(e){console.error(e)}
}
getTriviaData()
// console.log(triviaBlock[0])

}
        ,[])

        // console.table(triviaBlock)

        const triviaItems = triviaBlock.map(item=>{ 
            console.log(item[0])
            const anss = []
            item[1].map(ans=>
                // console.log(ans.value),
                anss.push(<button className='btn'>{ans.value}</button>)
                )
                return(
                    <div className="questionCard">

                    <h1>{item[0]}</h1>
                    <hr />
                    <div className="answers">
                    {anss}
                    </div>
                    </div>
                )
         })

    // const triviaItems = triviaBlock.map((item)=>{
    //     return(

    //         <Trivia 
    //         key={item[1].id}
    //         triviaQuestions={item[0]}
    //         a1={item[1][0].value}
    //         a2={item[1][1].value}
    //         a3={item[1][2].value}
    //         a4={item[1][3].value}
    //         />
    //         )
    // })



    return(
        <div className="getstarted">
            {triviaItems}
            {/* <h1>{triviaBlock[0][0]}</h1>
            <hr />
            <button>{triviaBlock[0][1][0].value}</button> */}
            {isLoading?<h1>Loading...</h1>:<button className='btn'>Check Answers</button>}
        </div>
    )
}

