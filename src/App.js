import './css/style.css';
import React from 'react';
import Start from './components/StartMenu';
import GetStart from './components/GetStarted_next_test';
// import GetStart from './components/GetStarted_JP';

export default function App(){

    const [start, setStart] = React.useState(false)

  const getStarted = ()=>{
    setStart(true)
  }



    return(
        <div className="app">
            <header>
                <h2>Trivia Pond</h2>
            </header>
            {start?
            <GetStart/>
            :<Start getStarted={getStarted} />}
            {/* {triviaItems} */}

        </div>
    )
}
