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
        setCorrectAnswer(resp.data.results.map(result=>result.correct_answer))
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
            // setAllPossibleAnswers(prevState=>[...prevState, objectedAnswers])
            const question = {value:element.question, id:nanoid()}
            set.push(
                [
                    question,
                    objectedAnswers 
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

        console.table(triviaBlock)

       console.log(correctAnswer) 
        const changeSelected = (e, id, quesID) =>{
            console.log(quesID)

                const testArr = []
                for (let index = 0; index < triviaBlock.length; index++) {
                    const element = triviaBlock[index];
                    if (element[0].id===quesID) {
                        const deli = element[1].map(item=>item.id===id?{...item, isSelected:true}:{...item, isSelected:false})
                        testArr.push([element[0], deli])
                    }else{
                        testArr.push(element)
                    }

                }
                setTriviaBlock(testArr)


            }

        
        
        const triviaItems = triviaBlock.map(item=>{ 
            const question = []
            const anss = []


                question.push(
                    <h1 key={item[0].id} >{item[0].value}</h1>
                )

            item[1].map(ans=>
                {
                const style = ans.isSelected?{backgroundColor:'purple'}:{backgroundColor:'greenyellow'}
                anss.push(<button key={ans.id} onClick={(e)=>changeSelected(e, ans.id, item[0].id)} className='btn' style={style}>{ans.value}</button>)
                }
                )
                const cardKey = nanoid()
                return(
                    <div key={cardKey} className="questionCard">
                    {question}
                    <hr />
                    <div className="answers">
                    {anss}
                    </div>
                    </div>
                )
         })

    return(
        <div className="getstarted">
            {triviaItems}
            {isLoading?<h1>Loading...</h1>:<button className='btn'>Check Answers</button>}
        </div>
    )
}

