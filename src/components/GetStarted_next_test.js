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

    const [holder, setHolder]= React.useState([])
    const [currentBlock, setCurrentBlock] = React.useState([])

    // todo: for line 94 triviaItems, render each 5 blocks
    const [pageIndex, setPageIndex] = React.useState(1)


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
//             const cina = resp.data.results.map(=>i.question)
            

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

// ! nextQues func -----------------------------------------------------
        function nextQues(){
            setCurrentBlock(holder.splice(0,1))

        }
// ! nextQues func -----------------------------------------------------

    React.useEffect(()=>{
   async function getTriviaData(){
        try{
            setIsLoading(true)
            const resp = await axios.get("https://opentdb.com/api.php?amount=50")
        // setTriviaQuestions(resp.data.results)

// ! test array each 5 items -------------------------------------------------
            // const questions =[]
            // const ques = resp.data.results.map(i=>({value:i.question, id:nanoid()}))
            

            // // console.log(cina)

            // while(ques.length>=1){
            //     const fiveQues = [ques.splice(0,5)]
            //     questions.push(fiveQues)
            // }
            // // console.log(questions)

            // // ----------------------------------------

            // const answers = []
            // const ans = resp.data.results.map(i=>i.correct_answer)

            // while(ans.length>=1){
            //     const fiveAnswers = [ans.splice(0,5)]
            //     answers.push(fiveAnswers)
            // }
            // // console.log(answers)


            // // -------------------------------------------

            // const potentialAnswers = []
            // const poteAnswer = []

            // for (let index = 0; index < resp.data.results.length; index++) {
            //     const element = resp.data.results[index];
            //     const aBlockOfComAnss = await combineAllAnswers(element, element.correct_answer)
            //     const objectedBlock = aBlockOfComAnss.map(item=>({value:item, id:nanoid(), isSelected:false}))
            //     poteAnswer.push(objectedBlock)

            // }

            // while(poteAnswer.length>=1){
            //     const fivePoteAnswers = [poteAnswer.splice(0,5)]
            //     potentialAnswers.push(fivePoteAnswers)
            // }
            // // console.log(potentialAnswers)

// ! test array each 5 items ------------------------------------------------------------




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

        const blocks = []
        while(set.length>=1){
            const chunked = set.splice(0,5)
            blocks.push(chunked)
        }
        // const testy = set
        setHolder(blocks)
        setIsLoading(false)
    } catch(e){console.error(e)}
}
 getTriviaData()
 
}
,[])


        React.useEffect(()=>{
            nextQues()
        }
        ,[holder])
        // console.table(triviaBlock)

    //    console.log(correctAnswer) 

        const changeSelected = (e, id, quesID) =>{

                const testArr = []
                currentBlock.map(i=>{
                    for (let index = 0; index < i.length; index++) {
                        const element = i[index];
                        // console.log(i[0])
                        // console.log(element[0][0])
                        if (element[0].id===quesID) {
                            const deli = element[1].map(item=>item.id===id?{...item, isSelected:true}:{...item, isSelected:false})
                            testArr.push([element[0], deli])
                        }else{
                            testArr.push(element)
                        }
                        
                    }
                })
                setCurrentBlock([testArr])


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

        // console.log(triviaBlock[pageIndex])


        
        // const triviaItems = triviaBlock.map(item=>{ 
        //     const question = []
        //     const anss = []


        //         question.push(
        //             <h1 key={item[0].id} >{removeCharacters(item[0].value)}</h1>
        //         )

        //     item[1].map(ans=>
        //         {
        //         // const style = ans.isSelected?{backgroundColor:'purple'}:{backgroundColor:'greenyellow'}
        //         // const style = ans.isSelected? ans.correctAns? ans.isSelected&&ans.correctAns?
        //         // {backgroundColor:'gold'}:
        //         // {backgroundColor:'red'}:
        //         // {backgroundColor:'purple'}:
        //         // {backgroundColor:'greenyellow'};

        //         const style = 
        //         ans.correctAns&&ans.isSelected?{backgroundColor:'gold'}:
        //         ans.isSelected?{backgroundColor:'purple'}:
        //         ans.correctAns?{backgroundColor:'red'}:
        //         {backgroundColor:'greenyellow'}


        //         // const ansStyle = ans.correctAns&&{backgroundColor:'gold'}
        //         anss.push(<button key={ans.id} onClick={(e)=>changeSelected(e, ans.id, item[0].id)} className='btn' style={style}>{ans.value}</button>)
        //         }
        //         )
        //         const cardKey = nanoid()

        //         function removeCharacters(question) {
        //             return question.replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"");
        //           }

        //         return(
        //             <div key={cardKey} className="questionCard">
        //             {/* {removeCharacters(question)} */}
        //             {question}
        //             <hr />
        //             <div className="answers">
        //             {anss}
        //             </div>
        //             </div>
        //         )
        //  })

            // console.log(typeof(triviaBlock))
            // ! attempt with for loop----------------------------

            // console.log(holder)

            // const gogo = holder.splice(0,1)
            // console.log(gogo)

            // for (let index = 0; index < pageIndex; index++) {
            //     const element = triviaBlock.splice(0,1);
            //     // element.map(i=>console.log(i))
            //     console.log(element)
                
            // }
            // for (let index = 0; index < triviaBlock[0].length; index++) {
            //     const element = triviaBlock[0][index];
            //     console.log(element)
            // }
            // console.table(triviaBlock)
            // triviaBlock.map(i=>console.log( i[0]))
            // console.log(triviaBlock[0])
            
        const triviaItems = currentBlock.map(item=>{
            let c = item.map(i=>{

                const question = []
                const anss = []


                question.push(
                    <h1 key={i[0].id} >{removeCharacters(i[0].value)}</h1>
                )

            i[1].map(ans=>
                {
                
                const style = 
                ans.correctAns&&ans.isSelected?{backgroundColor:'gold'}:
                ans.isSelected?{backgroundColor:'purple'}:
                ans.correctAns?{backgroundColor:'red'}:
                {backgroundColor:'greenyellow'}


                // const ansStyle = ans.correctAns&&{backgroundColor:'gold'}
                anss.push(<button key={ans.id} onClick={(e)=>changeSelected(e, ans.id, i[0].id)} className='btn' style={style}>{ans.value}</button>)
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
            return c
         })
         // ! attempt with for loop----------------------------
         
         const checkAns = () =>{
             
             const finalForm = []
             currentBlock.map(item=>{
                 console.log(item.length)
                 
                for (let index = 0; index < item.length; index++) {
                    const element = item[index];
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

        })
            setCurrentBlock([ finalForm ])

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

