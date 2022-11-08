import React from 'react';
import Translator from './Translator';
import QuestionCard from './QuestionCard';

const Trivia = (props)=>{

    const [translatedTrivia, setTranslatedTrivia] = React.useState([])
    const [loading, setLoading] = React.useState(false)


    // React.useEffect(() => {
    //     Translator()
    //     .then((res) => {
    //         setTranslatedTrivia(res)
    //     })
    //     .catch((e) => {
    //         console.log(e.message)
    //     })
    // }, [])
    // props.allPossibleAnswers.map((item)=>{console.log(item)})



    return(
        <div className="trivia">
            {/* <h1>Eat some trivia</h1> */}
            {/* <h1>{trivia.translatedText}</h1> */}

            <QuestionCard question={props.triviaQuestions} 
            a1={props.a1}
            a2={props.a2}
            a3={props.a3}
            a4={props.a4}
            />

        </div>
    )
}

export default Trivia