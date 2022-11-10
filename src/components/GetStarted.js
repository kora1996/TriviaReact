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
            setAllPossibleAnswers(prevState=>[...prevState, objectedAnswers])
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
// console.log(triviaBlock[0])

}
        ,[])

        // console.table(allPossibleAnswers)
        console.table(triviaBlock)

        
        const changeSelected = (e, id, quesID) =>{
            console.log(quesID)

            // let hiyo = triviaBlock.filter(item=>item[0].id===quesID)
            // console.log(hiyo)
            // console.log(hiyo[0])
            // console.log(hiyo[0][1])

            // hiyo = hiyo[0][1].map(item=>({...item, isSelected:true}))

            // console.log(hiyo)


            // const getAnsws = (item) => {
            //     item[0].id===quesID
            //     return item[0][1]
            // }

            // setTriviaBlock(prevTriv=>prevTriv.find(item=>item[0].id===quesID).map(item=>console.log(item)))

            // triviaBlock.filter(item=>item[0].id===quesID).map(item=>console.log(item[1]))
            // triviaBlock.filter(item=>item[0].id===quesID).map(item=>item[1].map(ans=>console.log(ans.value)))

            // setTriviaBlock(prevTriv=> 
            //     prevTriv.map(blocks=>{
            //         blocks.filter(item=>item[0].id===quesID)?
            //         blocks.filter(item=>item[0].id===quesID).map(item=>item[1].map(ans=>console.log(ans.value))):
            //         {...blocks}
            //     })
            //     )

            // setTriviaBlock(prevState=>{
            //     for (let index = 0; index < prevState.length; index++) {
            //         const element = prevState[index];
            //         if (element[0].id!==quesID) {
            //             return {...element}
            //         }else{

            //         }
                    
            //     }

            //     }
            // )
                const testArr = []
                for (let index = 0; index < triviaBlock.length; index++) {
                    const element = triviaBlock[index];
                    if (element[0].id===quesID) {
                        // console.log(element[1])
                        const deli = element[1].map(item=>item.id===id?{...item, isSelected:true}:{...item, isSelected:false})
                        // testArr.push(element[1].map(item=>item.id===id?{...item, isSelected:true}:{item}))
                        testArr.push([element[0], deli])
                        // console.log(deli)
                    }else{
                        testArr.push(element)
                        // console.log(element)
                    }

                }
                setTriviaBlock(testArr)

                // console.table(testArr)

                // setTriviaBlock(
                //     prevState=>{

                //         for (let index = 0; index < prevState.length; index++) {
                //             const element = prevState[index];
                //             if (element[0].id===quesID) {
                //                 // console.log(element[1])
                //                 const deli = element[1].map(item=>item.id===id?{...item, isSelected:true}:{item})
                //                 // console.log(deli)
                //                 return [element[0], deli]
                //             }else{
                //                return element
                //             }
        
                //         }
                //     }
                // )

            

            // triviaBlock.find(item=>item[0].id===quesID).map(item=>console.log(item[0]))

            // triviaBlock.find(item=>item[0].id===quesID).map(item=>item.map(ans=>console.log(ans)))

            // console.log(gee)

            // setTriviaBlock(prevTri=>prevTri.filter())
            // console.log(triviaBlock.filter(item=>item.id===quesID))
            // console.log(id)
            // add map func
            // setAllPossibleAnswers(prevState=>prevState.map(set=>{
            // allPossibleAnswers.map(set=>{
            //     // console.log(set)
            //     set.map(ans=>
            //         // ans.id===id?{...prevState, isSelected:true}:{...prevState, isSelected:false}
            //         ans.id===id?console.log(ans.id):console.log('nope')
            //         // ans.id===id&&console.log(ans.id)
            //         // console.log(ans.id)
            //         )}
            //         )
            // )
            }

        
        
        const triviaItems = triviaBlock.map(item=>{ 
            const question = []
            const anss = []


                question.push(
                    <h1 key={item[0].id} >{item[0].value}</h1>
                    // <h1 key={item[0].id} onClick={(e)=>changeSelected(e,item[0].id)}>{item[0].value}</h1>
                )

            item[1].map(ans=>
                {
                const style = ans.isSelected?{backgroundColor:'purple'}:{backgroundColor:'greenyellow'}
                // console.log(ans.value),
                anss.push(<button key={ans.id} onClick={(e)=>changeSelected(e, ans.id, item[0].id)} className='btn' style={style}>{ans.value}</button>)
                }
                )
                const cardKey = nanoid()
                return(
                    <div key={cardKey} className="questionCard">
                    {/* <div key={cardKey} onClick={()=>console.log(item[0].id)} className="questionCard"> */}

                    {/* <h1 onClick={(e)=>changeSelected(e,questionID)} key={questionID}>{item[0]}</h1> */}
                    {/* <h1 onClick={(e)=>changeSelected(e,questionID)} key={questionID}>{item[0]}</h1> */}
                    {question}
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

