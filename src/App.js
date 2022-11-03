import React from 'react';
import FetchData from './components/Translater';
import Start from './components/Start';

export default function App(){

    const [start, setStart] = React.useState(false)
    const [trivia, setTrivia] = React.useState([])



React.useEffect(() => {
    FetchData()
      .then((res) => {
        setTrivia(res)
      })
      .catch((e) => {
        console.log(e.message)
      })
  }, [])

  const getStarted = ()=>{
    setStart(true)
    console.log(start)
  }


    return(
        <div className="app">
            {start?<h1>{trivia.translatedText}</h1>:<Start getStarted={getStarted} />}
        </div>
    )
}