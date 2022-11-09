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
            
            set.push(
                [
                    element.question,
                    {
                        value:await combineAllAnswers(element, element.correct_answer),
                        id:nanoid(),
                        isSelected:false

                    }
                ]
            )
        }
        setTriviaBlock(set)
        setIsLoading(false)
    } catch(e){console.error(e)}
    }
        getTriviaData()

}
        ,[])

        console.log(triviaBlock)


    const triviaItems = triviaBlock.map((item)=>{
        return(

            <Trivia 
            key={item[1].id}
            triviaQuestions={item[0]}
            a1={item[1].value[0]}
            a2={item[1].value[1]}
            a3={item[1].value[2]}
            a4={item[1].value[3]}
            />
            )
    })



    return(
        <div className="getstarted">
            {triviaItems}
            {isLoading?<h1>Loading...</h1>:<button className='btn'>Check Answers</button>}
        </div>
    )
}

