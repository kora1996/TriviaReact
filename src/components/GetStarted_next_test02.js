import React from 'react';
import axios from 'axios';
// import Trivia from './Trivia';
import { nanoid } from 'nanoid';
import FinishPage from './Finish';
import { TranslatorCorrectAns, Translator , TranslatorPlane} from './TranslatorTest';

export default function GetStarted(props){

    // * for parallax effect パララックスエフェクト用
    const gs = document.getElementById("getstarted");

    const [resultPage, setResultPage] = React.useState(false)
    // const [triviaQuestions, setTriviaQuestions] = React.useState([])

    // 
    const [CAHolder, setCAHolder] = React.useState([])
    // const [correctAnswer, setCorrectAnswer] = React.useState('')
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
    // const [pageIndex, setPageIndex] = React.useState(1)

    const [traLoading, setTraLoading] = React.useState(false)


    async function combineAllAnswers(incorrectAnswers, correctAnswer){
        const allAnswers = []
            incorrectAnswers.incorrect_answers.map((incorrectAnswer)=>{
                allAnswers.push(incorrectAnswer)
            })
        allAnswers.push(correctAnswer)

            // * randamize the order 並びをミックスする
        allAnswers.sort(()=>Math.random()-0.5)
        // setAllPossibleAnswers(allAnswers)
        return allAnswers
    }

    


// ! nextQues func -----------------------------------------------------
        async function nextQues(){

            // * if it's not English 、もし英語じゃない場合
            if(props.formData.language!==null){
                
                // !< First time, render 5 items and then load translated items , put them into arrays------------- もし最初のロードの場合、５問を先に翻訳して、残りはレンダーした後に翻訳する
                if (round===1) {
                    // setIsLoading(true)
                setTraLoading(true)
                
                // !< For setCurrentBlock --------------------　初めの５問を作業
                const hol = holder.splice(0,1)
                // * splice method returns an array. スプライスメソッドはアレイを返す

                // * to go down one level lower. could use flatter method but didn't know at the moment.
                // * 一レベル落とすためのループ。書いたときの段階でフラッターメソッドの事を知らなかった
                for (let index = 0; index < hol.length; index++) {
                    const element = hol[index];

                    const jerk = []
                    let ay=[]

                    for (let index = 0; index < element.length; index++) {
                        const el = element[index];


                    // TODO: translate and form question block object 翻訳してクエスチョンのオブジェクト形式にする
                            await Translator(el[0].value, props.formData.language)
                                .then(val=>{
                                    ay.push({...el[0], value:val.translatedText})
                                })

                        // * {value:-----, id:-------}

                        // TODO: iterate through, translate and form answer block object and put in a array
                        // todo: 答えのブロックはもう１段界ネスト化されており、そこから答えオブジェクトの形式を作る。
                        const bundler = []
                        
                                // * iterate through array and translate each. ループして翻訳する。
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
                    // * each ans block should be like this [ [{value:---, id:---, isSelected:---},,,,,] *5]

                    // TODO: For question and ans currentBlock, concatenate above two items in a single array and return.  クイズと答えの現在形のブロックを一つのアレイにする。
                    // *[{obj}, [{obj}*5]]


                    //  TODO: making final form block
                    const qb = []
                    for (let index = 0; index < jerk.length; index++) {
                        qb.push([ay[index], jerk[index]])
                    }
                    setCurrentBlock([qb])
                }
// !> For setCurrentBlock -------------------------------------------------------------------------------

// !< For setCurrentAnsBlock -------------------------------- 正解の答えをアレイ化する。
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

                // !< load rest of them and put them into an array---------------------残りの問題と答えを翻訳する

                // todo:< CAHolder translate--------------------------- 残りの正解の答えを翻訳
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

                // todo:< Holder translate------------------------------ 残りの質問と回答のオプションを翻訳
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


                        // todo:< answers part -----------残りの回答オプションを翻訳
                        // * using promise all() because there is multiple promise. プロミスオールを使っているのは、複数のプロミスを処理するため。
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

                    // todo:< combine question and answer part and then put in an array----------上の質問と回答のオプションブロックを連結
                    for (let index = 0; index < frog.length; index++) {
                        bird.push([snake[index], frog[index]])
                    }
                    // todo:> combine question and answer part and then put in an array----------
                }

                const tiger =[]

                // * making a block made of an question and its answer choices. 連結したアイテムを５問づつカットしてアレイ化する。
                while(bird.length>0){
                    const vem = bird.splice(0,5)
                    tiger.push(vem)
                }

                // * put into a new state array because other useEffect's dependency is 'holder' and i don't want to mess up. ユーズエフェクトを使った工程で’ホールド’を依存アレイにしたので、その工程を壊さないようにするため新しいステイトアレイを採用
                setTraHolder(tiger)

                // * hide nextQues button until finish translating. 翻訳が終わるまで次のクイズボタンを隠す
                setTraLoading(false)
                // todo:> Holder translate------------------------------


                setAnswered(false)

                return
                // !> load rest of them and put them into an array------------------------------------
            }
            // !> First time, render 5 items and then load translated items , put them into arrays-------------

            // * cut traHolder into a chunk size. traHolder is an array that I translated at the round 0 or first load. 一周目で翻訳したクイズブロックと答えを一ページ分取り出す。
            if(round>1){

                // !< splice translated array and set to state --------------------------
                 setCurrentBlock(traHolder.splice(0,1))
                 setCurrentAnsBlock(CAHolder.splice(0,1))
                 // !> splice translated array and set to state --------------------------
                 
                 
                 
                 setAnswered(false)
                 // setIsLoading(false)

                //  * to scroll up to top page. トップページにスクロールアップするため。
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

        // * setRound +1 but it doesn't increment immediately *it does in next re-render* that's why next if state works perfect. セットラウンドに１をプラスするが、すぐに実行されるわけではないので*次のレンダーで実行される*、次のifステイトはちゃんと作動する。https://stackoverflow.com/questions/54069253/the-usestate-set-method-is-not-reflecting-a-change-immediately

        // * at the first render, holder nor traHolder's length is still 0. thus it setDone to true. that's not what i want so here i cancel first round buy giving return
        // * 初めのレンダー時にはホルダーまたはトラホルダーのレングスは０なので、下記のコードによってsetDoneがtrueにされる。それを防ぐためにラウンドが０の場合リターンを返している。
        if(round===0)return

        if(props.formData.language!==null){
            // * not necessary. if(traLoading)return
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

                // * remove character from triviaDB API. APIからの特殊文字を取り除く。
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

            // * combine incorrect answers and correct answer, mix the order then put into an array. 不正解の回答と正解の回答を混ぜてひとつのアレイに入れる。
            let combinedAnswers = await combineAllAnswers(element, element.correct_answer)

            // ! translate block-----------------------------------
            // if(props.isJapanese){
            //     const hi = await TranslatorPlane(combinedAnswers)
            //     combinedAnswers = await hi.map((result)=>result)
            // }
            // ! translate block----------------------------------------

            // * make them into each object to add id and isSelected. ID と　isSelected　を加えるために、それぞれの回答アイテムをオブジェクト化する。
            const objectedAnswers =  combinedAnswers.map(item=>(
                { 
                value:removeCharacters(item),
                id:nanoid(),
                isSelected:false
                }
            ))
            // setAllPossibleAnswers(prevState=>[...prevState, objectedAnswers])

            // * same as answers but for question. 上記の回答と工程は同じだが、質問用。
            let question = {value:removeCharacters(element.question), id:nanoid()}


            // ! translate block--------------------------------------
                // if (props.isJapanese) {
                    
                //     const hey = await Translator(element.question)
                //      question = {value:hey.translatedText, id:nanoid()}
                // }
            // ! translate block-----------------------------------------




                // * make them a pair as an array. 上記の２つを一つのアレイにする事でペアにする。
            set.push(
                [
                    question,
                    objectedAnswers 
                ]
            )
        }

        const ansBlock = []

        // * make an array which stores the answer for each questions. それぞれのクイズの正解の答えだけをストックしているアレイを作る。
        const allCA = resp.data.results.map(result=>removeCharacters(result.correct_answer))


        // * split the answers by 5 and put them into an array. ５問づつ答えを切り取ってアレイにする。
        while(allCA.length>=1){
            const chunkedAns = allCA.splice(0,5)
            ansBlock.push(chunkedAns)
        }
        setCAHolder(ansBlock)

        const blocks = []
        // * split the pairs of question and potential answers by 5 and put into an array. ５問づつクイズと回答のペアを切り取ってアレイにする。
        while(set.length>=1){
            const chunked = set.splice(0,5)
            blocks.push(chunked)
        }
        // const testy = set
        setHolder(blocks)
        

        // * if translate is needed, it takes more time so setIsLoading remain true. 翻訳が必要な場合、更に時間を要するため　setIsLoading　は　true　のまま。
        if(props.formData.language!==null)setIsLoading(true)
        else{
            setIsLoading(false)
        }
    } catch(e){console.error(e)}
}
 getTriviaData()
}
,[])



    // * once API from triviaDB is loaded, nextQues() fired. API のデータを取得したら　nextQues()　を発動。
        React.useEffect(()=>{
            nextQues()
        }
        ,[holder])

        // * change potential answer's isSelected. 回答選択時にisSelected　を変える。
        const changeSelected = (e, id, quesID) =>{

                const testArr = []
                currentBlock.map(i=>{
                    for (let index = 0; index < i.length; index++) {
                        const element = i[index];

                        // * if question's id === the event's question's id. もしクイズのIDがイベントが起こっているクイズのIDと一致した場合。
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
                    // * onMouseOver event for parallax effect. マウスオーバーイベントはパララックスエフェクトのため。
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

                // * counting correct answer. this is for one question each. not counting correct answers at once.
                // * 正解の回答をカウントしている。　しかし、ひとつのクイズづつで、一度にすべての正解をカウントするものではない。
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

    // * people who scored 0 can't be a new king. ０ポイントの人はキングになれない。
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

