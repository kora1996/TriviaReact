import React from 'react';
import axios from 'axios';
import Trivia from './Trivia';
import { nanoid } from 'nanoid';
import FinishPage from './Finish';
import { TranslatorCorrectAns, Translator , TranslatorPlane} from './TranslatorTest';

export default function GetStarted(props){


    const gs = document.getElementById("getstarted");

    const [resultPage, setResultPage] = React.useState(false)
    const [triviaQuestions, setTriviaQuestions] = React.useState([])

    const [CAHolder, setCAHolder] = React.useState([])
    const [correctAnswer, setCorrectAnswer] = React.useState('')
    const [currentAnsBlock, setCurrentAnsBlock] = React.useState('')


    const [score, setScore]=React.useState(0)

    const [allPossibleAnswers, setAllPossibleAnswers] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [triviaBlock, setTriviaBlock] = React.useState([])

    const [holder, setHolder]= React.useState([])
    const [traHolder, setTraHolder]= React.useState([])
    const [currentBlock, setCurrentBlock] = React.useState([])
    const [life, setLife] = React.useState(10)
    const [answered, setAnswered] = React.useState(false)
    const [done, setDone] = React.useState(false)

    const [round, setRound]= React.useState(0)

    const [bestScore, setBestScore] = React.useState(JSON.parse(localStorage.getItem('bestScore'))||null)

    const [newBest, setNewBest] = React.useState(false)

    const [king, setKing] = React.useState(false)
    // todo: for line 94 triviaItems, render each 5 blocks
    const [pageIndex, setPageIndex] = React.useState(1)

    const [traLoading, setTraLoading] = React.useState(false)


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

    


// ! nextQues func -----------------------------------------------------
        async function nextQues(){
            if(props.formData.language!==null){
                
                // !< First time, render 5 items and then load translated items , put them into arrays-------------
                if (round===1) {
                    // setIsLoading(true)
                setTraLoading(true)
                
                // !< For setCurrentBlock -------------------------------------------------------------------------------
                const hol = holder.splice(0,1)
                for (let index = 0; index < hol.length; index++) {
                    const element = hol[index];

                    const jerk = []
                    let ay=[]

                    for (let index = 0; index < element.length; index++) {
                        const el = element[index];


                    // TODO: translate and form question block object
                            await Translator(el[0].value, props.formData.language)
                                .then(val=>{
                                    ay.push({...el[0], value:val.translatedText})
                                })

                        // * {value:-----, id:-------}

                        // TODO: iterate throught, translate and form answer block object and put in a array
                        const bundler = []
                        
                       await Promise.all(
                            el[1].map(i=> 
                                Translator(i.value, props.formData.language)
                                .then(val=>
                                    bundler.push({...i, value:val.translatedText})
                                    )
                                    .catch(err=>
                                        console.log(err)
                                        )
                                        )
                        )

                        
                        jerk.push(bundler)
                    }
                    // * [ [{value:---, id:---, isSelected:---},,,,,] *5]

                    // TODO: For currentBlock, concatinate above two items in a single array and return
                    // *[{obj}, [{obj}*5]]

                    //  TODO: For currentAnsBlock, 
                    // * [ ['ans','ans',,,,]*5 ]
                    // element.map(i=>console.log(i[1]) )

                    //  TODO: making final form block
                    const qb = []
                    for (let index = 0; index < jerk.length; index++) {
                        qb.push([ay[index], jerk[index]])
                    }
                    setCurrentBlock([qb])
                }
// !> For setCurrentBlock -------------------------------------------------------------------------------

// !< For setCurrentAnsBlock -------------------------------------------------------------------
                let CAhol = CAHolder.splice(0,1)
                CAhol = CAhol.flat()
                
                const dog = []
                for (let index = 0; index < CAhol.length; index++) {
                    const element = CAhol[index];
                    await Translator(element, props.formData.language)
                    .then(res=>
                        dog.push(res.translatedText)
                        )
                }


                
                setCurrentAnsBlock([dog])
                setIsLoading(false)
                // !> For setCurrentAnsBlock -------------------------------------------------------------------

                // !< load rest of them and put them into an array------------------------------------

                // todo:< CAHolder translate---------------------------
                const cat = []
                while (CAHolder.length>0) {
                    let bro = CAHolder.splice(0,1).flat()
                    const cc = []
                    for(let i=0; i<bro.length; i++){
                        const el = bro[i]
                        await Translator(el, props.formData.language)
                        .then(res=>
                            cc.push(res.translatedText)
                            )
                    }
                    cat.push(cc)

                }
                
                setCAHolder(cat)
                // todo:> CAHolder translate---------------------------

                // todo:< Holder translate------------------------------
                const bird = []
                while(holder.length>0){
                    const geo = holder.splice(0,1).flat()

                    const snake = []
                    const frog = []

                    for (let index = 0; index < geo.length; index++) {
                        const element = geo[index];
                        
                        // todo:< question part --------------
                        await Translator(element[0].value, props.formData.language)
                        .then(res=>snake.push({...element[0], value:res.translatedText}))
                        // todo:> question part --------------


                        // todo:< answers part -----------
                        const todo = []
                       await Promise.all(
                            element[1].map(i=> 
                                Translator(i.value, props.formData.language)
                                .then(val=>
                                    todo.push({...i, value:val.translatedText})
                                    )
                                    .catch(err=>
                                        console.log(err)
                                        )
                                        )
                        )

                        frog.push(todo)
                        // todo:> answers part -----------
                    }

                    // todo:< combine question and answer part and then put in an array----------
                    for (let index = 0; index < frog.length; index++) {
                        bird.push([snake[index], frog[index]])
                    }
                    // todo:> combine question and answer part and then put in an array----------
                }

                const tiger =[]

                while(bird.length>0){
                    const vem = bird.splice(0,5)
                    tiger.push(vem)
                }
                setTraHolder(tiger)
                setTraLoading(false)
                // todo:> Holder translate------------------------------


                setAnswered(false)

                return
                // !> load rest of them and put them into an array------------------------------------
            }
            // !> First time, render 5 items and then load translated items , put them into arrays-------------

            if(round>1){

                // !< splice translated array and set to state --------------------------
                 setCurrentBlock(traHolder.splice(0,1))
                 setCurrentAnsBlock(CAHolder.splice(0,1))
                 // !> splice translated array and set to state --------------------------
                 
                 
                 
                 setAnswered(false)
                 // setIsLoading(false)
                window.scroll(0,0)
                }
            }else{
                 setCurrentBlock(holder.splice(0,1))
                 setCurrentAnsBlock(CAHolder.splice(0,1))
                setAnswered(false)
             window.scroll(0,0)
            }
        }
// ! nextQues func -----------------------------------------------------

    React.useEffect(()=>{
        setRound(pre=>pre+1)
        if(round===0)return

        if(props.formData.language!==null){
            // if(traLoading)return
        if(life<1 || traHolder.length===0){
            setDone(true)
        }
        return
        }

        if(life<1 || holder.length===0){
            setDone(true)
        }
    }, [triviaBlock])

    React.useEffect(()=>{
   async function getTriviaData(){
        try{
            const url = `https://opentdb.com/api.php?amount=20&category=${props.formData.category}`

            const resp = await axios.get(url)


                function removeCharacters(question) {
                    return question.replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"");
                  }

            // ! translate block
            // props.isJapanese&&TranslatorCorrectAns(resp.data.results, 'correct_answer', setCorrectAnswer)
            // ! translate block
            // console.log(resp.data.results)
        const set = []


        // const ob = {value:'cat eat fish', id:'1342134'}
        // const haha = Translator(['i ate tofu', 'it ate mad', 'dog eat dog world'])


        // const haha = Translator(ob.value)
        // console.log(haha)
        // haha.then((hi)=>console.log(hi.translatedText))


        // ! TEST making translate block------------------------------------------------------
        // const traQue = []
        // const traInAns = []
        // const traCoAns = []

        // for (let index = 0; index < resp.data.results.length; index++) {
        //     const element = resp.data.results[index];
        //     const id = nanoid()
        //     const ques = {value:element.question, id:id}
        //     traQue.push(ques)

        //     const inAns = {value:element.incorrect_answers, id:id}
        //     traInAns.push(inAns)

        //     const coAns = {value:element.correct_answer, id:id}
        //     traCoAns.push(coAns)
        // }
        // // console.log(traQue)
        // // console.log(traInAns)
        // // console.log(traCoAns)

        // const qu = Translator(traQue.map(i=>i.value))
        // qu.then(val=>console.log(val))

        // ! TEST making translate block------------------------------------------------------




        // ! translate here before making blocks ---------------------
        //     const aa = resp.data.results.map(i=>i.question)
        // const joke = TranslatorPlane(aa)
        // joke.then(console.log(joke))
        // ! have to connect question and answers accordingly using id or smth--------------------



        for (let index = 0; index < resp.data.results.length; index++) {
            const element = resp.data.results[index];
            let combinedAnswers = await combineAllAnswers(element, element.correct_answer)

            // ! translate block-----------------------------------
            // if(props.isJapanese){
            //     const hi = await TranslatorPlane(combinedAnswers)
            //     combinedAnswers = await hi.map((result)=>result)
            // }
            // ! translate block----------------------------------------

            const objectedAnswers =  combinedAnswers.map(item=>(
                { 
                value:removeCharacters(item),
                id:nanoid(),
                isSelected:false
                }
            ))
            // setAllPossibleAnswers(prevState=>[...prevState, objectedAnswers])
            let question = {value:removeCharacters(element.question), id:nanoid()}


            // ! translate block--------------------------------------
                // if (props.isJapanese) {
                    
                //     const hey = await Translator(element.question)
                //      question = {value:hey.translatedText, id:nanoid()}
                // }
            // ! translate block-----------------------------------------





            set.push(
                [
                    question,
                    objectedAnswers 
                ]
            )
        }

        const ansBlock = []
        const allCA = resp.data.results.map(result=>removeCharacters(result.correct_answer))


        while(allCA.length>=1){
            const chunkedAns = allCA.splice(0,5)
            ansBlock.push(chunkedAns)
        }
        setCAHolder(ansBlock)

        const blocks = []
        while(set.length>=1){
            const chunked = set.splice(0,5)
            blocks.push(chunked)
        }
        // const testy = set
        setHolder(blocks)
        

        if(props.formData.language!==null)setIsLoading(true)
        else{
            setIsLoading(false)
        }
    } catch(e){console.error(e)}
}
 getTriviaData()
//  while(true){

//      setTimeout(()=>console.log('hi'), 1000)
//  }
}
,[])

// console.log(holder)
// console.log(CAHolder)


        React.useEffect(()=>{
            nextQues()
        }
        ,[holder])

        const changeSelected = (e, id, quesID) =>{

                const testArr = []
                currentBlock.map(i=>{
                    for (let index = 0; index < i.length; index++) {
                        const element = i[index];
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


            
        const triviaItems = currentBlock.map(item=>{
            let c = item.map((i, index)=>{

                const question = []
                const anss = []


                question.push(
                    <h1 key={i[0].id} >{i[0].value}</h1>
                )

            i[1].map(ans=>
                {
                
                const style = 
                ans.correctAns&&ans.isSelected?{backgroundColor:'gold'}:
                ans.isSelected?{backgroundColor:'purple'}:
                ans.correctAns?{backgroundColor:'red'}:
                {backgroundColor:'greenyellow'}


                anss.push(<button key={ans.id} onClick={(e)=>changeSelected(e, ans.id, i[0].id)} className='btn' style={style}>{ans.value}</button>)
                }
                )
                const cardKey = nanoid()

                // function removeCharacters(question) {
                //     return question.replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"");
                //   }
                  
                  return(
                    <div key={cardKey} onMouseOver={()=>gs.dataset.activeIndex = index} className="questionCard">
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

            setAnswered(true)
             
             const finalForm = []
             let correctCount = 0
             currentBlock.map(item=>{
                 
                for (let index = 0; index < item.length; index++) {
                    const element = item[index];
                const correctAns = currentAnsBlock[0][index]
                
                const test = element[1].map(ans=>ans.value===correctAns?{...ans, correctAns:true}:{...ans, correctAns:false})
                for (let index = 0; index < test.length; index++) {
                    const element = test[index];
                    if (element.correctAns==true&&element.isSelected==true) {
                        correctCount++
                    }
                }
                finalForm.push([ element[0], test ])

                //todo: find value by string and add correct:true
            }

        })
            setScore(prevState=> prevState + correctCount)
            setLife(prevState=>prevState-(5-correctCount))
            setCurrentBlock([ finalForm ])
            setTriviaBlock(finalForm)
        }

//     const restart = async() =>{
//         try{
//             props.restart()
//             setIsLoading(true)
//             setResultPage(false)
//             setLife(10)
//             setDone(false)
//             setRound(0)
//             setScore(0)
//             setTriviaBlock([])
//             setNewBest(false)
//             setKing(false)
//             const resp = await axios.get("https://opentdb.com/api.php?amount=50")

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
//             const question = {value:element.question, id:nanoid()}
//             set.push(
//                 [
//                     question,
//                     objectedAnswers 
//                 ]
//             )
//         }

//         const ansBlock = []
//         const allCA = resp.data.results.map(result=>result.correct_answer)
//         while(allCA.length>=1){
//             const chunkedAns = allCA.splice(0,5)
//             ansBlock.push(chunkedAns)
//         }
//         setCAHolder(ansBlock)

//         const blocks = []
//         while(set.length>=1){
//             const chunked = set.splice(0,5)
//             blocks.push(chunked)
//         }
//         setHolder(blocks)
//         setIsLoading(false)
//     } catch(e){console.error(e)}
// }

    const restart = () =>{
            props.restart()
            setIsLoading(true)
            setResultPage(false)
            setLife(10)
            setDone(false)
            setRound(0)
            setScore(0)
            setTriviaBlock([])
            setNewBest(false)
            setKing(false)
}

const handleResult = ()=>{
    if(score<1){ 
    setResultPage(true)
        return
    }

    if(bestScore===null || score>bestScore.score){
        setNewBest(true)
        setKing(true)
    }
    
    setResultPage(true)
}

const newBester = () =>{
    setBestScore(JSON.parse(localStorage.getItem('bestScore')))
    setNewBest(false)
}


        

    return(
        <div id="getstarted">
            {resultPage?
            <FinishPage score={score} king={king} restart={restart} bestScore={bestScore} newBest={newBest} newBester={newBester}/>:
            <div className='main-container'>
                {!isLoading&&
                <div className='status'>
                    <div className='statusBlock'>
                        <h1>Your life: {life}</h1>
                    </div>

                    <div className="statusBlock">
                        <h1>Your Score: {score}</h1>
                    </div>

                </div>
                }

                {isLoading?<h1 className='loading'>Loading...</h1>:
                <div >

                    <div className="questions">
                        {triviaItems}
                    </div>
                        <div id="menu-background-pattern"></div>
                        <div id="menu-background-image"></div>

                    <div className='bottom-buttons'>
                        {
                            traLoading?<h1 className='loading'>Loading rests...</h1>:
                        !answered?<button className='btn' onClick={checkAns}>Check Answers</button>:
                        ''
                        }
                        {answered&&done? <button className='btn result' onClick={handleResult}>Result Page</button>:
                        life>0&&answered?<button className='btn' onClick={nextQues}>Next Page</button>:
                        ''}
                    </div>

                </div>
                }
            </div>
        }

        </div>
    )
}

