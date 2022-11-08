import './css/style.css';
import React from 'react';
import axios from 'axios';
import Start from './components/Start';
import Trivia from './components/Trivia';

export default function App(){

    const [start, setStart] = React.useState(false)
    const [triviaQuestions, setTriviaQuestions] = React.useState([])
    const [correctAnswer, setCorrectAnswer] = React.useState('')
    const [allPossibleAnswers, setAllPossibleAnswers] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)

    async function combineAllAnswers(incorrectAnswers, correctAnswer){
        const allAnswers = []
            incorrectAnswers.incorrect_answers.map((incorrectAnswer)=>{
                allAnswers.push(incorrectAnswer)
            })
        allAnswers.push(correctAnswer)

        allAnswers.sort(()=>Math.random()-0.5)
        setAllPossibleAnswers(allAnswers)
    }

    
    React.useEffect(()=>{
    
    async function getTriviaData(){
        try{
            const resp = await axios.get("https://opentdb.com/api.php?amount=5")
        setTriviaQuestions(resp.data.results)
        setCorrectAnswer(resp.data.results[0].correct_answer)
        console.log(resp.data.results[0])
        await combineAllAnswers(resp.data.results[0], resp.data.results[0].correct_answer)
    } catch(e){console.error(e)}
    }
        getTriviaData()
}
        ,[])

        console.log(allPossibleAnswers)
        console.log(correctAnswer)

    // console.log(triviaQuestions[0].correct_answer)
  const getStarted = ()=>{
    setStart(true)
  }


    allPossibleAnswers.map((item)=>{console.log(item)})



    return(
        <div className="app">
            <header>
                <h2>Trivia Pond</h2>
            </header>
            {start?<Trivia triviaQuestions={triviaQuestions[0].question} 
            // allPossibleAnswers={allPossibleAnswers}
            a1={allPossibleAnswers[0]}
            a2={allPossibleAnswers[1]}
            />
            :<Start getStarted={getStarted} />}
        </div>
    )
}
