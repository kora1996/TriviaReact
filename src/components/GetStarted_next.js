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

    // todo: for line 94 triviaItems, render each 5 blocks
    const [index, setIndex] = React.useState(4)


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

    
//     React.useEffect(()=>{

//     async function getTriviaData(){
//         try{
//             setIsLoading(true)
//             const resp = await axios.get("https://opentdb.com/api.php?amount=50")
//         // setTriviaQuestions(resp.data.results)

// // ! test array each 5 items
//             const john =[]
//             const cina = resp.data.results.map(i=>i.question)
            

//             // console.log(cina)

//             while(cina.length>=1){
//                 const bob = [cina.splice(0,5)]
//                 john.push(bob)
//             }
//             console.log(john)



// // ! test array each 5 items

//         setCorrectAnswer(resp.data.results.map(result=>result.correct_answer))
//         const set = []
//         for (let index = 0; index < resp.data.results.length; index++) {
//             const element = resp.data.results[index];
//             const combinedAnswers = await combineAllAnswers(element, element.correct_answer)
//             const objectedAnswers =  combinedAnswers.map(item=>(
//                 { 
//                 value:item,
//                 id:nanoid(),
//                 isSelected:false
//                 }
//             ))
//             // setAllPossibleAnswers(prevState=>[...prevState, objectedAnswers])
//             const question = {value:element.question, id:nanoid()}
//             set.push(
//                 [
//                     question,
//                     objectedAnswers 
//                 ]
//             )
//         }
//         setTriviaBlock(set)
//         setIsLoading(false)
//     } catch(e){console.error(e)}
// }
// getTriviaData()

// }
//         ,[])


    React.useEffect(()=>{
   async function getTriviaData(){
        try{
            setIsLoading(true)
            const resp = await axios.get("https://opentdb.com/api.php?amount=50")
        // setTriviaQuestions(resp.data.results)

// ! test array each 5 items
            const john =[]
            const cina = resp.data.results.map(i=>i.question)
            

            // console.log(cina)

            while(cina.length>=1){
                const bob = [cina.splice(0,5)]
                john.push(bob)
            }
            console.log(john)



// ! test array each 5 items

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


        // console.table(triviaBlock)

    //    console.log(correctAnswer) 

        const changeSelected = (e, id, quesID) =>{
            // console.log(quesID)

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

        // function* createChunkGenerator(
        //     itemList, chunkSize=1, chunkCount=0
        // ){
        //     chunkSize = Math.max(chunkSize, 1);

        //     while (itemList.length >= 1){
        //         ++chunkCount
        //         yield{
        //             chunkCount,
        //             itemList: itemList.splice(0, chunkSize)
        //         }
        //     }
        // }


        
        const triviaItems = triviaBlock.map(item=>{ 
            const question = []
            const anss = []


                question.push(
                    <h1 key={item[0].id} >{removeCharacters(item[0].value)}</h1>
                )

            item[1].map(ans=>
                {
                // const style = ans.isSelected?{backgroundColor:'purple'}:{backgroundColor:'greenyellow'}
                // const style = ans.isSelected? ans.correctAns? ans.isSelected&&ans.correctAns?
                // {backgroundColor:'gold'}:
                // {backgroundColor:'red'}:
                // {backgroundColor:'purple'}:
                // {backgroundColor:'greenyellow'};

                const style = 
                ans.correctAns&&ans.isSelected?{backgroundColor:'gold'}:
                ans.isSelected?{backgroundColor:'purple'}:
                ans.correctAns?{backgroundColor:'red'}:
                {backgroundColor:'greenyellow'}


                // const ansStyle = ans.correctAns&&{backgroundColor:'gold'}
                anss.push(<button key={ans.id} onClick={(e)=>changeSelected(e, ans.id, item[0].id)} className='btn' style={style}>{ans.value}</button>)
                }
                )
                const cardKey = nanoid()

                function removeCharacters(question) {
                    return question.replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"");
                  }

                return(
                    <div key={cardKey} className="questionCard">
                    {/* {removeCharacters(question)} */}
                    {question}
                    <hr />
                    <div className="answers">
                    {anss}
                    </div>
                    </div>
                )
         })

         const checkAns = () =>{

            const finalForm = []

            for (let index = 0; index < triviaBlock.length; index++) {
                const element = triviaBlock[index];
                const correctAns = correctAnswer[index]

                // element[1].map(hi=>console.log(typeof(hi.value)))
                // console.log(typeof(correctAns))
                // element[1].map(hi=>console.log(hi.value))
                // console.log(correctAns)

                const test = element[1].map(ans=>ans.value===correctAns?{...ans, correctAns:true}:{...ans})
                finalForm.push([ element[0], test ])
                // console.log(test)

                //todo: find value by string and add correct:true
            }

            setTriviaBlock(finalForm)

        }
        // console.log(triviaBlock)

        const restart = async() =>{
            setTriviaBlock([])
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
        

    return(
        <div className="getstarted">
            {triviaItems}

            {isLoading?<h1>Loading...</h1>:
            <div className='bottom-buttons'>
                <button className='btn' onClick={checkAns}>Check Answers</button>
                <button className='btn' onClick={restart}>Re-start</button>
            </div>}
        </div>
    )
}

