// import './css/style.css';
import React from 'react';
import FetchData from './components/Translater';
import Start from './components/Start';
import Trivia from './components/Trivia';

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
  }


    return(
        <div className="app">
            <header>
                <h2>Trivia Pond</h2>
            </header>
            {start?<Trivia />:<Start getStarted={getStarted} />}
        </div>
    )
}